var express = require('express')
var router = express.Router();
var database = require('./database');
var security = require('./security')

router.get('/check-auth', function (req, res) {
  let userInfo = req.headers['auth-key'];
  if (!userInfo || userInfo == 'undefined') 
  {
    userInfo = security.encrypt(JSON.stringify({username: '', password: ''}));
  }
  let checkAuth = false;
  
  userInfo = security.decrypt(userInfo);
  
  database.findOne('accounts',JSON.parse(userInfo), (found) => {
    checkAuth = found;
  })
  if (checkAuth) res.send('true')
  else res.send('false')
})

router.get('/ListUserInfo', function (req, res) {
    database.queryAll('peopleList', function(data){
        res.send(data);
    })
})


router.get('/login', function (req, res) {
    let username = req.headers.username;
    let password = req.headers.password;
    let userinfo = { username: username, password: password };
    database.findOne('accounts', userinfo, (found) => {
        let checkLogin = found;
        if (checkLogin) {
            res.status(200).send(security.encrypt(JSON.stringify(userinfo)), () => { response.end(); });
        }
        else {
            res.sendStatus(401);
            res.end();
        }
    });
})

router.post('/uploadUserInfo', function(req, res) {
    var body = '';
    var json = {};
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', function () {
        json = JSON.parse(body);
        database.insert('peopleList', json);
        res.end();
    });
})


router.post('/signup', function(req, res){
    var body = '';
    var json = {};
    req.on('data', (chunk) => {
        body += chunk;
    })
    req.on('end', function () {
        json = JSON.parse(body);
        let userAccount = JSON.parse(body);
        delete userAccount.password;

        database.findOne('accounts', userAccount, function (found) {
            if (found) {
                res.sendStatus(400);
            }
            else {
                database.insert('accounts', json);
                res.end();
            }
        })
    });
})

module.exports = router

