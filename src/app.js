const express = require("express");
const app=express();

app.get("/getUserData",(req,res)=>{

    // try to handle error is in try catch for gracefull go for use
    throw new Error("error");
    res.send("get ueserdata");
})
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something wrong")
    }
})

app.listen(7777,()=>{
    console.log("Server is running on 7777 port")
})