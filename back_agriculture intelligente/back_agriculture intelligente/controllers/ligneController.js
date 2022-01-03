const Ligne = require('./../models/Ligne');
const AppError = require('./../utils/appError');
const Site = require('./../models/Site');
const Device = require('./../models/Device');
//......................................add ligne.........................................//
exports.addLigne = async (req, res, next) => {
  try {
    const ligne = new Ligne({
      userId: req.id,
      name: req.body.name,
      siteName: req.body.siteName,
      siteId: req.body.siteId,
      description: req.body.description,
      lng: req.body.lng,
      lat: req.body.lat,
      state: req.body.state
    });
    Ligne.findOne({ userId: req.id, name: req.body.name }, async function(
      err,
      foundObject
    ) {
      if (foundObject) {
        res.json({ status: 'err', message: 'ligne already exists' });
      } else {
        ligne
          .save()
          .then(item => {
            res.json({ status: 'success', mesage: 'ligne saved to database' });
          })
          .catch(err => {
            res.status(400).send('unable to save to database');
          });
      }
    });
    const site = await Site.findById({ _id: ligne.siteId });
    site.lignesId.push(ligne);
    await site.save();
  } catch (e) {
    console.log('error ligne Data', e);
  }

  // const ligne = new Ligne(req.body);
};
//......................................GetLigneByUser.........................................//
exports.getLigneByUser = async (req, res) => {
  const ligne = await Ligne.find({ userId: req.id })
    //.select('siteId', 'siteName')
    .populate('siteId', 'name description -_id')
    .populate('devices')
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
//......................................GetLigneBySite.........................................//
exports.getLigneBySite = async (req, res) => {
  try {
    const l = await Ligne.find({ siteId: req.siteId });

    res.json(l);
  } catch (err) {
    res.json({ message: err.message });
  }
};
//......................................GetLigneByName.........................................//
exports.getLigneByName = async (req, res) => {
  const L = await Ligne.find({ name: req.body.name })
    .populate('siteId', 'name')
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
exports.getLigneById = async (req, res) => {
  const l = await Ligne.findById(req.params.id)
    .populate('devices')
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
//......................................DeleteLigne.........................................//
exports.deleteLigne = async (req, res, next) => {
  //  console.log(`req id: ${req.params.id}`);
  const ligne = await Ligne.findByIdAndDelete(req.params.id);
  res.status(200).json(ligne);
};
//......................................update.........................................//
exports.updateLigne = async (req, res) => {
  console.log('d5al');
  const ligne = await Ligne.findByIdAndUpdate(req.params.id);

  if (req.body.name != null) {
    ligne.name = req.body.name;
    ligne.lng = req.body.lng;
    ligne.lat = req.body.lat;
  }

  ligne.save();
  await res.json(ligne);
};

module.exports.socketId = 'tt';
