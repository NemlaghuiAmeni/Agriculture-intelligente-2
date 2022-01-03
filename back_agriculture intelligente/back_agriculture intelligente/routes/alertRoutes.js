const express = require('express');

const router = express.Router();

const nodemailer = require('nodemailer');
const Alert = require('../models/Alert');

const Device = require('../models/Device');
const User = require('../models/userModel');

function sendEmail(receiver, value, status, data, name) {
  const result = '';
  const transporter = nodemailer.createTransport({
    service: 'Gmail',

    auth: {
      user: 'ameninemlaghi@gmail.com',
      pass: '123Ameni@'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: 'ameninemlaghi@gmail.com',
    to: receiver,
    subject: `${status} Notification from SmartLights`,
    text: ` Device   ${name}${data}`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
  return result;
}
router.post('/alert/add', async (req, res) => {
  const alert = new Alert({
    email: req.body.email,
    userId: req.id,
    deviceId: req.body._id,
    ligneId: req.body.ligne._id,
    data: req.body.data,
    max: req.body.Vmax,
    min: req.body.Vmin,
    status: req.body.status,
    Nsms: req.body.Nsms,
    Nemail: req.body.Nemail,
    Ntoast: req.body.Ntoast,
    deviceName: req.body.device.name,
    ligneName: req.body.name
  });

  try {
    console.log(`alert email:${req.body.email}`);

    a = await alert.save();
    res.json({ status: 'ok', message: 'alert add to data base' });
    return;
    res.json({ status: 'err', message: 'alert already existe' });
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
