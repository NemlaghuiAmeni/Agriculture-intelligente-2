const express = require('express');
const Ligne = require('./../models/Ligne');
const Site = require('./../models/Site');

const AppError = require('./../utils/appError');

//......................................add site.........................................//
exports.addSite = async (req, res) => {
  const site = new Site({
    userId: req.id,
    name: req.body.name,
    description: req.body.description,
    lng: req.body.lng,
    lat: req.body.lat
  });
  try {
    Site.findOne({ userId: req.id, name: req.body.name }, async function(
      err,
      foundObject
    ) {
      if (foundObject) {
        res.json({ status: 'err', message: 'site already exists' });
      } else {
        site
          .save()
          .then(item => {
            res.json({ status: 'success', mesage: 'site saved to database' });
          })
          .catch(err => {
            res.status(400).send('unable to save to database');
          });
      }
    });
  } catch (e) {
    console.log('error site Data', e);
  }
};
//......................................GetSiteByUser.........................................//
exports.getSiteByUser = async (req, res) => {
  const S = await Site.find({ userId: req.id })
    .populate({
      path: 'lignesId',
      populate: {
        path: 'devices'
      }
    })
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
//......................................DeleteSite.........................................//
exports.deleteSite = async (req, res, next) => {
  //  console.log(`req id: ${req.params.id}`);
  const site = await Site.findByIdAndDelete(req.params.id);

  if (!site) {
    return next(new AppError('No Site found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: null
  });
};
//......................................update.........................................//
exports.updateSite = async (req, res) => {
  console.log('d5al');
  const site = await Site.findByIdAndUpdate(req.params.id);

  if (req.body.name != null) {
    site.name = req.body.name;
    site.description = req.body.description;
    site.lng = req.body.lng;
    site.lat = req.body.lat;
  }

  site.save();
  await res.json(site);
};
//...........getSiteByname..............//
exports.getSiteByName = (req, res) => {
  // const { name }: req.params;

  Site.find({ name: req.body.name })
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Not found Site with name ${name}` });
      else {
        res.send(data);
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving Site with name=${name}` });
    });
};
