
function GameSaveManager() {
    throw new Error("This is a static class.");
}

GameSaveManager.lastAutoSave = 2;
GameSaveManager.autoSave = function () {
    if (window.game.constants.isNwjs) {
        console.warn("Auto Saving...");
        //TODO do a save method
        const scope = window.game,
            saveObject = {
                "content": GameGlobalObject.export(scope),
                "crypted": true,
                "version": scope.constants.package.version
            };

        const crypted = GameEncryptData(saveObject);

        // save localy and online if server is set up
        const fs = require("fs");

        fs.writeFile(`./save/autosave${GameSaveManager.lastAutoSave}.kyraadv`, crypted, (err) => {
            if (err) return console.error(err);
            console.log(`saved autosave${GameSaveManager.lastAutoSave}`);
            GameSaveManager.lastAutoSave = (GameSaveManager.lastAutoSave == 1 ? 2 : 1);
        });
    }
};

GameSaveManager.getSaveNumber = function () {
    return new Promise((resolve, reject) => {
        if (!window.game.constants.isNwjs) resolve(0);
        const fs = require("fs"),
            path = require("path");

        const pathToSaveFolder = path.join(path.resolve(), "/save");
        let res = 0;
        fs.readdir(pathToSaveFolder, (err, files) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            console.log("files found, couting", files);
            files.forEach((fileName, id) => {
                //to exclude auto save from the count, since there should be 2 auto saves
                console.log(fileName);
                if (!fileName.includes("auto")) {
                    // save names have a pattern of: saveNUMBER.kyraadv
                    // so split to only get the first part
                    fileName = fileName.split(".")[0];
                    console.log(fileName);
                    //now, get rid of the "save" part
                    fileName = fileName.split("save")[1];
                    console.log(fileName);
                    if (!isNaN(parseInt(fileName)) && parseInt(fileName) > res) res = parseInt(fileName);
                }
                // this is the last file, return the result
                if (id + 1 == files.length) resolve(res);
            });
        });
    });
};

GameSaveManager.save = function (fileName = "autosave1") {
    // using warn to know where the save is launched from. So we can see if there is an unwanted
    console.warn("Saving...");
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
            path = require("path"),
            saveNumber = this.getSaveNumber();

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
            const res = {
                error: null,
                files: []
            };

            fs.readdir(pathToSaveFolder, (err, files) => {
                if (err) {
                    res.error = ["ERROR", err];
                    return reject(res);
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
                        res.files.push(fileData);
                    });
                    return resolve(res);
                } else {
                    // if not, reject
                    res.error = ["EMPTY", "No save files in the directory."];
                    return reject(res);
                }
            });
        } else {
            reject(["EMPTY", "This is only available on the app!"]);
        }
    });
};