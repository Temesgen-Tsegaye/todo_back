const taskModel = require('../model/school_model');

exports.getTask= (req, res) => {
    taskModel.getAll((err, task) => {
        if (err) {
            res.status(404).send(err);
            return;
        }
        res.status(201).send(task);

    });
}

exports.createTask= (req, res) => {
    const newTask= new taskModel(req.body);
    taskModel.create(newTask, (err, task) => {
        if (err) {
            res.status(404).send(err);
            return;
        }
        res.status(201).send(task);

    });
}

exports.getSingelTask= (req, res) => {
    taskModel.findById(req.params.id, (err, task) => {
        if (err) {
            res.status(404).send(err);
            return;
        }
        res.status(201).send(task);
    });
}

exports.updateTask= (req, res) => {
    const task= new taskModel(req.body);
    taskModel.updateById(req.params.id, task, (err, task) => {
        if (err) {
            res.status(404).send(err);
            return;
        }
        res.status(201).send(task);
    });
}

exports.deleteTask= (req, res) => {
    taskModel.remove(req.params.id, (err, task) => {
        if (err) {
            res.status(404).send(err);
            return;
        }
        res.status(201).send(task);
    });
}

