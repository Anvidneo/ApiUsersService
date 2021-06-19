const Permit = require('../models/Permit');

// Functions
function findAll(req, res) {
    Permit.find({})
        .then(permits => {
            if(permits.length) return res.status(200).send({permits})
            return res.status(204).send({ message:"Permits don't have contect" })
        }).catch(error => res.status(500).send({ error: error }));
}

function findById(req, res) {
    if (req.body.error) return res.status(500).send({error: error});
    let permit = req.body.permit;
    if (permit) return res.status(200).send({ permit });
    return res.status(404).send({message: 'Not found'});
}

function newPermit (req, res) {
    new Permit(req.body)
        .save()
        .then(permit => res.status(201).send({permit}))
        .catch(error => res.status(500).send({error: error}))
}

function updatePermit(req, res) {
    // In error case
    if(req.body.error) return res.status(500).send({error: error});
    if(!req.body.permit) return res.status(404).send({message: 'Not found'});
    // Update permit
    let permit = req.body.permit[0]; 
    permit = Object.assign(permit, req.body);
    permit.save()
        .then(permit => res.status(200).send({message: 'Permit updated succesfully', permit}))
        .catch(error => res.status(500).send({error: error}));
}

function deletePermit(req, res) {
    if(req.body.error) return res.status(500).send({error: error});
    if(!req.body.permit) return res.status(404).send({message: 'Not found'});
    req.body.permit[0].remove()
        .then(permit => res.status(200).send({message: 'Permit removed sucessfully', permit}))
        .catch(error => res.status(500).send({error: error}))
}

function findPermit(req, res, next){
    let query = {};
    query[req.params.key] = req.params.value
    Permit.find(query).then(permits => {
        if(!permits.length) return next();
        req.body.permit = permits;
        return next();
    }).catch(error =>{
        req.body.error = error;
        next();
    })
}

module.exports = { findAll, findById, newPermit, updatePermit, deletePermit, findPermit }