const express = require('express');

const router = express.Router();
const sitecontroller = require('./../controllers/SiteController');
const authController = require('./../controllers/authController');

router.route('/addSite').post(authController.protect, sitecontroller.addSite);

router
  .route('/deleteSite/:id')
  .delete(authController.protect, sitecontroller.deleteSite);

router
  .route('/getSiteByUser')
  .get(authController.protect, sitecontroller.getSiteByUser);
router
  .route('/getSiteByName')
  .get(authController.protect, sitecontroller.getSiteByName);

router
  .route('/updateSite/:id')
  .patch(authController.protect, sitecontroller.updateSite);

module.exports = router;
