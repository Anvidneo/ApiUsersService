const Publication = require('../models/Publication');

// Functions
function findAll(req, res) {
    Publication.find({})
        .then(publications => {
            if(publications.length) return res.status(200).send({publications})
            return res.status(204).send({ message:"Publications don't have contect" })
        }).catch(error => res.status(500).send({ error: error }));
}

function findById(req, res) {
    if (req.body.error) return res.status(500).send({error: error});
    let publication = req.body.publication;
    if (publication) return res.status(200).send({ publication });
    return res.status(404).send({message: 'Not found'});
}

function newPublication (req, res) {
    new Publication(req.body)
        .save()
        .then(publication => res.status(201).send({publication}))
        .catch(error => res.status(500).send({error: error}))
}

function updatePublication(req, res) {
    // In error case
    if(req.body.error) return res.status(500).send({error: error});
    if(!req.body.publication) return res.status(404).send({message: 'Not found'});
    // Update publication
    let publication = req.body.publication[0]; 
    publication = Object.assign(publication, req.body);
    publication.save()
        .then(publication => res.status(200).send({message: 'Publication updated succesfully', publication}))
        .catch(error => res.status(500).send({error: error}));
}

function deletePublication(req, res) {
    if(req.body.error) return res.status(500).send({error: error});
    if(!req.body.publication) return res.status(404).send({message: 'Not found'});
    req.body.publication[0].remove()
        .then(publication => res.status(200).send({message: 'Publication removed sucessfully', publication}))
        .catch(error => res.status(500).send({error: error}))
}

function findPublication(req, res, next){
    let query = {};
    query[req.params.key] = req.params.value
    Publication.find(query).then(publications => {
        if(!publications.length) return next();
        req.body.publication = publications;
        return next();
    }).catch(error =>{
        req.body.error = error;
        next();
    })
}

module.exports = { findAll, findById, newPublication, updatePublication, deletePublication, findPublication }