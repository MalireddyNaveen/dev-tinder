const jwt = require("jsonwebtoken");
const User = require("../model/user")

const userAuth = async (req,res,next) => {
    try {
        const { token } = req.cookies;
        if(!token){
          throw new Error("Invalid token !!!");
          
        }
        const { _id } = await jwt.verify(token, "DEVTinder@5276$09");
        const user = await User.findById(_id);    
        console.log(user)
        if(!user){
          throw new Error("User not found");
          
        }
        req.user=user
        next()
    } catch (error) {
        res.status(400).send("ERROR :" + error.message);
    }
 
};


module.exports=userAuth