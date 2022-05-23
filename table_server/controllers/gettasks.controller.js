const db = require('../models');
const Task = db.task;

exports.getAllTasks = (req, res) => {
    Task.find({}, {
        title: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        createdBy: true,
    }).exec((err, task) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Something went wrong while fetching tasks."
            });
            return;
        }

        res.status(200).send({
            tasks: task
        });
    });
}

exports.addTask = (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: req.body.createdBy,
    });

    task.save((err, task) => {
        if (err) {
            res.status(500).send({ message: err.message || "Something went wrong while adding task." });
            return;
        }
        res.status(200).send({
            message: "Task added successfully.",
        });
    })
}