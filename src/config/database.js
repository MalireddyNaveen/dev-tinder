const mongoose = require("mongoose");

const connectDb=async ()=>{
    await mongoose.connect("mongodb+srv://malireddynaveen:Stjy6empcwD2Yu0L@nodedev.oqneo.mongodb.net/decTinder") //retun a promise show wirte async await
}
// mongoose.connect("mongodb+srv://malireddynaveen:Stjy6empcwD2Yu0L@nodedev.oqneo.mongodb.net/decTinder") //retun a promise show wirte async await


// connectDb().then(()=>{
//     console.log("Db connect succesfully") //if we write like this first server is created and ten db is hitted its should not happen like that first hit db then run server
// })
// .catch((error)=>{
//         console.log("DB connection failed")
// })

module.exports=connectDb