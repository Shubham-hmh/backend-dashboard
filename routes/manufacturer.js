const express = require('express');
const router = express.Router();
const Manufacturer =require("../models/Manufacturer");


// GET all transporters
router.get('/messages', async (req, res) => {
  const { orderId, to, from } = req.query;

  try {
    let query = {};

    if (orderId) {
      query.orderId = orderId;
    }

    if (to) {
      query.to = to;
    }

    if (from) {
      query.from = from;
    }

    const messages = await Manufacturer.find(query).populate("to from address");
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET a single manufacturer by ID
router.get('/:id', async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findById(req.params.id);
    if (!manufacturer) {
      return res.status(404).json({ error: 'Manufacturer not found' });
    }
    res.json(manufacturer);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new transporter
router.post('/manufacturer', async (req, res) => {
  const newManufacturer = new Manufacturer(req.body);
  try{
        const savedCart =await newManufacturer.save();
        res.status(200).json(savedCart);
  }
  catch(err){
      res.status(500).json(err);
  }
});

// PUT update a transporter by ID
router.put('/:id', async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!manufacturer) {
      return res.status(404).json({ error: 'Transporter not found' });
    }
    res.json(manufacturer);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a manufacturer by ID
router.delete('/:id', async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findByIdAndRemove(req.params.id);
    if (!manufacturer) {
      return res.status(404).json({ error: 'Transporter not found' });
    }
    res.json({ message: 'Transporter deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
