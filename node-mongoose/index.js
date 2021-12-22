const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}); //this is a wrapper over Mongo connect method - the objection that is passed in as second argument
//addressed deprecated warnings 

connect.then(() => {//connect method returns a promise
    console.log('Connected correctly to server');

    Campsite.create({//.create replaces Campsite = newCampsite (model) returns a promise that resolves to a new document - this is the start of the promise chain
        name: 'React Lake Campground2',
        description: 'test'
    })
    .then(campsite => {
        console.log(campsite);//if it worked

        return Campsite.findByIdAndUpdate(campsite._id, { 
            $set: { description: 'Updated Test Document' }//this is like setState - changing the document
        }, {
            new: true //this will return the updated document or else you will only get the former document returned
        });//updating the document after creating the commentsschema and subdocument
        //three arguments into the findByAndUpdate
    })
    .then((campsite) => {
        console.log(campsite);//this should console.log the original and the new document with the updated description 
        //next we add the subdocument - its an array so we can use push
        campsite.comments.push({
            rating: 5,
            text: 'What a magnificent view!',
            author:'Tinus Lorvaldes'
        });

        return campsite.save();//this makes this take effect
    })
    .then(campsite => {//if succesful, it returns a single campsite document
        console.log(campsite);
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