const nestedProperty = require('nested-property');
const Device = require('./../models/Device');
const Ligne = require('./../models/Ligne');
const GlobalSensor = require('./../models/GlobalSensor');

//........................ hadhi post add device
//................... affectation
exports.addDevice = async (req, res) => {
  GlobalSensor.findOne({ code: req.body.code }, async function(
    err,
    foundObject
  ) {
    if (err) {
      res.json({ status: 'err', message: 'Error' });
    } else if (!foundObject) {
      res.json({ status: 'err', message: 'Object not found' });
    }
  }).then(item => {
    if (item == null) {
      res.json({ status: 'err', message: 'Object already added' });
    } else {
      Device.findOne(
        { code: item.code, ligneId: req.body.ligneId, siteId: req.body.siteId },
        async function(err, ObjectFoundinDevice) {
          if (err) {
            res.json({ status: 'err', message: 'Object not found' });
          } else if (ObjectFoundinDevice == null) {
            const mono = new Device({
              userId: req.id,
              lng: req.body.lng,
              lat: req.body.lat,
              name: req.body.name,
              siteId: req.body.siteId,
              siteName: req.body.siteName,
              ligneId: req.body.ligneId,
              ligneName: req.body.ligneName,
              Countersdata: [],
              ConsomationTripahse: [],
              ActivePowerTipahse: [],
              type: item.type,
              code: req.body.code
            });
            const ligne = await Ligne.findById({ _id: mono.ligneId });
            ligne.devices.push(mono);
            await ligne.save();
            mono.save();
            res.json({ status: 'success', message: 'Object added ' });
          } else {
            res.json({ status: 'err', message: 'Object not found' });
          }
        }
      );
    }
  });
};
////......................addGlobal sensor
exports.device = async (req, res) => {
  const globalSensor = new GlobalSensor({
    code: req.body.code,
    type: req.body.type
  });
  try {
    Device.findOne({ code: req.body.code }, async function(err, foundObject) {
      if (foundObject) {
        res.json({ status: 'err', message: 'Device already added' });
      } else {
        globalSensor
          .save()
          .then(item => {
            res.send('item saved to database');
          })
          .catch(err => {
            res.status(400).send('unable to save to database');
          });
      }
    });
  } catch (e) {
    console.log('error AddSensor Data', e);
  }
};

/// .................................find by code
exports.findByCode = async (req, res) => {
  try {
    const s = await Device.find({ code: req.body.code });

    if (s.length < 1) {
      await res.json({ status: 'err', message: 'not found' });
      return;
    }
    res.json(s);
  } catch (err) {
    res.json({ message: err.message });
  }
};

///.......................find device by user
exports.findByUser = async (req, res) => {
  s = await Device.find({ userId: req.id })
    .populate('siteId', 'name description -_id')
    .populate('ligneId', 'name description -_id')
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
// .....................find by type........////
exports.findByType = async (req, res) => {
  try {
    const s = await Device.find({
      type: req.body.type,
      userId: req.id,
      siteId: req.body.siteId,
      ligneId: req.body.ligneId
    });
    const s1 = await Device.find({ type: req.body.type, userId: req.id });
    if (s.length > 0) {
      await res.json(s);
      return;
    }
    if (s.length < 1) {
      await res.json(s1);
      return;
    }
  } catch (err) {
    res.json({ message: err.message });
  }
};
//..........................FindAll..........//
exports.findAll = async (req, res) => {
  try {
    const s = await Device.find({ userId: req.id });
    res.json(s);
    //  console.log("All sensor:" + s)
  } catch (err) {
    res.json({ message: err.message });
  }
};
///...........delete Device
exports.delete = (req, res) => {
  Device.findByIdAndRemove(req.params.id).then(device => {
    if (!device) {
      return res.status(404).send({
        message: `device not found with code ${req.params.id}`
      });
    }
    res.status(200).json({
      status: 'success',
      data: null
    });
  });
};

//......getByLigne.......
exports.findbyLine = async (req, res) => {
  try {
    const s = await Device.find({
      userId: req.id,
      ligneName: req.body.ligneName
    });
    res.json(s);
    //  console.log("sensor by factory:" + s)
  } catch (err) {
    res.json({ message: err.message });
  }
};
exports.updateDevice = async (req, res) => {
  console.log('d5al');
  const device = await Device.findByIdAndUpdate(req.params.id);

  if (req.body.name != null) {
    device.code = req.body.code;
    device.name = req.body.name;
    device.lng = req.body.lng;
    device.lat = req.body.lat;
  }

  device.save();
  await res.json(device);
};

// service change state in data base of actioneur !
exports.updateState = async (req, res) => {
  const device = await Device.findOne({ code: req.params.code });

  // if (device.type === 'mono') {
  device.state = req.body.state;
  // }

  const updatedDevice = await device.save();
  await res.json(updatedDevice);
  console.log(device.state);
};

exports.updatelignestate = async (req, res) => {
  const ligneid = req.params.id;
  //  const devid = req.params.id;
  const l = await Ligne.findOne({ _id: ligneid }).populate('devices');
  for (let i = 0; i < l.devices.length; i++) {
    l.devices[i].state = req.body.state;
    l.devices[i].save();
    console.log(ligneid);
    console.log(l.devices[i].state);
  }
  // const updatedDevice = await l.save();
  await res.json(l);
  // console.log();
  // res.json('success');
};
