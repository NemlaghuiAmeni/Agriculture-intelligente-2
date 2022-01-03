const mongoose = require('mongoose');
const { Schema } = require('mongoose');

mongoose.set('useFindAndModify', false);
const Alert = mongoose.model(
  'Device',
  // eslint-disable-next-line no-undef
  (AlertSchema = new mongoose.Schema({
    email: String,
    userId: String,
    ligneId: mongoose.Schema.Types.ObjectId,
    deviceId: mongoose.Schema.Types.ObjectId,
    min: Number,
    max: Number,
    status: String,
    data: String,
    Nsms: Boolean,
    Nemail: Boolean,
    Ntoast: Boolean,
    deviceName: String,
    ligneName: String
  }))
);

module.exports = Alert;
