
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    //userType is added for MERN Dashboard intern manufacturer .
    userType: {
        type: String,
        required: true,
        enum: ['manufacturer', 'transporter'],
      },
    address:{
      type:String,
      required:true
    }
   

}, { timestamps: true }
);



module.exports=mongoose.model('User',UserSchema);
