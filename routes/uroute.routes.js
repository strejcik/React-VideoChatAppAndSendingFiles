const express = require('express');
const router = express.Router();
const User = require('../models/user.model');




//add
router.post("/", async(req, res) => {
  const newMessage = new Message(req.body);
  try{
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
  }catch(err)
  {
      res.status(500).json(err);
  }
});


router.get("/users", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  module.exports = router;
  