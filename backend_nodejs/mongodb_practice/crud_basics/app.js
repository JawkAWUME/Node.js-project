const express = require('express')
const app = express()

const userModel = require('./usermodel')

app.get('/',(req,res) => {
    res.send("Hey")
})

app.get('/create', async (req,res)=> {
    let createdUser = await userModel.create({
        name: "Jason",
        email: "jasonawume5@gmail.com",
        username: "jawk"
    })
    res.send(createdUser)
    console.log("Hi!!!")
})

app.get('/update',async (req,res) => {
    let updatedUser = await userModel.findOneAndUpdate({username:"jawk"},{name:"Keli Jason"},{new:true})
    res.send(updatedUser)

})

app.get("/read",async (req,res)  => {
    let users = await userModel.find();
    res.send(users);
})

app.get("/delete",async (req,res)  => {
    let users = await userModel.findOneAndDelete({username: "jawk"});
    res.send(users);
})
app.listen(3001)