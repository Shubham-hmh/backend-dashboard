const express = require('express');
const router = express.Router();
const Transporter =require("../models/Transporter");
const Manufacturer =require("../models/Manufacturer");


// GET all transporters
router.get('/messages', async (req, res) => {
  const { orderId } = req.query;

  try {
    let query = {};

    if (orderId) {
      query.orderId = orderId;
    }

   
    const messages = await Transporter.find(query).populate("orderId");
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET a single manufacturer by ID
router.get('/:id', async (req, res) => {
  try {
    const transporter = await Transporter.findById(req.params.id);
    if (!transporter) {
      return res.status(404).json({ error: 'Manufacturer not found' });
    }
    res.json(transporter);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});






// POST a new message
router.post('/transporter', async (req, res) => {
  try {
    const { orderId, price } = req.body;

    // Find the Order document by orderId
    const order = await Manufacturer.findOne({ orderId });
    console.log(order);

    // If the order is found, create a new Message document with the populated orderId
    if (order) {
      const newMessage = new Transporter({
        orderId: order._id ,// Use the _id of the order document
        price,
      });

      await newMessage.save();

      res.status(201).json({ message: 'Message sent successfully' });
    } else {
      // Handle case when order is not found
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Message sending failed' });
  }
});



// DELETE a manufacturer by ID
router.delete('/:id', async (req, res) => {
  try {
    const transporter = await Transporter.findByIdAndRemove(req.params.id);
    if (!transporter) {
      return res.status(404).json({ error: 'Transporter not found' });
    }
    res.json({ message: 'Transporter deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
