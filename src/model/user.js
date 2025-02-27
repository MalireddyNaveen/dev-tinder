const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, minLength: 4, maxLength: 30, required: true },
    lastName: { type: String, minLength: 1, maxLength: 30, required: true },
    emailID: {
      type: String,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address: " + value);
        }
      },
    },
    password: {
      type: String,
      unique: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Plese enter an Strong password");
        }
      },
    },
    age: {
      type: Number,
      validate(value) {
        if (value < 18) {
          throw new Error("age must be 18 or above");
        }
      },
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].include(value.toLowerCase())) {
          throw new Error("Please select correct Gender");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

//mongoose schema methods

userSchema.methods.getJwt = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEVTinder@5276$09", {
    expiresIn: "7d",
  });
  console.log(token);
  return token;
};

userSchema.methods.validatePassword = async function (passwordEntered) {
  const user = this;
  const isPasswordValidate = await bcrypt.compare(
    passwordEntered,
    user.password
  );
  console.log(isPasswordValidate)
  return isPasswordValidate;
};

// const UserModel = mongoose.model("User", userSchema);

// module.exports={
//     UserModel
// }

module.exports = mongoose.model("User", userSchema);
