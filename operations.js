//four methods to insert, find, remove, update documents
//each method will be exported

const assert = require('assert').strict; //this is error checking

exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);//we expect this to be a string
    // we can now use the coll variable to interact with the selected collection
    coll.insertOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result); //defined elsewhere
    }); //from the MongoDB driver
};
exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);//we expect this to be a string
    // we can now use the coll variable to interact with the selected collection
    coll.find().toArray((err, docs) => {
        assert.strictEqual(err, null);
        callback(docs);
    });
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);//we expect this to be a string
    // we can now use the coll variable to interact with the selected collection
    coll.deleteOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);//we expect this to be a string
    // we can now use the coll variable to interact with the selected collection
    coll.updateOne(document, { $set: update }, null, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);  
    });
};