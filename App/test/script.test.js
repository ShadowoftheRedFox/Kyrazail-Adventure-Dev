const load = new Promise((resolve, reject) => {
    const fs = require("fs"),
        path = require("path");

    const pathToSaveFolder = path.join(path.dirname(__dirname), "/save");
    const loadResponse = {
        error: null,
        files: []
    };

    fs.readdir(pathToSaveFolder, (err, files) => {
        if (err) {
            loadResponse.error = ["ERROR", err];
            return reject(loadResponse);
        }

        // check if there is files in here
        if (files.length > 0) {
            files.forEach(file => {
                const pathToFile = path.join(pathToSaveFolder, file);
                const fileData = {
                    name: file,
                    path: pathToFile,
                    rawContent: null,
                    content: null,
                    error: null
                };
                fs.stat(pathToFile, (err, stats) => {
                    if (err) return;
                    console.log(stats);
                });
                loadResponse.files.push(fileData);
            });
            return resolve(loadResponse);
        } else {
            // if not, reject
            loadResponse.error = ["EMPTY", "No save files in the directory."];
            return reject(loadResponse);
        }
    });
});

load.then(r => {
    console.log("\nResponse RESOLVE");
    console.log(r);
}).catch(e => {
    console.log("\nResponse ERROR");
    console.error(e);
});