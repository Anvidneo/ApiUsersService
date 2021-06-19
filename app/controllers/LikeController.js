const Like = require('../models/Like');

// Functions
function findAll(req, res) {
    Like.find({})
        .then(likes => {
            if(likes.length) return res.status(200).send({likes})
            return res.status(204).send({ message:"Likes don't have contect" })
        }).catch(error => res.status(500).send({ error: error }));
}

function findById(req, res) {
    if (req.body.error) return res.status(500).send({error: error});
    let like = req.body.like;
    if (like) return res.status(200).send({ like });
    return res.status(404).send({message: 'Not found'});
}

function newLike (req, res) {
    new Like(req.body)
        .save()
        .then(like => res.status(201).send({like}))
        .catch(error => res.status(500).send({error: error}))
}

function updateLike(req, res) {
    // In error case
    if(req.body.error) return res.status(500).send({error: error});
    if(!req.body.like) return res.status(404).send({message: 'Not found'});
    // Update like
    let like = req.body.like[0]; 
    like = Object.assign(like, req.body);
    like.save()
        .then(like => res.status(200).send({message: 'Like updated succesfully', like}))
        .catch(error => res.status(500).send({error: error}));
}

function deleteLike(req, res) {
    if(req.body.error) return res.status(500).send({error: error});
    if(!req.body.like) return res.status(404).send({message: 'Not found'});
    req.body.like[0].remove()
        .then(like => res.status(200).send({message: 'Like removed sucessfully', like}))
        .catch(error => res.status(500).send({error: error}))
}

function findLike(req, res, next){
    let query = {};
    query[req.params.key] = req.params.value
    Like.find(query).then(likes => {
        if(!likes.length) return next();
        req.body.like = likes;
        return next();
    }).catch(error =>{
        req.body.error = error;
        next();
    })
}

module.exports = { findAll, findById, newLike, updateLike, deleteLike, findLike }