const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
// Middleware
app.use((req,res,next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  
})

app.get('/',function(req,res) {
    res.send("Hello World!!!")
})


app.get('/profile',function(req,res) {
    res.send("Done !!!")
    // return next(new Error("something went wrong"))
})


// app.use((err,req,res,next)=>{
//     console.error(err.stack)
//     res.status(500).send('Something broke!')
// })
app.listen(3000)