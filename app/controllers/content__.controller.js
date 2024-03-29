
const Content = require('../models/content.model.js');

// Create and Save a new Content
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Content content can not be empty"
        });
    }

    // Create a Content
    const content = new Content({
        title: req.body.title || "Untitled Content", 
        category: req.body.category,
        notes: req.body.notes
    });

    // Save Content in the database
    content.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Content."
        });
    });
};

// Retrieve and return all contents from the database.
exports.findAll = (req, res) => {
    Content.find()
    .then(content => {
        res.send(content);
        console.log("In findAll method");
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving contents."
        });
    });
};
// Find a single content with a contentId
exports.findOne = (req, res) => {
    Content.findById(req.params.contentId)
    .then(content => {
        if(!content) {
            return res.status(404).send({
                message: "Content not found with id " + req.params.contentId
            });            
        }
        res.send(content);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Content not found with id " + req.params.contentId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving content with id " + req.params.contentId
        });
    });
};

// Update a content identified by the contentId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Content content can not be empty"
        });
    }

    // Find content and update it with the request body
    Content.findByIdAndUpdate(req.params.contentId, {
        title: req.body.title || "Untitled Content",
        category: req.body.category,
        notes: req.body.notes
    }, {new: true})
    .then(content => {
        if(!content) {
            return res.status(404).send({
                message: "Content not found with id " + req.params.contentId
            });
        }
        res.send(content);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Content not found with id " + req.params.contentId
            });                
        }
        return res.status(500).send({
            message: "Error updating content with id " + req.params.contentId
        });
    });
};

// Delete a content with the specified contentId in the request
exports.delete = (req, res) => {
    Content.findByIdAndRemove(req.params.contentId)
    .then(content => {
        if(!content) {
            return res.status(404).send({
                message: "Content not found with id " + req.params.contentId
            });
        }
        res.send({message: "Content deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Content not found with id " + req.params.contentId
            });                
        }
        return res.status(500).send({
            message: "Could not delete content with id " + req.params.contentId
        });
    });
};