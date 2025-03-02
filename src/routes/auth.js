const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation");
const User = require("../model/user");
const bcrypt = require("bcrypt");
authRouter.post("/signup", async (req, res) => {
  //use try catch for error handling
  try {
    const { firstName, lastName, emailID, password, age } = req.body;
    //validate the req.body
    validateSignUpData(req);
    //encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      emailID,
      password: hashedPassword,
      age,
    });
    //save user to db
    await newUser.save(); //it returns a promise so handle with async await
    res.send("User created Sunccessfully!!");
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailID, password } = req.body;
    const user = await User.findOne({ emailID: emailID });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValidate =await user.validatePassword(password);
    console.log(isPasswordValidate);

    if (isPasswordValidate) {
      const token = await user.getJwt();
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7); // Add 7 days
      res.cookie("token", token, { expires: expirationDate });
      res.send("Login Successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires:new Date(Date.now()) });
  res.send("Log out successfully")
});

module.exports = authRouter;