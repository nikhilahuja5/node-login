const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/REGISTRATION',{
    useNewUrlParser:true,
    useUnifiedTopology:true},
    (err, db) => {
        if(err){
            return console.log('MONGODB NOT Connected');
        }
        console.log('MongoDB Connected');
    });

module.exports = {mongoose};