var exports = module.exports = {};
const fs = require('fs');
const path = require('path');
const database = require('./database');

const staticBasePath = '../ClientMDB/dist';
const secret = 'a;lskdjflsajdi387823940184lksajdf;lkjsd'


exports.handleRequest = function (request, response) {
    const { headers, method, url } = request;
    let userInfo = headers.authKey;
    let checkAuth = false;
    userInfo = jwt.decode(userInfo, secret);
    if (database.find(userInfo)) {
      checkAuth = true;
    }
    console.log('Request at: ', url);
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
                if (checkAuth) {
                  response.writeHead(301, {Location: '/registration'});
                  response.end();
                }
                else {
                  response.writeHead(301, {Location: '/login'});
                  response.end();
                }
                break;
              default:
                if (url.indexOf('.') === -1) url += '.html';
                var resolvedBase = path.resolve(staticBasePath);
                var safeSuffix = path.normalize(url).replace(/^(\.\.[\/\\])+/, '');
                var fileLoc = path.join(resolvedBase, safeSuffix);
                if (checkAuth) {
                  if (url == '/login.html' || url == '/signup.html') {
                    response.writeHead(301, {Location: '/registration'});
                    response.end();
                    break;
                  }
                } else {
                  if (url == '/registration.html'){
                    response.writeHead(301, {Location: '/login'});
                    response.end();
                    break;
                  }
                }
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

return module.exports;
