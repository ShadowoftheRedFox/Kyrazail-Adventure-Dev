/// <reference path="../../ts/type.d.ts"/>
function GameSaveManager() {
    throw new Error("This is a static class.");
}

GameSaveManager.save = function (fileName) {
    console.log("Saving...");
    //TODO do a save method
    const scope = window.game,
        saveObject = {
            "content": GameGlobalObject.export(scope),
            "crypted": true,
            "version": scope.constants.package.version
        };

    const crypted = GameEncryptData(saveObject);

    if (scope.constants.isNwjs) {
        // save localy and online if server is set up
        const fs = require("fs"),
            path = require("path");

        fs.writeFileSync(`./save/${fileName}.kyraadv`, crypted, (err) => {
            if (err) return console.error(err);
            console.log(`saved ${fileName}`);
        });
    } else {
        // save in object that can be exported
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(crypted));
        element.setAttribute('download', `${fileName}.kyraadv`);
        element.click();
    }
};

GameSaveManager.load = function () {
    return new Promise((resolve, reject) => {
        if (window.game.constants.isNwjs) {
            const fs = require("fs"),
                path = require("path");

            const pathToSaveFolder = path.join(path.resolve(), "/save");
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
                            error: null,
                            lastEditDate: null
                        };
                        fs.stat(pathToFile, (err, stats) => {
                            if (err) return;
                            //to keep it in ms, we don't care about nano seonds precision
                            fileData.lastEditDate = Math.floor(stats.mtimeMs);
                        });
                        fs.readFile(pathToFile, { encoding: "utf-8" }, (err, content) => {
                            if (err) {
                                fileData.error = ["ERROR", err];
                                return;
                            }
                            fileData.rawContent = content;
                            // now we look if the file is crypted or not
                            try {
                                let object = JSON.parse(content);
                                if (object) fileData.content = object;
                            } catch (er) {
                                // the file is crypted, or just corrupted, so try to decrypt it and then re try to parse
                                let decryptedContent = GameDecrytpData(content);
                                // try to parse again
                                try {
                                    let object = JSON.parse(decryptedContent);
                                    if (object) fileData.content = object;
                                } catch (e) {
                                    fileData.error = ["ERROR", e];
                                    return;
                                }
                            }
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
        } else {
            reject(["EMPTY", "This is only available on the app!"]);
        }
    });
};