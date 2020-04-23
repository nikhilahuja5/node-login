const express = require('express');
const validator = require('validator');
const mongoose = require('mongoose');

const Employee = mongoose.model('Employee', {
    name:{
        type:String,
        require:true
    },
    email:{
        type: String,
        require: true,
        validate: {
            validator: validator.isEmail,
            message:`{VALUE} is not valid email`
        }
    },
    password: {
        type:String,
        require:true  
    }

});

module.exports = {Employee}