const express = require("express");
const {adminAuth,userAuth} =require("./middlewares/adminAuth")

const app=express();

//middler ware for admin auth
app.use("/admin",adminAuth)
 

app.get("/user/data",userAuth,(req,res)=>{
    res.send("Get User data")
})

app.get("/admin/getAllData",(req,res)=>{
    res.send("get all admin data");
       
})

app.delete("/admin/deleteData", (req,res)=>{
    res.send("Delete admin data");
})

app.listen(7777,()=>{
    console.log("Server is running on 7777 port")
})