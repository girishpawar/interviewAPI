const User = require('../models/users.model.js');

// Create and Save a new User
exports.create = (req, res) => {
    //Validate request
    if(!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "User content can not be empty!", success:false, error: true
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
            if (!user) {
                newUser.save(function (err) {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send({ statusMessage: "User added successfully!", success:false,error: true, data: newUser });
                    }
                });
                // }
            }else{
               
                res.send({ statusMessage: "User already exist!", success:false, error: true, data: newUser });
            }
        }
    })
};


// Find a single note with a noteId
exports.findOne = (req, res) => {

    //Validate request
    if(!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "Please provide user details!", success:false, error: true
        });
    }else{

        console.log("In single user find:"+req.body.email)
        User.findOne({ email : req.body.email , password: req.body.password } )
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "Incorrect user details!",
                    success:false,
                    error: true
                });   
                //res.send({ statusMessage: "User added successfully", status: "Success", data: newUser });         
            }

            if(user) {
                return res.status(200).send({
                    message: "Logged in successfully!",
                    data : user,
                    success:true,
                    error: false
                });            
            }
            res.send(user);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Incorrect Login Details",
                    success:false,
                    error: true
                });                
            }
            return res.status(500).send({
                message: "Error retrieving User details ",
                success:false,
                error: true
            });
        });
    }
};


