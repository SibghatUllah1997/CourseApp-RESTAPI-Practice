const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const config = require("config");
const auth = require('../Middlewares/auth');

const jwt=require('jsonwebtoken');
const express = require('express');
const { User, validate } = require('../models/user');
const router = express.Router();


router.get('/me', auth , async (req, res) =>{
    const user = await User.findById(req.User._id).select('-password');
    res.send(user);


});
router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email});
    if(user) return res.status(400).send('This user is already registered');
    user = new User(_.pick(req.body , ['name' , 'email', 'password'])
    );
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password , salt);

    await user.save();

  
    // let course = new Course({ name: req.body.name });
    // course = await course.save();
    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send(_.pick(user , ['_id', 'name' , 'email']))
});
module.exports = router;