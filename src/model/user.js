const mongoose =require("mongoose");

const {Schema}=mongoose

const userSchema=new Schema({
    firstName:String,
    lastName:{type:String},
    emailID:String,
    password:String,
    age:Number,
    gender:String,
    createDate:[{type:Date, default:Date.now}]
})

// const UserModel = mongoose.model("User", userSchema);

// module.exports={
//     UserModel
// }

module.exports= mongoose.model("User",userSchema)