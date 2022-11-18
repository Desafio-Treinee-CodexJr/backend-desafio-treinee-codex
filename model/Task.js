const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    text: {type: String, required: true},
    done: {type: Boolean, required: true, default: false}
});

TaskSchema.pre('save', async function(next) {
    let todo = this;
    return next();
});

module.exports = mongoose.model('Task', TaskSchema);