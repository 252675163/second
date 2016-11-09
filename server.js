var fs = require('fs');
//provide the ability to derive a mime type based on the filename extension
var mime = require('mime');

var cache = {};

//�ⲻ��IIS��Apache����404�����Զ���һ�£�
function send404(response) {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("<h1>ERROR 404 FILE NOT FOUND</h1>");
    response.end();
}

//��ͻ��˷����ļ�
function sendFile(response, filePath, fileContents) {
    response.writeHead(200, { "Content-Type": mime.lookup(filePath) });
    response.end(fileContents);
}

//�����������������ģ��ʹ��
function serveStatic(response, absPath) {
    if (cache[absPath]) {
        sendFile(response, absPath, cache[absPath]);
    } else {
        fs.exists(absPath, function (exists) {
            if (exists) {
                fs.readFile(absPath, function (err, data) {
                    if (err) {
                        send404(response);
                    } else {
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                });
            }
            else {
                send404(response);
            }
        });
    }
}

exports.serveStatic = serveStatic;