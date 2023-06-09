const mongoose = require('mongoose');

const manufacturerSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  to: {
    type:String,
    required: true,
  },
  from: {
    type:String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  address: {
    type:String ,
    required: true,
  },
  transporter: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);

module.exports = Manufacturer;
