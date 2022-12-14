const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, select: false},
    name: {type: String, required: true},
    gender: {type: String, required: true},
    age: {type: Number, required: true},
    created: {type: Date, default: Date.now},
    tasks: {type: [Object], default: []},
    count: {type: Number, default: 0},
    photo: {type: String, default: 'https://www.casadatelha.com.br/wp-content/uploads/default-profile-picture1.jpg'}
});

UserSchema.pre('save', async function(next) {
    let user = this;
    if (!user.isModified('password')) return next();

    user.password = await bcrypt.hash(user.password, 10);
    return next();
});

module.exports = mongoose.model('User', UserSchema);
