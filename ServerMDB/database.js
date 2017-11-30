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

exports.findOne = function (userInfo, callback) {
    console.log(2);
    var url = 'mongodb://localhost:27017/myproject';

    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect(url, function (err, db) {

        db.collection('accounts', function (err, collection) {

            collection.findOne(userInfo,function (err, user) {
                if (err) throw err;
                if (user) callback(true); 
                else callback(false);
            });
        });

    });

}


return module.exports;
