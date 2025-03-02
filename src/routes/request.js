const userAuth = require("../middlewares/userAuth");
const { ConnectoinRequestModel } = require("../model/connectionRequest");
const express = require("express");
const User = require("../model/user");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id,
        toUserId = req.params.toUserId,
        status = req.params.status;

      const allowedStatus = ["ignored", "intrested"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Unkown Status");
      }
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        throw new Error("User not found!");
      }

      const exsistingConnectionRequest = await ConnectoinRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (exsistingConnectionRequest) {
        throw new Error("Connection Request Already Exists!!");
      }
      const newConnectionReuest = new ConnectoinRequestModel({
        fromUserId,
        toUserId,
        status,
      });
      await newConnectionReuest.save();
      res.send("Connection was successfully");
    } catch (error) {
      res.status(400).send("ERROR : " + error.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestID",
  userAuth,
  async (req, res) => {
    try {
      const allowedStatus = ["accepted", "rejected"];

      const { status, requestID } = req.params;
      const loggedInUser = req.user;
      if (!allowedStatus.includes(status)) {
        throw new Error("Unkown Status");
      }

      const connectionRequest = await ConnectoinRequestModel.findOne({
        _id: requestID,
        toUserId: loggedInUser._id,
        status: "intrested",
      });
      if (!connectionRequest) {
        throw new Error("Connection request not found");
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({ message: "Connection request " + status, data });
    } catch (error) {
      res.status(400).send("ERROR : " + error.message);
    }
  }
);

module.exports = requestRouter;
