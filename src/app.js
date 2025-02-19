const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser= require("cookie-parser");
const jwt = require("jsonwebtoken");
//require("./config/database"); //if we write like this first server is created and ten db is hitted its should not happen like that first hit db then run server
const connectDb = require("./config/database");
const User = require("./model/user");
const validateSignUpData = require("./utils/validation");
const app = express();
//here comes a middele to conver json data to js object
//express gives us that middle ware express.json()
//actually req.body is in json so when we console.log(req.body) it gives undefine becuse of it wont under stand json format to make it under stand we use middleware that is express.josn()  it was given by express.
app.use(express.json());
app.use(cookieParser())

//signup api
app.post("/signup", async (req, res) => {
  //use try catch for error handling
  try {
    const { firstName, lastName, emailID, password } = req.body;
    //validate the req.body
    validateSignUpData(req);
    //encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      emailID,
      password: hashedPassword,
    });
    //save user to db
    await newUser.save(); //it returns a promise so handle with async await
    res.send("User created Sunccessfully!!");
  } catch (error) {
    res.status(400).send("ERROR" + error.message);
  }
});

//login api

app.post("/login", async (req, res) => {
  try {
    const { emailID, password } = req.body;
    const user = await User.findOne({ emailID: emailID });
    console.log(user);
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValidate = await bcrypt.compare(password, user.password);

    if (isPasswordValidate) {
       
        const token= jwt.sign({_id:user._id},"DEVTinder@5276$09")
        res.cookie("token",token)
      res.send("Login Successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

app.get("/profile",async(req,res)=>{

    try {
        const cookies=req.cookies
        const decoded =jwt.verify(cookies.token,"DEVTinder@5276$09")
        if(!decoded){
            throw new Error("INvalid token");
            
        }
     
        const user = await User.findById(decoded._id)
        if(!user){
            throw new Error("No user found");
            
        }
        
        res.send(user)
    } catch (error) {
        res.status(400).send("ERROR :"+error.message)
    }

})

app.get("/user", async (req, res) => {
  const userEmailId = req.body.emailID;

  try {
    const user = await User.find({ emailID: userEmailId });
    res.send(user);
  } catch (error) {
    res.status(500).send("somthing wrong");
  }
});

// create a instance of User

connectDb()
  .then(() => {
    console.log("Db connect succesfully"); //if we write like this first server is created and ten db is hitted its should not happen like that first hit db then run server
    app.listen(7777, () => {
      console.log("Server is running on 7777 port");
    });
  })
  .catch((error) => {
    console.log("DB connection failed");
  });

//create instance of a model
