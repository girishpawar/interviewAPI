const mongoose = require('mongoose');

const ContentSchema = mongoose.Schema({
    title: String,
    category: String,
    notes: String
}, {
    timestamps: true
});

//module.exports = mongoose.model('Note', NoteSchema);

module.exports = mongoose.model('Note',ContentSchema);
