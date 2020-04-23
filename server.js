const _ = require('lodash');
const express = require("express");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
//const flash = require('express-flash');
//require('./pass-confg')(passport)
//const initializePassport = require('./passportconfig');
//initializePassport(passport)


const {mongoose} = require('./db/mongoose');
const {Employee} = require('./schema/employee');
var app = express();
var db = mongoose.connection;

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/views'));
app.use(session({
    secret:'thesecret',
    saveinitialized:false,
    resave:false
}))

app.get('/',(req,res) => {
    res.render('index.ejs')
});

app.get('/login', (req,res) => {
    res.render('login.ejs')
});

app.get('/register', (req,res) => {
    res.render('register.ejs')
});

app.post('/register', async (req,res) => {
 const hashpass = await bcrypt.hash(req.body.password, 10);
    var employee = new Employee ({
        name:req.body.name,
        email:req.body.email,
        password:hashpass
    });
    employee.save().then((doc) => {
        res.redirect('/login')
    },(e) => {
        res.status(400).send(e);
    });
});




app.post('/login', (req,res) => {
    passport.use(new LocalStrategy( 
        Employee.findOne({email:req.body.email}, (err, employee) => {
             if(err) {return document(err); }
             if(!employee){
                return  done(err);
             }
        })
    ));
      
    passport.authenticate('local',{failureRedirect:'/login'}),
    function(req, res){
        res.send(employee);
    }
});



const PORT = process.env.PORT || 3000;

app.listen(PORT , console.log(`Started on Port ${PORT}`
));

//module.exports = {app};

