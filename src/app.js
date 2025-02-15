const express = require("express");
//require("./config/database"); //if we write like this first server is created and ten db is hitted its should not happen like that first hit db then run server
const connectDb=require("./config/database");
const User =require("./model/user")
const app=express();
//here comes a middele to conver json data to js object 
//express gives us that middle ware express.json()
//actually req.body is in json so when we console.log(req.body) it gives undefine becuse of it wont under stand json format to make it under stand we use middleware that is express.josn()  it was given by express.
app.use(express.json())
app.post("/signup",async (req,res)=>{

    console.log(req.body)
    // const userObj={
    //     firstName:"Naveen",
    //     lastName:"Malireddy",
    //     emailID:"malireddy@gmail.com",
    //     password:"1234567890"
    // }

    const newUser =new User(req.body) ;
    //use try catch for error handling
    try{
        await  newUser.save() //it returns a promise so handle with async await
        res.send("User created Sunccessfully!!")
    }
    catch(error){
        res.status(400).send("Error at the time of Creation:"+error.message)
    }
  
})




//create instance of a model
// create a instance of User


connectDb().then(()=>{
    console.log("Db connect succesfully") //if we write like this first server is created and ten db is hitted its should not happen like that first hit db then run server
    app.listen(7777,()=>{
        console.log("Server is running on 7777 port")
    })
})
.catch((error)=>{
        console.log("DB connection failed")
})

