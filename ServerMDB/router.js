var exports = module.exports = {};
const fs = require('fs');
const path = require('path');
const database = require('./database');
const security = require('./security');

const staticBasePath = '../ClientMDB/dist';

exports.handleRequest = function (request, response) {
    var { headers, method, url } = request;
    
    console.log('Request at: ', url);
    
    let userInfo = headers['auth-key'];

    if (!userInfo || userInfo == 'undefined') 
    {
        userInfo = security.encrypt(JSON.stringify({username: '', password: ''}));
    }
    
    let checkAuth = false;
    
    userInfo = security.decrypt(userInfo);

    database.findOne('accounts',JSON.parse(userInfo), (found) => {
        checkAuth = found;

        {
            if (url === '/redirect') {
                let reqUrl = headers.referer;
                reqUrl = reqUrl.slice(reqUrl.lastIndexOf('/'));
                console.log('Redirect from: ' + reqUrl);
                if (checkAuth) {
                    if (reqUrl != '/registration') {
                        response.writeHead(403);
                        response.end();
                    }
                    else {
                        response.end();
                    }
                }
                else {
                    if (reqUrl === '/registration') {
                        response.writeHead(403);

                        response.end();
                    }
                    else {
                        response.end();
                    }
                }
            }
            else {
                if (url.substr(0, 4) === "/api") {
                    var api_url = url.slice(5);
                    switch (method) {
                        case 'GET':
                            switch (api_url) {
                                case 'ListUserInfo':
                                    response.writeHead(200, { 'Content-Type': 'text/html' });
                                    database.queryAll('peopleList',function (data) {
                                        response.write(data);
                                        response.end();
                                    });
                                    break;
                                case 'login':
                                    let username = headers.username;
                                    let password = headers.password;
                                    let userinfo = { username: username, password: password };
                                    database.findOne('accounts', userinfo, (found) => {
                                        let checkLogin = found;
                                        if (checkLogin) {
                                            response.writeHead(200);
                                            response.write(security.encrypt(JSON.stringify(userinfo)), () => { response.end(); })
                                        }
                                        else {
                                            response.writeHead(401);
                                            response.end();
                                        }
                                    });
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
                                        database.insert('peopleList', json);
                                        response.end();
                                    });
                                    break;
                                    response.end();
                                case 'signup':
                                    var body = '';
                                    var json = {};
                                    request.on('data', (chunk) => {
                                        body += chunk;
                                    })
                                    request.on('end', function() {
                                        json = JSON.parse(body);
                                        let userAccount = JSON.parse(body);
                                        delete userAccount.password;
                                        console.log(userAccount);
                                        database.findOne('accounts',userAccount, function(found){
                                            console.log(userAccount);
                                            if (found) {
                                                response.writeHead(400);
                                            }
                                            else {
                                                database.insert('accounts',json);
                                                database.queryAll('accounts', () => {});
                                            }
                                            response.end();
                                        })
                                    });
                                    break;
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
                                response.writeHead(301, { Location: '/login' });
                                response.end();
                                break;
                            default:
                                if (url.indexOf('.') === -1) url += '.html';
                                var resolvedBase = path.resolve(staticBasePath);
                                var safeSuffix = path.normalize(url).replace(/^(\.\.[\/\\])+/, '');
                                var fileLoc = path.join(resolvedBase, safeSuffix);
                                fs.readFile(fileLoc, function (error, pageRes) {
                                    if (error) {
                                        response.writeHead(404);
                                        response.write('Contents you are looking are Not Found');
                                    }
                                    else {
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

        // response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
        // response.setHeader('Access-Control-Allow-Credentials', 'true');
        // response.setHeader('Access-Control-Allow-Headers', 'authKey');

    });



}

return module.exports;
