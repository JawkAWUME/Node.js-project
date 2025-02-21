const express = require('express')
const app = express()
const userModel = require("./models/user")
const postModel = require("./models/post")

app.get("/", function (req,res){
    res.send("Hello")
})

app.get("/create", async function (req,res) {
    let user = await userModel.create({
        username: "Jawk's",
        age: 25,
        email: "jawkawume@gmail.com"
    })

    res.send(user)
})

app.get("/post/create", async function (req,res){
    let post = await postModel.create({
        postdata: "Hello Jawk!!!",
        user:"67a60bff8da463bf4a5bafd9"
    })

    let user = await userModel.findOne({_id: "67a60bff8da463bf4a5bafd9"})
    user.posts.push(post._id)
    await user.save()
    res.send({post,user})
})

app.listen(3000)