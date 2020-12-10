const Joi = require('joi');
const mongoose = require('mongoose');
const Course = mongoose.model('Course' , new mongoose.Schema({
    name: {
    type: String,
    required : true,
    maxlength : 200,
    minlength : 5
    }
    }));
   // const Course = mongoose.model('Course', Course);

    function validatecourse(course) {
        const schema = {
          name: Joi.string().min(3).required()
        };
      
        return Joi.validate(course, schema);
      }
      module.exports.Course = Course;
      module.exports.validate = validatecourse;
      module.exports.courseSchema = Course; 