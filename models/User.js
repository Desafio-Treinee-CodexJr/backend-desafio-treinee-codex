const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    years: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        match: [/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/, 'Formato de email inválido'],
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

module.exports = model('User', UserSchema);