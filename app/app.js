const express = require('express');
const mongoose = require('mongoose');

const app = express();

const User = require('./routes/user');
const Publication = require('./routes/publication');
const Comment = require('./routes/comment');
const Like = require('./routes/like');
const Permit = require('./routes/permit');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', User);
app.use('/api/publication', Publication);
app.use('/api/comment', Comment);
app.use('/api/like', Like);
app.use('/api/permit', Permit);

module.exports = app;