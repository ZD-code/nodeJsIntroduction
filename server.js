const http = require('http');
const url = require('url');

function start(route, handle) {

    http.createServer((request, response) => {

        let pathName = url.parse(request.url).pathname; //获取请求路由信息    http://localhost:3333/foo   pathName=/foo

        response.writeHead(200, { "Content-Type": "text/plain" }); //响应 http状态码，http头的内容类型

        let content = route(handle, pathName); //响应主体

        response.write(content); //将响应信息发送给浏览器

        response.end(); //完成响应

    }).listen(3333); //监听的端口

    console.log('start server')
}
exports.start = start;