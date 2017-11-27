const http = require('http');
const router = require('./router');

// // Connect to the db
// function insert(db)
// {
//     db.collection('Persons', function (err, collection) {

//         collection.insert({ id: 1, firstName: 'Steve', lastName: 'Jobs' });
//         collection.insert({ id: 2, firstName: 'Bill', lastName: 'Gates' });
//         collection.insert({ id: 3, firstName: 'James', lastName: 'Bond' });



//         db.collection('Persons').count(function (err, count) {
//             if (err) throw err;

//             console.log('Total Rows: ' + count);
//         });
//     });
// }

// function queryw(db){
//     db.collection('Persons', function (err, collection) {

//         collection.find().toArray(function (err, items) {
//             if (err) throw err;
//             console.log(items);
//         });

//     });
// }

// function update(db){
//     db.collection('Persons', function (err, collection) {
//         collection.update({ id: 1 }, { $set: { firstName: 'James', lastName: 'Gosling' } }, { w: 1 },
//             function (err, result) {
//                 if (err) throw err;
//                 console.log('Document Updated Successfully');
//             });
//     });
// }

// function remove(db){
//     db.collection('Persons', function (err, collection) {

//         collection.remove({ id: 3 }, { w: 1 }, function (err, result) {

//             if (err) throw err;

//             console.log('Document Removed Successfully');
//         });

//     });
// }

// var url = 'mongodb://localhost:27017/myproject';

// var MongoClient = require('mongodb').MongoClient;

// MongoClient.connect(url, function (err, db) {
//     console.log('Connected to mongodb server');

// });

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer(router.handleRequest);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});



