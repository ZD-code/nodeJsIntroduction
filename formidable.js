let formidable = require('formidable'),
    http = require('http'),
    util = require('util');

http.createServer((request, response) => {
    if (request.url === '/upload' && request.method.toLowerCase() === 'post') {
        let form = new formidable.IncomingForm();
        form.parse(request, function(error, fields, files) {
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.write('recevied upload \n\n');
            response.end(util.inspect({ fields: fields, files: files }));
        });
        return;
    }

    response.writeHead(200, { "Content-Type": "text/html" });
    response.write('<form action="/upload" enctype="multipart/form-data" ' +
        'method="post">' +
        '<input type="text" name="title"><br>' +
        '<input type="file" name="upload" multiple="multiple"><br>' +
        '<input type="submit" value="Upload">' +
        '</form>');
    response.end();
}).listen(3332);