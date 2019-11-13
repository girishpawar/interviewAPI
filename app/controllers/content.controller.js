const Note = require('../models/content.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    //Validate request
    if(!req.body.title || !req.body.category || !req.body.notes) {
        return res.status(400).send({
            message: "Please provide notes data!", success:false, error: true
        });
    }else{

        // Create a Note
        const note = new Note({
            title: req.body.title || "Untitled Note", 
            category: req.body.category,
            notes: req.body.notes
        });

        // Save Note in the database
        note.save()
        .then(notedata => {
            //res.send(data);
            return res.status(200).send({
                message: "Note added successfully!", success:true, error: false,data : notedata
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while creating the Note.", 
                success:false, error: true
            });
        });
    }
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    
    Note.find()
    .then(notes => {
        //res.send(notes);
        console.log("Got all notes",notes);
        return res.status(200).send({
            message: "Get all notes.",
            data : notes,
            success:true,
            error: false
        });    
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes.",
            success:false,
            error: true    
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {


    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId,
                success:false,
                error: true    
            });            
        }else{
            return res.status(200).send({
                message: "Note Found :" + req.params.noteId,
                data:note,
                success:true,
                error: false    
            });       
        }
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
     //Validate request
     if(!req.body.title || !req.body.category || !req.body.notes ) {
        return res.status(400).send({
            message: "Please provide notes data!", success:false, error: true
        });
    }else{
        // Find note and update it with the request body
        Note.findByIdAndUpdate(req.params.noteId, {
            title: req.body.title || "Untitled Note",
            category: req.body.category,
            notes: req.body.notes
        }, {new: true})
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId, success:false, error: true
                });
            }else{
                return res.status(200).send({
                    message: "Note updated successfully!", success:true, error: false, data:note
                });
            }
            //res.send(note);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId,success:false, error: true
                });                
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.noteId,success:false, error: true
            });
        }); 
    }
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId,success:false, error: true
            });
        }
        res.send({message: "Note deleted successfully!", success:true, error: false});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId,success:false, error: true
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId,success:false, error: true
        });
    });
};