const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailID, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Please enter First Name and Last Name");
  } else if (!validator.isEmail(emailID)) {
    throw new Error("Please Eneter correct email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter stromg password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = ["firstName", "lastName", "gender", "age"];

  const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field))

  return isEditAllowed
};

module.exports = {validateSignUpData,validateEditProfileData};
