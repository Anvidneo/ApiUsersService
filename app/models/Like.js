const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    idUser: { 
        type: String,
        required: true
    },
    idPublication: { 
        type: String,
        required: true
    }
});

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;