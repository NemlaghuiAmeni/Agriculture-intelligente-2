const mongoose = require('mongoose');
const { Schema } = require('mongoose');

mongoose.set('useFindAndModify', false);
const Device = mongoose.model(
  'Device',
  // eslint-disable-next-line no-undef
  (DeviceShema = new mongoose.Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    lng: { type: String, required: true },
    lat: { type: String, required: true },
    siteId: {
      type: Schema.Types.ObjectId,
      ref: 'Site',
      required: true
    },
    ligneId: {
      type: Schema.Types.ObjectId,
      ref: 'Ligne',
      required: true
    },
    code: { type: String, required: true },
    name: String,
    data: [],
    Consomation: [],
    siteName: String,
    state: { type: Boolean, default: true },
    ligneName: String,
    Countersdata: [],
    type: { type: String },
    //, enum: ['compteur', 'sensor'] }
    ConsomationTripahse: [],
    PositiveTripahse: [],
    ReverserTipahse: [],
    ActivePowerTipahse: [],
    Voltage_CurrentrTipahse: []

    // batteryLevel: String,
    //  area: String
  }))
);

module.exports = Device;
