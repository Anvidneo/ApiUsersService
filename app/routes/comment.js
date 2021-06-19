const express = require('express');
const CommentController = require('../controllers/CommentController');

const Router = express.Router();

Router.get('/', CommentController.findAll);
Router.post('/', CommentController.newComment);
Router.get('/:key/:value', CommentController.findComment, CommentController.findById);
Router.put('/:key/:value', CommentController.findComment, CommentController.updateComment);
Router.delete('/:key/:value', CommentController.findComment, CommentController.deleteComment);

module.exports = Router;