var exports = module.exports = {};

exports.insert = function(dbName, data) {
    var url = 'mongodb://localhost:27017/myproject';

    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect(url, function (err, db) {

        db.collection(dbName, function (err, collection) {
            if (err) throw err;
            collection.insert(data);
        });

    });

}

exports.queryAll = function(dbName, callback) {
    var url = 'mongodb://localhost:27017/myproject';

    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect(url, function (err, db) {

        db.collection(dbName, function (err, collection) {

            collection.find().toArray(function (err, items) {
                if (err) throw err;
                console.log(items);
                callback(JSON.stringify(items));
            });
        });

    });

}

exports.findOne = function (dbName, userInfo, callback) {
    var url = 'mongodb://localhost:27017/myproject';
    
    var MongoClient = require('mongodb').MongoClient;
    
    MongoClient.connect(url, function (err, db) {
        
        db.collection(dbName, function (err, collection) {
            
            collection.findOne(userInfo,function (err, user) {
                if (err) throw err;
                if (user) {
                    callback(true); 
                }
                else {
                    callback(false);
                }
            });
        });

    });

}


return module.exports;
