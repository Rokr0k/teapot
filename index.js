const http = require("http");
const url = require("url");
const fs = require("fs");

const ROOT = "html";

http.createServer((request, response) => {
    const URL_OBJ = url.parse(request.url, true, false);
    let path = URL_OBJ.pathname;
    if(path === "/") {
        path = "/index.html";
    }
    if(path === '/teapot') {
        response.writeHead(418);
        response.end();
        return;
    }
    fs.readFile(ROOT + path, (err, data) => {
        if(err) {
            response.writeHead(404);
            response.end(JSON.stringify(err));
            return;
        }
        response.writeHead(200);
        response.end(data);
    });
}).listen(8080);