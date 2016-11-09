var http = require('http');
var path = require('path');
//引入我们自己编写的server模块
var server = require('./server.js');
http.createServer(function (request, response) {
    //以下的判断用来做简单的路由    
    if (request.url == "/") {
        filePath = path.join(__dirname, 'view/index.html');
    } else {
        filePath = path.join(__dirname,  request.url);
    }
    server.serveStatic(response, filePath);
}).listen(9092, function () { 
    console.log("Server listening on port 9092");
});