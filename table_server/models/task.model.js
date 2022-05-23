const mongoose = require('mongoose');

const Task = mongoose.model('Task',
    new mongoose.Schema({
        title: String,
        description: String,
        status: String,
        createdAt: Date,
        updatedAt: Date,
        createdBy: String,
    }, { timestamps: true }));


module.exports = Task;