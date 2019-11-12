const mongoose = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UsersSchema = mongoose.Schema({
    email: {
        type: String,
        // trim: true,
        // lowercase: true,
        //required: true,
        //unique: true,
        //required: 'Email address is required',
        //validate: [validateEmail, 'Please fill a valid email address'],
        //match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
      }
}, {
    timestamps: true
});

//module.exports = mongoose.model('Note', NoteSchema);

module.exports = mongoose.model('Users',UsersSchema);