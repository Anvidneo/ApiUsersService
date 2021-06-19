const Comment = require('../models/Comment');

// Functions
function findAll(req, res) {
    Comment.find({})
        .then(comments => {
            if(comments.length) return res.status(200).send({comments})
            return res.status(204).send({ message:"Comments don't have contect" })
        }).catch(error => res.status(500).send({ error: error }));
}

function findById(req, res) {
    if (req.body.error) return res.status(500).send({error: error});
    let comment = req.body.comment;
    if (comment) return res.status(200).send({ comment });
    return res.status(404).send({message: 'Not found'});
}

function newComment (req, res) {
    new Comment(req.body)
        .save()
        .then(comment => res.status(201).send({comment}))
        .catch(error => res.status(500).send({error: error}))
}

function updateComment(req, res) {
    // In error case
    error = req.body.error;
    if(error) return res.status(500).send({error: error});
    if(!req.body.comment) return res.status(404).send({message: 'Not found'});
    // Update comment
    let comment = req.body.comment[0]; 
    comment = Object.assign(comment, req.body);
    comment.save()
        .then(comment => res.status(200).send({message: 'Comment updated succesfully', comment}))
        .catch(error => res.status(500).send({error: error}));
}

function deleteComment(req, res) {
    if(req.body.error) return res.status(500).send({error: error});
    if(!req.body.comment) return res.status(404).send({message: 'Not found'});
    req.body.comment[0].remove()
        .then(comment => res.status(200).send({message: 'Comment removed sucessfully', comment}))
        .catch(error => res.status(500).send({error: error}))
}

function findComment(req, res, next){
    let query = {};
    query[req.params.key] = req.params.value
    Comment.find(query).then(comments => {
        if(!comments.length) return next();
        req.body.comment = comments;
        return next();
    }).catch(error =>{
        req.body.error = error;
        next();
    })
}

module.exports = { findAll, findById, newComment, updateComment, deleteComment, findComment }