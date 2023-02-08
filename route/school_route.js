const express = require('express');
const router = express.Router();

const task = require('../controller/school_controller');

router.get('/', task.getTask);
router.post('/', task.createTask);
router.get('/:id', task.getSingelTask);
router.put('/:id', task.updateTask);
router.delete("/:id", task.deleteTask);


module.exports = router;
