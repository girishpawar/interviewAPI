module.exports = (app) => {
    const notes = require('../controllers/content.controller.js');

    // Create a new Note
    app.post('/notes', notes.create);

    // Retrieve all Notes
    app.get('/notes', notes.findAll);

    // Retrieve a single Note with contentId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with contentId
    app.put('/notes/:noteId', notes.update);

    // Delete a Note with contentId
    app.delete('/notes/:noteId', notes.delete);
}