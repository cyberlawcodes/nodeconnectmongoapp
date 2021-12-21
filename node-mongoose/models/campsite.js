const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campsiteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Campsite = mongoose.model('Campsite', campsiteSchema);//model named Campsite is created - first arg is name of collection and then the schema 
//returns a constructor function like prototype - instantiate documents (rows)

module.exports = Campsite;