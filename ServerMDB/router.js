var exports = module.exports = {};
const fs = require('fs');
const path = require('path');
const database = require('./database');

const staticBasePath = '../ClientMDB/dist';


exports.handleRequest = function (request, response) {
    const { headers, method, url } = request;

    console.log('Request from: ',headers.referer);
    console.log('Request at: ', url);

    if (url == '/authentication'){
        if (method === 'GET'){
            database.findOne(headers.encodedKey, (user) => {
                console.log(user);
                if (user == 'undefined'){
                    if (headers.referer == 'http://localhost:8080/registration'){
                        response.writeHead(301,
                            { Location: '/login'}
                        );
                        response.end();
                    }
                    else response.end();
                }
                else {
                    if (headers.referer != 'http://localhost:8080/registration') {
                        response.writeHead(301,
                            { Location: '/registration' }
                        );
                        response.end();
                    }
                    else response.end();
                }
            })
        }
        else {
            response.writeHead(404);
            response.write('Contents you are looking are Not Found');
            response.end();
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
            if (method === 'GET'){
                switch (url) {
                    case "/":
                        // fs.readFile('../ClientMDB/dist/login.html', function (error, pageRes) {
                        //     if (error) {
                        //         response.writeHead(404);
                        //         response.write('Contents you are looking are Not Found');
                        //     }
                        //     else {
                        //         response.writeHead(200, { 'Content-Type': 'text/html' });
                        //         response.write(pageRes);
                        //     }
                        //     response.end();
                        // });
                        response.writeHead(301,
                            { Location: '/login' }
                        );
                        response.end();
                        break;
                    default:
                        var resolvedBase = path.resolve(staticBasePath);
                        var safeSuffix = path.normalize(url).replace(/^(\.\.[\/\\])+/, '');
                        var fileLoc = path.join(resolvedBase, safeSuffix);
                        if (fileLoc.indexOf('.') === -1) fileLoc += '.html';
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

return module.exports;
