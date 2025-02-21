const express = require('express')
const app = express()
const userModel = require("./models/user")
const postModel = require("./models/post")
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const path = require("path")
const upload = require("./config/multerconfig")
// const multer = require("multer")
// const crypto = require('crypto')
// const path = require('path')

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser())

// const storage = multer.diskStorage({
//     destination: function (req,file,cb){
//         cb(null,'./public/images/uploads')
//     },
//     filename: function (req,file,cb) {
//         crypto.randomBytes(12,function (err,bytes) {
//         const fn = bytes.toString("hex") + path.extname(file.originalname)
//         cb(null,fn)
//     })
//     }
// })

// const upload = multer({storage: storage})
app.get('/', function (req,res){
    res.render("index")
})

app.get("/profile/upload", function (req,res){
    res.render("profileupload")
})

app.post("/profile/upload", isLoggedIn, upload.single("image"), async function (req,res){
    let user = await userModel.findOne({email:req.user.email});
    user.profilepic = req.file.filename
    await user.save()
    res.redirect("/profile")
})

app.get('/login', function (req,res) {
    res.render("login")
})

app.get('/profile',isLoggedIn, async function (req,res) {
    let user = await userModel.findOne({email: req.user.email}).populate("posts");
    res.render("profile",{user})
})

app.get("/like/:id", isLoggedIn, async function (req,res) {
    let post = await postModel.findOne({_id: req.params.id}).populate("user")
    console.log(req.user)
    console.log(post.likes.indexOf(req.user.userid))
    if (post.likes.indexOf(req.user.userid) ===-1){
        post.likes.push(req.user.userid)
        console.log(post.likes)
    } else {
        post.likes.splice(post.likes.indexOf(req.user.userid),1)
    }
    await post.save()
    res.redirect("/profile")
  
});

app.get("/edit/:id", isLoggedIn , async function (req,res){
    let post = await postModel.findOne({_id: req.params.id}).populate("user")
    res.render("edit",{post})
});

// app.get("/test", async function (req,res) {
//     res.render("test")
// })

// app.post("/upload", upload.single("image"),function (req,res) {
//     console.log(req.file)
// })

app.post("/update/:id", isLoggedIn , async function (req,res){
    let post = await postModel.findOneAndUpdate({_id: req.params.id},{content: req.body.content}).populate("user")
    res.redirect("/profile")
});

app.post('/post', isLoggedIn, async function (req, res) {
    let user = await userModel.findOne({ email: req.user.email });
    // ✅ Extraire "content" depuis req.body
    let { content } = req.body;  

    // ✅ Vérifier si le contenu du post est vide
    if (!content || content.trim() === "") {
        return res.status(400).send("Post content cannot be empty");
    }

    let post = await postModel.create({
        user: user._id,
        content
    });

    user.posts.push(post._id);
    await user.save();
    
    res.redirect("/profile");
});

app.post('/register', async function (req,res){
    let {email,password,username,name,age} = req.body;
    let user = await userModel.findOne({email})
    if (user) return res.status(500).send("User already registered")
    bcrypt.genSalt(10,function (err,salt) {
        bcrypt.hash(password,salt,async function (err,hash) {
            let user = await userModel.create({
                username,
                email,
                age,
                name,
                password: hash
            })
            let token = jwt.sign({email:email,userid:user._id}, "secret")
            res.cookie("token",token)
            res.send("Registered")
        })
    })
})

app.post('/login', async function (req,res){
    let {email,password} = req.body;

    let user = await userModel.findOne({email})
    if (!user) return res.status(500).send("Something went wrong !!!")
    bcrypt.compare(password,user.password,function (err,result){
        if(result){
            let token = jwt.sign({email:email, userid:user._id},"secret")
            res.cookie("token",token);
            res.status(200).redirect("/profile")
        } 
        else res.redirect("/login")
        
    });
});


app.get('/logout', function (req,res){
    res.cookie("token","")
    res.redirect("/login")
})

function isLoggedIn(req,res,next){
    console.log(req.cookies);
    if(req.cookies.token === "") res.send("You must be logged in")
    else {
        let data = jwt.verify(req.cookies.token,"secret")
        req.user = data
    }
    next();
}

app.listen(3001)