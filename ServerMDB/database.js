var exports = module.exports = {};

exports.insert = function(data) {
    var url = 'mongodb://localhost:27017/myproject';

    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect(url, function (err, db) {

        db.collection('accounts', function (err, collection) {
            if (err) throw err;
            collection.insert(data);
        });

    });

}

exports.queryAll = function(callback) {
    var url = 'mongodb://localhost:27017/myproject';

    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect(url, function (err, db) {

        db.collection('accounts', function (err, collection) {

            collection.find().toArray(function (err, items) {
                if (err) throw err;
                callback(JSON.stringify(items));
            });
        });

    });

}

exports.findOne = function (encodedKey, callback) {
    console.log('findOne');
    var url = 'mongodb://localhost:27017/myproject';

    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect(url, function (err, db) {
        db.collection('accounts', function (err, collection) {
            collection.findOne({key: encodedKey},function (err, user) {
                console.log(user);
                console.log(callback);
                if (err) throw err;
                callback(user);
            });
        });

    });

}


return module.exports;
