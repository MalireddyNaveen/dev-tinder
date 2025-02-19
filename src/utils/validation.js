const validator = require("validator");

const validateSignUpData=(req)=>{
    const {firstName,lastName,emailID,password} = req.body;
    if(!firstName || !lastName ){
        throw new Error("Please enter First Name and Last Name");
        
    }
    else if(!(validator.isEmail(emailID))){
        throw new Error("Please Eneter correct email");
       
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter stromg password");
        
    }

}


module.exports = validateSignUpData;