var http = require('http');
var path = require('path');
//���������Լ���д��serverģ��
var server = require('./server.js');
http.createServer(function (request, response) {
    //���µ��ж��������򵥵�·��    
    if (request.url == "/") {
        filePath = path.join(__dirname, 'view/index.html');
    } else {
        filePath = path.join(__dirname,  request.url);
    }
    server.serveStatic(response, filePath);
}).listen(9092, function () { 
    console.log("Server listening on port 9092");
});