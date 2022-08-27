const fs = require("fs"),
    path = require("path");
const savePath = path.resolve(path.resolve(), "save");

function readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function (err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        filenames.forEach(function (filename, idx, array) {
            fs.readFile(dirname + "/" + filename, 'utf-8', function (err, content) {
                if (err) {
                    onError(err);
                    return;
                }
                onFileContent(filename, content, idx, array.length);
            });
        });
    });
}

readFiles(savePath, content, (e) => console.error(e));

const files = [];
function content(name, content, i, l) {
    files.push({ name: name, content: content });
    if (i == l - 1) console.log(files);
}