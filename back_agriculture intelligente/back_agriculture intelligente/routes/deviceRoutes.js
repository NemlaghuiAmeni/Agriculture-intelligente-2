const express = require('express');
const deviceController = require('./../controllers/deviceController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/addDevice')
  .post(authController.protect, deviceController.addDevice);
router.route('/addsensor').post(deviceController.device);
router
  .route('/findbycode')
  .get(authController.protect, deviceController.findByCode);
router
  .route('/findbytype')
  .get(authController.protect, deviceController.findByType);
router
  .route('/findbyuser')
  .get(authController.protect, deviceController.findByUser);
router.route('/findAll').get(authController.protect, deviceController.findAll);
router
  .route('/findbyligne')
  .get(authController.protect, deviceController.findbyLine);
router
  .route('/delete/:id')
  .delete(authController.protect, deviceController.delete);

router
  .route('/updateStatebycode/:code')
  .patch(authController.protect, deviceController.updateState);
router
  .route('/updateDevice/:id')
  .patch(authController.protect, deviceController.updateDevice);
router
  .route('/update/:id/')
  .patch(authController.protect, deviceController.updatelignestate);
module.exports = router;
