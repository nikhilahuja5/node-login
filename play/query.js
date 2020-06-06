const {mongoose} = require('./../db/mongoose');
const {User} = require('./../schema/employee');

var name = "vinay";

User.findOne({
    name: name
}).then((user) => {
    console.log( user.email)
}).catch((err) => {
  console.log('user not register')
})