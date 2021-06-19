const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublicationSchema = new Schema({
    nameImg: { 
        type: String
    },
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
    }
});

const Publication = mongoose.model('Publication', PublicationSchema);

module.exports = Publication;