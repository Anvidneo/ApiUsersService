const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PermitSchema = new Schema({
    description: { 
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

const Permit = mongoose.model('Permit', PermitSchema);

module.exports = Permit;