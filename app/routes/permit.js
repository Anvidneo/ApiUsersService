const express = require('express');
const PermitController = require('../controllers/PermitController');

const Router = express.Router();

Router.get('/', PermitController.findAll);
Router.post('/', PermitController.newPermit);
Router.get('/:key/:value', PermitController.findPermit, PermitController.findById);
Router.put('/:key/:value', PermitController.findPermit, PermitController.updatePermit);
Router.delete('/:key/:value', PermitController.findPermit, PermitController.deletePermit);

module.exports = Router;