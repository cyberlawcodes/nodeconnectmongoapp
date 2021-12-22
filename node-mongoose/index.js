const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}); //this is a wrapper over Mongo connect method - the objection that is passed in as second argument
//addressed deprecated warnings 

connect.then(() => {//connect method returns a promise
    console.log('Connected correctly to server');

    Campsite.create({//.create replaces Campsite = newCampsite (model) returns a promise that resolves to a new document - this is the start of the promise chain
        name: 'React Lake Campground',
        description: 'test'
    })
    .then(campsite => {
        console.log(campsite);//if it worked
        return Campsite.find();//will look for all docs based on this campsite model
    })
    .then(campsites => {//if succesful, it returns an array of docs
        console.log(campsites);
        return Campsite.deleteMany();//called on all docs that use the campsite model
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch(err => {//catches any errors in this chain
        console.log(err);
        mongoose.connection.close();
    });
});