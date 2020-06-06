const express = require('express');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name:{
         type:String,
         required:true
        },
        email:{
        type: String,
        required: true
         },
         password: {
         type:String,
         required:true  
         },
         date: {
         type: Date,
         dafault:Date.now
         }
        });

module.exports = mongoose.model('User', UserSchema)
//module.exports = {User};
//module.exports = User;