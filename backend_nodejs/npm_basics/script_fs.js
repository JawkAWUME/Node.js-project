const fs = require('fs')

// fs.writeFile("hey.txt","Hello Jawk",function(err){
//     if(err) console.error(err);
//     else console.log("done")
// })

// fs.appendFile("hey.txt","\nJawk File 2",function(err){
//     if (err) console.error(err);
//     else console.log("done");
// })

// fs.rename("hey.txt","hello.txt",function(err){
//     if (err) console.error(err);
//     else console.log("done");
// })

// fs.copyFile("hello.txt","./copy/chacha.txt",function(err){
//         if(err) console.error(err);
//         else console.log("done");
// })
// fs.unlink("hello.txt",function(err){
//     if (err) console.error(err);
//     else console.log("removed")
// })
fs.rm("./copy",{recursive: true},function(err){
    if (err) console.error(err);
    else console.log("removed")
})