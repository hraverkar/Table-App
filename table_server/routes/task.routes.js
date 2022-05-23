const gettasksController = require('../controllers/gettasks.controller.js');

module.exports = function (app) {

    app.get('/api/gettask',
        gettasksController.getAllTasks);
    
    app.post('/api/addtask',
        gettasksController.addTask);
}