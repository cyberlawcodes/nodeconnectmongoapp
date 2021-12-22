const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    } // first argument to the commentSchema 
}, {
    timestamps: true //second argument - then the schema is a subschema of campsite schema below
});

const campsiteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [commentSchema] //this array is a subschema that is defined above - each cmapsite document is now aboe to store
    //multiple commments stored in an array
}, {
    timestamps: true
});

const Campsite = mongoose.model('Campsite', campsiteSchema);//model named Campsite is created - first arg is name of collection and then the schema 
//returns a constructor function like prototype - instantiate documents (rows)

module.exports = Campsite;