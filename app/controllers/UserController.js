const User = require('../models/User');
const bcryptjs = require('bcryptjs');

// Functions
function findAll(req, res) {
    User.find({})
        .then(users => {
            if(users.length) return res.status(200).send({users})
            return res.status(204).send({ message:"Users don't have contect" })
        }).catch(error => res.status(500).send({ error: error }));
}

function findById(req, res) {
    if (req.body.error) return res.status(500).send({error: error});
    let user = req.body.user;
    if (user) return res.status(200).send({ user });
    return res.status(404).send({message: 'Not found'});
}

function newUser (req, res) {
    let passwordHash = bcryptjs.hashSync(req.body.password, 10);
    req.body.password = passwordHash;
    new User(req.body)
        .save()
        .then(user => res.status(201).send({user}))
        .catch(error => res.status(500).send({error: error}))
}

function updateUser(req, res) {
    // In error case
    if(req.body.error) return res.status(500).send({error: error});
    if(!req.body.user) return res.status(404).send({message: 'Not found'});
    // Encryot new password
    let passwordHash = bcryptjs.hashSync(req.body.password, 10);
    req.body.password = passwordHash;
    // Update user
    let user = req.body.user[0]; 
    user = Object.assign(user, req.body);
    user.save()
        .then(user => res.status(200).send({message: 'User updated succesfully', user}))
        .catch(error => res.status(500).send({error: error}));
}

function deleteUser(req, res) {
    if(req.body.error) return res.status(500).send({error: error});
    if(!req.body.user) return res.status(404).send({message: 'Not found'});
    req.body.user[0].remove()
        .then(user => res.status(200).send({message: 'User removed sucessfully', user}))
        .catch(error => res.status(500).send({error: error}))
}

function login(req, res) {
    const { username, password } = req.body;

    User.findOne({username}, (err, user) => {
        if(err){
            res.status(500).send({error: error})
        } else if(!user){
            res.status(500).send({message: 'User not found'})
        } else {
            // // REVISAR ESTA PARTE (Acepta cualquier contraseña)
            if (bcryptjs.compare(password, user.password)) {
                res.status(200).send({message: 'User login succesfully'});
            } else {
                res.status(500).send({error: error});
            }
        }
    });   
}

function findUser(req, res, next){
    let query = {};
    query[req.params.key] = req.params.value
    User.find(query).then(users => {
        if(!users.length) return next();
        req.body.user = users;
        return next();
    }).catch(error =>{
        req.body.error = error;
        next();
    })
}

module.exports = { findAll, findById, newUser, updateUser, deleteUser, findUser, login }