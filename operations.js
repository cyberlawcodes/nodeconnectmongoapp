//four methods to insert, find, remove, update documents
//each method will be exported

//const assert = require('assert').strict; //this is error checking - no longer need with promise 

exports.insertDocument = (db, document, collection) => {
    const coll = db.collection(collection);//we expect this to be a string
    // we can now use the coll variable to interact with the selected collection
    return coll.insertOne(document); //MongoDB driver natively accepts promises to more callback for error handling with the return 
};
exports.findDocuments = (db, collection) => {
    const coll = db.collection(collection);//we expect this to be a string
    // we can now use the coll variable to interact with the selected collection
    return coll.find().toArray();
};

exports.removeDocument = (db, document, collection) => {
    const coll = db.collection(collection);//we expect this to be a string
    // we can now use the coll variable to interact with the selected collection
    return coll.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection) => {
    const coll = db.collection(collection);//we expect this to be a string
    // we can now use the coll variable to interact with the selected collection
    return coll.updateOne(document, { $set: update }, null);
};