const exec = require('child_process').exec;
const querystring = require('querystring');
const fs = require('fs')
const formidable = require('formidable');

function start(response) {
    // console.log('response start searver')
    // exec("find /", function(error, stdout, stderr) {
    //     if (error) {
    //         console.log(error);
    //         response.writeHead(404, { "Content-Type": "text/plain" });
    //         response.write('404 NOT FOUND');
    //         response.end();
    //     } else {
    //         response.writeHead(200, { "Content-Type": "text/plain" });
    //         response.write(stdout);
    //         response.end();
    //     }

    // });
    console.log("Request handler 'start' was called.");

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset="UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" method="post" enctype="multipart/form-data">' +
        // '<textarea name="text" rows="20" cols="60"></textarea>' +
        '<input type="file" name="upload" />' +
        '<input type="submit" value="Submit text" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(body);
    response.end();
}

function upload(response, request) {
    let form = new formidable.IncomingForm();
    form.parse(request, function(err, fields, files) {
        console.log(files.upload.path)
        fs.renameSync(files.upload.name, './tmp/test.png');
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write('received image:<br>');
        response.write("<img src='/show'>")
        response.end();
    })
}

function show(response) {
    fs.readFile('./tmp/test.png', 'binary', function(err, file) {
        if (err) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.write(err + '\n');
            response.end();
        } else {
            response.writeHead(200, { "Content-Type": "image/png" });
            response.write(file, "binary");
            response.end();
        }
    })
}
exports.start = start;
exports.upload = upload;
exports.show = show;