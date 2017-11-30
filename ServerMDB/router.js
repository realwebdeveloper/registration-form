var exports = module.exports = {};
const fs = require('fs');
const path = require('path');
const database = require('./database');
const security = require('./security');

const staticBasePath = '../ClientMDB/dist';

exports.handleRequest = function (request, response) {
    var { headers, method, url } = request;
    let userInfo = headers.authKey;
    if (!userInfo) userInfo = security.encrypt('');
    console.log(userInfo);
    let checkAuth = false;
    userInfo = security.decrypt(userInfo);
    if (true || database.findOne(JSON.parse(userInfo)), (found) => {
        checkAuth = found;
    })
    var origin = request.headers.origin;
    console.log(origin);
    response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.setHeader('Access-Control-Allow-Headers', 'authKey');
    {
        if (url === '/redirect') {
            let reqUrl = headers.referer;
            if (checkAuth) {
                if (reqUrl != '/registration') {
                    response.writeHead(301, { Location: '/registration' });
                    response.end();
                }
                else {
                    response.end();
                }
            }
            else {
                if (reqUrl === '/registration') {
                    response.writeHead(301, { 
                      Location: '/login',
                    });

                    response.end();
                }
                else {
                    response.end();
                }
            }
        }
        else 
        {
            if (url.substr(0, 4) === "/api") {
                var api_url = url.slice(5);
                switch (method) {
                    case 'GET':
                        switch (api_url) {
                            case 'ListUserInfo':
                                response.writeHead(200, { 'Content-Type': 'text/html' });
                                database.queryAll(function (data) {
                                    response.write(data);
                                    response.end();
                                });
                                break;
                            case 'login':
                                let username = headers.username;
                                let password = headers.password;
                                let userinfo = {username: username, password: password};
                                database.findOne(userinfo, (found) => {
                                  let checkLogin = found;
                                  if (checkLogin) {
                                    response.writeHead(200);
                                    response.write(security.encrypt(JSON.stringify(userinfo)))
                                  }
                                  else {
                                    response.writeHead(401);
                                  }
                                });
                                response.end();
                                break;
                            default:
                                response.writeHead(404);
                                response.write('Contents you are looking are Not Found');
                                response.end();
                                break;
                        }
                        break;
                    case 'POST':
                        switch (api_url) {
                            case 'uploadUserInfo':
                                var body = '';
                                var json = {};
                                request.on('data', (chunk) => {
                                    body += chunk;
                                });
                                request.on('end', function () {
                                    json = JSON.parse(body);
                                    database.insert(json);
                                });
                                break;
                            case 'signup':
                                var body = '';
                                var json = {};
                                request.on('data',(chunk) => {
                                  body += chunk;
                                })
                                let userAccount = JSON.parse(body);
                                delete userAccount.password;
                                database.findOne(userAccount, (found) => {
                                  if (found) {
                                    response.writeHead(400);
                                  }
                                  else {
                                    response.writeHead(200);
                                    request.on('end', function () {
                                      json = JSON.parse(body);
                                      database.insert(json);
                                  });
                                  }
                                });
                                response.end();
                            default:
                                response.writeHead(404);
                                response.write('Contents you are looking are Not Found');
                                response.end();
                                break;
                        }
                        break;
                    default:
                        response.writeHead(404);
                        response.write('Contents you are looking are Not Found');
                        response.end();
                        break;
                }
            }
            else {
                if (method === 'GET') {
                    switch (url) {
                        case "/":
                            // if (checkAuth) {
                            //   response.writeHead(301, {Location: '/registration'});
                            //   response.end();
                            // }
                            // else {
                            //   response.writeHead(301, {Location: '/login'});
                            //   response.end();
                            // }
                            response.writeHead(301, { Location: '/login' });
                            response.end();
                            break;
                        default:
                            if (url.indexOf('.') === -1) url += '.html';
                            var resolvedBase = path.resolve(staticBasePath);
                            var safeSuffix = path.normalize(url).replace(/^(\.\.[\/\\])+/, '');
                            var fileLoc = path.join(resolvedBase, safeSuffix);
                            // if (checkAuth) {
                            //   if (url == '/login.html' || url == '/signup.html') {
                            //     response.writeHead(301, {Location: '/registration'});
                            //     response.end();
                            //     break;
                            //   }
                            // } else {
                            //   if (url == '/registration.html'){
                            //     response.writeHead(301, {Location: '/login'});
                            //     response.end();
                            //     break;
                            //   }
                            // }
                            fs.readFile(fileLoc, function (error, pageRes) {
                                if (error) {
                                    response.writeHead(404);
                                    response.write('Contents you are looking are Not Found');
                                }
                                else {
                                    // response.writeHead(200, { 'Content-Type': 'text/javascript' });
                                    response.writeHead(200);
                                    response.write(pageRes);
                                }
                                response.end();
                            });
                            break;
                    }
                }
                else {
                    response.writeHead(404);
                    response.write('Contents you are looking are Not Found');
                    response.end();
                }
            }
        }
    }
    console.log('Request at: ', url);
}

return module.exports;
