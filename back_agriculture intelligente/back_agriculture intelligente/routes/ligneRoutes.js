const express = require('express');
const ligneController = require('./../controllers/ligneController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/addLigne')
  .post(authController.protect, ligneController.addLigne);

router
  .route('/getLigneByUser')
  .get(authController.protect, ligneController.getLigneByUser);
router
  .route('/getLigneBySite')
  .get(authController.protect, ligneController.getLigneBySite);
router
  .route('/getLigneByName')
  .get(authController.protect, ligneController.getLigneByName);
router
  .route('/getLigneById/:id')
  .get(authController.protect, ligneController.getLigneById);
router
  .route('/deleteLigne/:id')
  .delete(authController.protect, ligneController.deleteLigne);
router
  .route('/updateLigne/:id')
  .patch(authController.protect, ligneController.updateLigne);

module.exports = router;
