module.exports = (app) => {
    const users = require('../controllers/users.controller.js');

    // Create a new User
    app.post('/addUser', users.create);

    // Retrieve match user
    app.post('/checkUser', users.findOne);
}