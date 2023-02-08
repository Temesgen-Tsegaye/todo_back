const db = require('../config/db.config');

const taskModel = function (task) {
    this.title = task.title;
    this.date = task.date;
    this.completed = task.completed;
    this.collectionId=task.collectionId;
    
};


taskModel.create = (newTask, result) => {
    db.query("INSERT INTO task SET ?", newTask, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created task: ", { id: res.insertId, ...newTask });
        result(null, { id: res.insertId, ...newTask });
    });
};

taskModel.findById = (taskId, result) => {
    db.query(`SELECT * FROM task WHERE id = ${taskId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found task: ", res[0]);
            result(null, res[0]);
            return;
        } else {
            result(null, []);
        }
    });
};

const queryy=`SELECT task.title,task.date,task.completed,collection.name
FROM task
INNER JOIN collection
ON task.collectionId=collection.id
`

taskModel.getAll = result => {
    db.query(queryy, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("task: ", res);
        result(null, res);
    });
};
// taskModel.getAll = result => {
//     db.query("SELECT * FROM task", (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }
//         console.log("task: ", res);
//         result(null, res);
//     });
// };

taskModel.updateById = (id, task, result) => {

    db.query(
        `UPDATE task SET 
        title= '${task.title}',
        date= '${task.date}',
        completed= '${task.completed}',
        collectionId= '${task.collectionId}'
        WHERE id =  ${id}`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                // not found task with the id
                result(null, []);
                return;
            }

            console.log("updated task: ", { id: id, ...task });
            result(null, { id: id, ...task });
        }
    );
};

taskModel.remove = (id, result) => {
    db.query("DELETE FROM task WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found task with the id
            result(null, []);
            return;
        }

        console.log("deleted task with id: ", id);
        result(null, res);
    });
};

module.exports = taskModel;
