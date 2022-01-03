const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const Site = mongoose.model(
  'Site',
  // eslint-disable-next-line no-undef
  (SiteSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    // devicesId: [mongoose.Schema.Types.ObjectId],
    lignesId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Ligne'
      }
    ],
    name: { type: String, required: true },
    nbrDevice: Number,
    lng: { type: String, required: true },
    lat: { type: String, required: true },
    description: { type: String, required: true }
  }))
);
module.exports = Site;
