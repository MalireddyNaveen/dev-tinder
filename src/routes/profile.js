const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middlewares/userAuth");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const { validateEditProfileData } = require("../utils/validation");
const validator = require("validator");
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;
    // Object.keys(req.body).every()
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });
    await loggedInUser.save();
    // await User.findByIdAndUpdate(req.user._id,req.body,{runValidators:true})
    res.json({
      message: `${loggedInUser.firstName}, your profile is updated successfully`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const isOldAndNewPasswordSame = await bcrypt.compare(
      req.body.password,
      loggedInUser.password
    );
    if (isOldAndNewPasswordSame) {
      throw new Error("New password should not be same as previous password");
    }
    if (!validator.isStrongPassword(req.body.password)) {
      throw new Error("Please enter strong password");
    }
    const newHashedPassword = await bcrypt.hash(req.body.password, 10);
    loggedInUser.password = newHashedPassword;
    await loggedInUser.save();
    res.send("Password updated successfully");
  } catch (error) {
    res.send("ERROR : " + error.message);
  }
});
module.exports = profileRouter;
