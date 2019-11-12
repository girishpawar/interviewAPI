const mongoose = require('mongoose');

const ContentSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
      },
    category: String,
    notes: {
        type: String,
        required: true
      }
}, {
    timestamps: true
});

//module.exports = mongoose.model('Note', NoteSchema);

module.exports = mongoose.model('Note',ContentSchema);
