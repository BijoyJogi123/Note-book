const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength:[20,'name can not be more than 20 charecters']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        
    },
    date: {
        type: Date,
        default: Date.now
    },
});
           

module.exports =  mongoose.model('user', UserSchema);