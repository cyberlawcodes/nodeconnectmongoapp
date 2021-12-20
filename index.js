const MongoClient = require('mongodb').MongoClient; //requires driver and pulls in the MongoClient object
const assert = require('assert').strict;
const dboper = require('./operations');

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
        assert.strictEqual(err, null);
        console.log('Dropped Collection:', result);

        dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test"},
            'campsites', result => {
            console.log('Insert Document:', result.ops);

            dboper.findDocuments(db, 'campsites', docs => {
                console.log('Found Documents:', docs);

                dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
                    { description: "Updated Test Description" }, 'campsites',
                    result => {
                        console.log('Updated Document Count:', result.result.nModified);

                        dboper.findDocuments(db, 'campsites', docs => {
                            console.log('Found Documents:', docs);
                            
                            dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                                'campsites', result => {
                                    console.log('Deleted Document Count:', result.deletedCount);

                                    client.close();
                                }
                            );
                        });
                    }
                );
            });
        });
    });
});