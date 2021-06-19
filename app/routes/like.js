const express = require('express');
const LikeController = require('../controllers/LikeController');

const Router = express.Router();

Router.get('/', LikeController.findAll);
Router.post('/', LikeController.newLike);
Router.get('/:key/:value', LikeController.findLike, LikeController.findById);
Router.put('/:key/:value', LikeController.findLike, LikeController.updateLike);
Router.delete('/:key/:value', LikeController.findLike, LikeController.deleteLike);

module.exports = Router;