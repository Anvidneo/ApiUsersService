const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { 
        type: String, 
        unique: true,
        required: true
    },
    password: { 
        type: String,
        required: true
    },
    name: { 
        type: String,
        required: true
    },
    lastname: { 
        type: String,
        required: true
    },
    email: { 
        type: String,
        unique: true,
    },
    phone: { 
        type: String,
        unique: true,
    },
    status: { 
        type: Boolean,
        required: true
    },
    idRoot: { 
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;