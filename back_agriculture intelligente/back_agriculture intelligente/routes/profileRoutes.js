const express = require('express');

const router = express.Router();
// const jwt = require('jsonwebtoken');
// const Cryptr = require('cryptr');
const U = require('../models/userModel');
const authcontroller = require('../controllers/authController');

// const cryptr = new Cryptr('myTotalySecretKey');

// const encryptedString = cryptr.encrypt('123456');
// const decryptedString = cryptr.decrypt(encryptedString);

router.get('/getProfile', authcontroller.protect, async (req, res) => {
  try {
    const UserProfile = await U.findById({ _id: req.id });
    res.json(UserProfile);
    console.log(UserProfile);
  } catch (err) {
    // res.header('Access-Control-Allow-Headers', '*');
    res.json({ status: 'err', message: err.message });
  }
});

router.post('/update', async (req, res) => {
  const us = await U.findById({ _id: req.id });

  if (req.body.username != null) {
    us.username = req.body.username;
  }

  /* if (req.body.password != null) {
    const encryptedString = cryptr.encrypt(req.body.password);
    us.password = encryptedString;
  }*/
  if (req.body.email != null) {
    us.email = req.body.email;
  }
  us.save();

  await res.json(us);
});

module.exports = router;
