const MongoClient = require('mongodb').MongoClient; //requires driver and pulls in the MongoClient object
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => { //used this method to connect to the MongoDB server - this gave us a client object that we used below

    assert.strictEqual(err, null); //checks to see if there err is strictly equal to null or else it fails
    //the above is essentially a shorthand of if (error === null) quit else continue

    console.log(`Connected correctly to MongoDB server`);

    //interacting with the MongoDb - connects the nucampsite data with the MongoDB server so we can interact with it
    const db = client.db(dbname);
    //delete all the documents in the nucampsite collect - we don't usually delete - drop = delete
    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null); //again checks to see if err is strictly equal to null 
        console.log('Dropped Collection', result); //this will return true if succesful
        //now we are creating the collection again
        const collection = db.collection('campsites');
        //insert a document into the collection - and objection and callback function for error handling
        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"}, 
        (err, result) => {
            assert.strictEqual(err, null); //again checking if there is an error - if error, it will stop, if not, it will continue
            console.log('Insert Document:', result.ops); //will return array of doc inserted

            collection.find().toArray((err, docs) => { //we are printing all of the records with an error check first and returning as an array to show in the console
                assert.strictEqual(err, null);
                console.log('Found Documents:', docs);

                client.close(); //this closes the client connection to the MongoDB server
            });
        });
    });
});

// we have so many error callback nesting because of asynchronous operations but it is not ideal