module.exports = (app) => {
    const users = require('../controllers/users.controller.js');

    // Create a new User
    app.post('/users', users.create);

    // Retrieve match user
    app.get('/users', users.findOne);
}