const{MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/DATA',(err,db) =>{
    if(err){
        return console.log('Unable to connect to MongoDb');
    }
    console.log('Connected to mongodb');

db.collection('users').find().toArray().then((docs) => {
    console.log('user');
    console.log(JSON.stringify(docs, undefined,2));
}, (err) => {
    console.log('Unable to fetch todos', err);
});
  
 db.close();
});
