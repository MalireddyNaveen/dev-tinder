const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: { type: String },
    emailID: String,
    password: String,
    age: Number,
    gender: String,
    createDate: [{ type: Date, default: Date.now }],
  },
  {
    timestamps: true,
  }
);

//mongoose schema methods

userSchema.methods.getJwt = async function () {
  const user = this;
  const token =await  jwt.sign({ _id: user._id }, "DEVTinder@5276$09", {
    expiresIn: "7d",
  });
console.log(token)
  return token;
};

userSchema.methods.validatePassword = async function (passwordEntered) {
  const user = this;
  const isPasswordValidate = await bcrypt.compare(passwordEntered, user.password);
  return isPasswordValidate;
};

// const UserModel = mongoose.model("User", userSchema);

// module.exports={
//     UserModel
// }

module.exports = mongoose.model("User", userSchema);
