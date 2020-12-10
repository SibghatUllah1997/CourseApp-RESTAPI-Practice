const Joi = require('joi');
const mongoose = require('mongoose');
const config = require("config");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
    type: String,
    required : true,
    maxlength : 200,
    minlength : 5
    },
    email: {
        type: String, 
        required : true,
        maxlength : 255,
        minlength : 5,
        unique : true
        },
        password: {
            type: String,
            required : true,
            maxlength : 1024,
            minlength : 5
            },
            isAdmin : Boolean
    });
    userSchema.methods.generateAuthToken =  function(){
        const token =  jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('JwtPrivateKey'));
        return token;
    }
const User = mongoose.model('User' , userSchema);
    //const User = mongoose.model('User', cuserSchema);

    function validateUser(user) {
        const schema = {
          name: Joi.string().min(3).required(),
          email: Joi.string().min(5).max(255).required().email(),
          password: Joi.string().min(5).max(1024).required()


        };
      
        return Joi.validate(user, schema);
      }
      module.exports.User = User;
      module.exports.validate = validateUser;
