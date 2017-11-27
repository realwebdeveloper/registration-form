var exports = module.exports = {};

exports.insert = function(data) {
    var url = 'mongodb://localhost:27017/myproject';

    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect(url, function (err, db) {

        db.collection('peopleList', function (err, collection) {
            if (err) throw err;
            collection.insert(data);
        });

    });

}

exports.queryAll = function(callback) {
    var url = 'mongodb://localhost:27017/myproject';

    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect(url, function (err, db) {

        db.collection('peopleList', function (err, collection) {

            collection.find().toArray(function (err, items) {
                if (err) throw err;
                callback(JSON.stringify(items));
            });
        });

    });

}


return module.exports;
