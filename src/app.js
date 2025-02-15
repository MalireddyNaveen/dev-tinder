const express = require("express");
//require("./config/database"); //if we write like this first server is created and ten db is hitted its should not happen like that first hit db then run server

const connectDb=require("./config/database");
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
connectDb().then(()=>{
    console.log("Db connect succesfully") //if we write like this first server is created and ten db is hitted its should not happen like that first hit db then run server
    app.listen(7777,()=>{
        console.log("Server is running on 7777 port")
    })
})
.catch((error)=>{
        console.log("DB connection failed")
})

