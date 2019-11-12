const User = require('../models/users.model.js');

// Create and Save a new User
exports.create = (req, res) => {
    //Validate request
    if(!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "User content can not be empty!"
        });
    }
    console.log("Request data:"+JSON.stringify(req.body));
    // Create a User
    const newUser = new User({
        email: req.body.email, 
        password: req.body.password
    });
    
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            res.send(err)
        }else {
            if (user) {
                newUser.save(function (err) {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send({ statusMessage: "User updated successfully", status: "Success", data: newUser });
                    }
                });

            } else {
                
                newUser.save(function (err) {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send({ statusMessage: "User added successfully", status: "Success", data: newUser });
                    }
                });
                // }
            }
        }
    })
};


// Find a single note with a noteId
exports.findOne = (req, res) => {
    console.log("In single user find:"+req.body.email)
    User.findOne({ email : req.body.email , password: req.body.password } )
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not Found"
            });            
        }

        if(user) {
            return res.status(200).send({
                message: "Logged in successfully!",
                data : user
            });            
        }
        res.send(user);
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


