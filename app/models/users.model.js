const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    email: String,
    password: String
}, {
    timestamps: true
});

//module.exports = mongoose.model('Note', NoteSchema);

module.exports = mongoose.model('Users',UsersSchema);