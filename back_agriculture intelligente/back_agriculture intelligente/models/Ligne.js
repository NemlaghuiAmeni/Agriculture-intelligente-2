const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const Ligne = mongoose.model(
  'Ligne',
  // eslint-disable-next-line no-undef
  (LigneSchema = new mongoose.Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    siteId: {
      type: Schema.Types.ObjectId,
      ref: 'Site',
      required: true
    },
    siteName: {
      type: String,
      required: true
    },
    devices: [
      {
        // eslint-disable-next-line no-undef
        type: Schema.Types.ObjectId,
        ref: 'Device'
      }
    ],
    lng: { type: String },
    lat: { type: String },
    name: { type: String, required: true },
    nbrDevice: Number,
    state: { type: Boolean, default: false }
    /* profile: [
      {
        days: { type: [String], default: ['Monday', 'Tuesday'] },
        starttime: { type: Date, default: Date.now() },
        endtime: { type: Date, default: Date.now() },
        niveau: { type: Number, default: 75 }
      }
    ]*/
  }))
);

module.exports = Ligne;
