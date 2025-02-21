const cookieParser = require('cookie-parser');
const express = require('express')
const app = express();
const userModel = require("./models/user")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
app.use(cookieParser())
const path = require('path')

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'public')))

app.get('/', (req,res) => {
    res.render("index")
})


app.post('/create' , async (req,res) => {
    let {username , email, password,age} = req.body;

    bcrypt.genSalt(10,(err,salt) =>{
        bcrypt.hash(password, salt, async (err,hash)  => {
           let createdUser = await userModel.create({
            username,
            email,
            password:hash,
            age
           })
           let token = jwt.sign({email}, "abcdzdfd")
           res.cookie("token",token)
           res.send(createdUser);
        })
        
    })

   
   
})

app.get("/logout",function(req,res) {
    res.cookie("token","")
    res.redirect("/")
})

app.get("/login", async function (req,res) {
    res.render("login")
})

app.post("/login", async function (req,res) {
    let user = await userModel.findOne({email: req.body.email})
    if (!user) return res.send("Something went wrong!!!")

    bcrypt.compare(req.body.password,user.password,function(err,result){
        console.log(result,user.password)
        if (result) res.send("Yes, you can login!!!")
        else res.send("No you cannot login!!!")
    })
    console.log(user);
})


// // app.use(cookieParser())
// app.get("/", function (req,res) {
//     // res.cookie("name","jason");
//     // console.log(req.cookies);
//     // bcrypt.genSalt(10,function(err,salt) {
//     //     bcrypt.hash("jawk@1932",salt,function (err,hash){
//     //         console.log(hash);
//     //     })
//     // })
//     let token = jwt.sign({email: "jasonawume5@gmail.com"},"secret")
//     console.log(token);
//     res.cookie("token",token, { httpOnly: true })
//     res.send("done")
// })

// app.get("/read",function (req,res){
//     // console.log(req.cookies);
//     // res.send("Read Page")
//     let data = jwt.verify(req.cookies.token,"secret")
//     console.log(data)
// })

app.listen(3000);