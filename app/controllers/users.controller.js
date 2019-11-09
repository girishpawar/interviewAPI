const User = require('../models/users.model.js');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    // if(!req.body.content) {
    //     return res.status(400).send({
    //         message: "User content can not be empty"
    //     });
    // }

    // Create a User
    const note = new User({
        email: req.body.email, 
        password: req.body.password
    });

    // Save User in the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};


// Find a single note with a noteId
exports.findOne = (req, res) => {
    console.log("In single user find"+req.params.email)
    User.findOne({ email : req.params.email , password: req.params.password } )
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Logged in successfully"
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Incorrect Login Details"
            });                
        }
        return res.status(500).send({
            message: "Error retrieving User details "
        });
    });
};


