

//for packet.json use----> npm init -y

const express =require("express");
const app =express();
const mongoose=require("mongoose");
const dotenv=require('dotenv');   // for security key.
const authRoute=require('./routes/auth');

const transporterRoute=require("./routes/transporter");
const manufacturerRoute =require("./routes/manufacturer");
const cors = require("cors");
const path =require("path");

dotenv.config();

//it just a promise means it may be successful or fail.

mongoose.connect(process.env.MONGO_URL)   // it give promises.
.then(function(db){                    
    console.log("Database connected")
})
.catch(function(err){
    console.log(err);
});


app.use(express.json());
app.use(cors());     
app.use("/api/auth",authRoute);
app.use("/api/transMessage",transporterRoute);
app.use("/api/manuMessage",manufacturerRoute);






app.listen(process.env.PORT || 5000,()=>{
    console.log("Backend server is running .");
});
