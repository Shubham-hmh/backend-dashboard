const mongoose = require('mongoose');

const transporterSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Manufacturer",
    required: true,
  },
 price:{
    type:String,
    required:true
 },
 
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Transporter = mongoose.model('Transporter', transporterSchema);

module.exports = Transporter;
