const express = require('express');
const PublicationController = require('../controllers/PublicationController');

const Router = express.Router();

Router.get('/', PublicationController.findAll);
Router.post('/', PublicationController.newPublication);
Router.get('/:key/:value', PublicationController.findPublication, PublicationController.findById);
Router.put('/:key/:value', PublicationController.findPublication, PublicationController.updatePublication);
Router.delete('/:key/:value', PublicationController.findPublication, PublicationController.deletePublication);

module.exports = Router;