const express = require('express');
const UserController = require('../controllers/UserController');

const Router = express.Router();

Router.get('/', UserController.findAll);
Router.post('/', UserController.newUser);
Router.get('/:key/:value', UserController.findUser, UserController.findById);
Router.put('/:key/:value', UserController.findUser, UserController.updateUser);
Router.delete('/:key/:value', UserController.findUser, UserController.deleteUser);
Router.post('/login', UserController.login);

module.exports = Router;