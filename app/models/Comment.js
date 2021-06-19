const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: { 
        type: String,
        required: true
    },
    status: { 
        type: Boolean,
        required: true
    },
    idUser: { 
        type: String,
        required: true
    },
    idPublication: { 
        type: String,
        required: true
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;