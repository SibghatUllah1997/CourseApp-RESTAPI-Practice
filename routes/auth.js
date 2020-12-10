const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const config = require('config');
const { User } = require('../models/user');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email});
    if(!user) return res.status(400).send('Invalid Email or Password');

   const validPassword = await bcrypt.compare(req.body.password , user.password);
    if(!validPassword) return res.status(400).send('Invalid Email or Password');
    const token = user.generateAuthToken();
    res.send(token);

  
    // let course = new Course({ name: req.body.name });
    // course = await course.save();
    
    //res.send(_.pick(user , ['_id', 'name,' , 'email']))
});
function validate(req) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(1024).required()


    };
  
    return Joi.validate(req, schema);
  }
module.exports = router;