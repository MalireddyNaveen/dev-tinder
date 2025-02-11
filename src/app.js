const express = require("express");

const app =express();

app.use("/test",(req,res)=>{
    res.send("Hello Node!")
});

app.use("/get",(req,res)=>{
    res.send("Hello!!! !! Naveen")
})

app.listen(7777,()=>{
    console.log("server is running on port 7777");
})