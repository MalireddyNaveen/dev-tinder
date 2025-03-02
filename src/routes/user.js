const express = require("express");
const userRouter = express.Router();
const userAuth = require("../middlewares/userAuth");
const { ConnectoinRequestModel } = require("../model/connectionRequest");
const User = require("../model/user"); 
const USER_SAFE_DATA="firstName lastName"
//only pending
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const data = await ConnectoinRequestModel.find({
      toUserId: loggedInUser._id,
      status: "intrested"
    }).populate("fromUserId", USER_SAFE_DATA);
    res.json({
      message: "Data fectched successfully ",
      data: data
    });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectoinRequestModel.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    }).populate("fromUserId", USER_SAFE_DATA)
    .populate("toUserId", USER_SAFE_DATA);
    console.log(connectionRequest)
    const data = connectionRequest.map((row)=>{
        if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
            return row.toUserId
        }
        return row.fromUserId
    })
    res.json({
      message: "Data fectched successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

userRouter.get("/feed",userAuth,async (req,res)=>{
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit  = parseInt(req.query.limit)|| 10;
    console.log(page);
    console.log(limit)
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;
    const connectionRequests  = await ConnectoinRequestModel.find({
      $or:[{fromUserId:loggedInUser._id},
        {toUserId:loggedInUser._id}
      ]
    }).select("fromUserId toUserId")
    console.log(connectionRequests )
    const hiddenUsersFromFeed = new Set();
    connectionRequests.forEach((row)=>{
      hiddenUsersFromFeed.add(row.fromUserId.toString());
      hiddenUsersFromFeed.add(row.toUserId.toString())
    })
    console.log(hiddenUsersFromFeed)
    const users = await User.find({
      $and:[
        {_id:{$nin: Array.from(hiddenUsersFromFeed)},
         _id:{$ne:loggedInUser._id}
      }
        
      ]
      
    }).select(USER_SAFE_DATA).skip(skip).limit(limit)
    // console.log(users)
   res.json({
    data:users
   })
  } catch (error) {
    res.status(400).send("ERROR : "+error.message);
  }
})

module.exports = userRouter;
