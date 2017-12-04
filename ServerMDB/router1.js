const express = require('express')
const path = require('path')
const security = require('./security')
const app = express()
const staticPath = '../ClientMDB/dist';


app.use('/', (req, res, next) => {
  let url = req.url;
  let pos = url.indexOf('.')
  let pos2 = url.indexOf('api')
  if (pos == -1 && pos2 == -1) {
    console.log(path.join(__dirname, staticPath, url) + '.html')
    res.sendFile(path.join(__dirname, staticPath, url) + '.html')
  }
  next();
})


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, staticPath, '/login.html'))
})

app.get('/api/redirect', (req, res) => {
  let userInfo = headers['auth-key'];
  if (!userInfo || userInfo == 'undefined') 
  {
    userInfo = security.encrypt(JSON.stringify({username: '', password: ''}));
  }
  let checkAuth = false;
  
  userInfo = security.decrypt(userInfo);
  
  database.findOne('accounts',JSON.parse(userInfo), (found) => {
    checkAuth = found;
    let reqUrl = req.headers.referer;
    console.log(reqUrl);
    reqUrl = reqUrl.slice(reqUrl.lastIndexOf('/'));
    console.log('Redirect from: ' + reqUrl);
    if (checkAuth) {
      if (reqUrl != '/registration') {
        res.sendStatus(403);
      }
      else {
        res.end();
      }
    }
    else {
      if (reqUrl === '/registration') {
        res.sendStatus(403);
      }
      else {
        res.end();
      }
    }
  })
})

app.use('/', express.static(path.join(__dirname, staticPath)))

app.listen(8080, () => console.log('Server is starting'))