const express = require("express");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const User = require('./schema/employee');
const methodOverride = require('method-override');

var app = express();
require('./pass-config')(passport);

const {mongoose} = require('./db/mongoose');

var db = mongoose.connection;

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false}));
app.use(express.static(__dirname + '/views'));
app.use(flash());
app.use(session({
     secret: 'nikkkhil',
     saveuninitialized:true,
     resave:true
 }));
 app.use(methodOverride('_method'));
 app.use(passport.initialize());
 app.use(passport.session());

 

app.get('/',checkAuthenticated,(req,res) => {
    res.render('index.ejs')
});

app.get('/login',(req,res) => {
    res.render('login.ejs')
});

app.get('/register',checkNotAuthenticated,(req,res) => {
    res.render('register.ejs')
});

//Route for registration

app.post('/register', async (req,res) => {
 const hashpass = await bcrypt.hash(req.body.password, 10);
    var user = new User ({
        name:req.body.name,
        email:req.body.email,
        password:hashpass
    });
    user.save().then((doc) => {
        res.redirect('/login')
    },(e) => {
        res.status(400).send(e);
    });
});

//Route for login 

app.post('/login',
    passport.authenticate('local',{
       successRedirect:'/',
       failureFlash: true,
       failureRedirect: '/login'
  }));

function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login');
};

function checkNotAuthenticated(req,res,next){
    if(!req.isAuthenticated()){
       next()
    }
    res.redirect('/');
};
function checkAuthForLogin(req,res,next){
    if(req.isAuthenticated()){
        res.redirect('/')
    }
    next();
}

// server

const PORT = process.env.PORT || 3000;

app.listen(PORT , console.log(`Started on Port ${PORT}`
));



