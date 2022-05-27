import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";
/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object to specify different radius for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
export function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === 'undefined') {
        stroke = true;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    if (width == 0 || height == 0) return;
    while ((Math.abs(width) / 2) < radius || (Math.abs(height) / 2) < radius) {
        radius = Math.floor(radius / 2);
    }
    if (typeof radius === 'number') {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
        var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }

    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }
}

/**
 * Draw an underlign under a given text and position
 * @param {CanvasRenderingContext2D} context 
 * @param {string} text 
 * @param {number} x 
 * @param {number} y 
 * @param {string | CanvasGradient | CanvasPattern} color 
 * @param {string} textSize 
 * @param {CanvasTextAlign} align 
 */
export function underline(context, text, x, y, color, textSize, align) {

    var textWidth = context.measureText(text).width;
    var startX = 0;
    var startY = y + (parseInt(textSize) / 15);
    var endX = 0;
    var endY = startY;
    var underlineHeight = parseInt(textSize) / 15;

    if (underlineHeight < 1) {
        underlineHeight = 1;
    }

    context.beginPath();
    if (align == "center") {
        startX = x - (textWidth / 2);
        endX = x + (textWidth / 2);
    } else if (align == "right") {
        startX = x - textWidth;
        endX = x;
    } else {
        startX = x;
        endX = x + textWidth;
    }

    //save paramters to set like before underline
    const preColor = context.strokeStyle,
        preLineWidth = context.lineWidth;

    context.strokeStyle = color;
    context.lineWidth = underlineHeight;
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
    //set parameters like before
    context.strokeStyle = preColor;
    context.lineWidth = preLineWidth;
}

//--------------------------------------------------------------------------------------------------------------
// Update manager
// The static class that manages the auto updates of the game.

export function UpdateManager() {
    throw new Error("UpdateManager is a static class.");
}

UpdateManager.test = false;

UpdateManager.progress = {
    initialised: false,
    createConnexion: false,
    retrievingPath: false,
    fileFound: 0,
    fileChecked: 0,
    retrievingContentAndWriting: false,
    cleaningUp: false,
    localFileFound: 0,
    localFileChecked: 0,
    finished: false,
    errorFound: false,
    error: ""
};

UpdateManager.constants = {
    owner: "ShadowoftheRedFox",
    repo: "Kyrazail-Adventure",
    content: {},
    tooBigToRead: {},
    pathMain: "",
    platform: ""
};

/**
 * Initalisation of paramters, such as path and platform
 */
UpdateManager.init = function() {
    if (typeof require === "function" && typeof process === 'object') {
        UpdateManager.constants.platform = process.platform;
        if (UpdateManager.constants.platform === "win32") {
            let base = __dirname.split("\\");
            base.splice(base.length - 3, 3); //remove the last 3 elements
            UpdateManager.constants.pathMain = base.join("\\") + "\\";
        } else if (UpdateManager.constants.platform === "linux") {
            let base = __dirname.split("/"); //remove the last 3 elements
            base.splice(base.length - 3, 3);
            UpdateManager.constants.pathMain = base.join("/") + "/";
        }
        UpdateManager.progress.initialised = true;
    } else {
        if (UpdateManager.test === true) {
            UpdateManager.progress.errorFound = false;
        } else {
            UpdateManager.progress.errorFound = true;
            UpdateManager.progress.error = "Cant update without NodeJS! Open the app to update!";
        }
    }
};

/**
 * Get the file/folder content online
 * @param {string} path local path of the wanted file
 * @returns {contentResponseSolo} or ContentResponeMult
 */
UpdateManager.getContent = async function(path) {
    const octokit = new Octokit();
    let r = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: UpdateManager.constants.owner,
        repo: UpdateManager.constants.repo,
        path: path
    });
    return r;
};

/**
 * Update the game.
 */
UpdateManager.updateGame = async function() {
    const dirAwaitLookUp = [];
    const pathLookUp = [];

    //get the www folder first, because linux and windows have !== files and we check win32 repo
    const mainFolder = await UpdateManager.getContent("www");

    UpdateManager.createConnexion = true;

    mainFolder.data.forEach(file => {
        if (file.type === "file") {
            pathLookUp.push(file.path);
            UpdateManager.progress.fileFound++;
        } else if (file.type === "dir") {
            dirAwaitLookUp.push(file.path);
        }
    });

    if (dirAwaitLookUp.length > 0) {
        await readRecur();
    }

    async function readRecur() {
        const dir = dirAwaitLookUp[0]; //? because we don't want duplicate, we will watch each dir one by one, and not with a foreach
        const dirRes = await UpdateManager.getContent(dir);

        //if directory contain only one file, it's not an array. Prevent that:
        if (isNaN(dirRes.data.length) === false) {
            dirRes.data.forEach(file => {
                if (file.type === "file") {
                    pathLookUp.push(file.path);
                    UpdateManager.progress.fileFound++;
                } else if (file.type === "dir") {
                    dirAwaitLookUp.push(file.path);
                } else {
                    console.warn(`File ${file.name} is not a known type:\n${file}`);
                }
            });
        } else {
            pathLookUp.push(dirRes.path);
            UpdateManager.progress.fileFound++;
        }

        //since we looked up the first dir, shift the object
        dirAwaitLookUp.shift();

        if (dirAwaitLookUp.length > 0) {
            readRecur();
        } else {
            UpdateManager.readOnlineFileContent(pathLookUp);
            UpdateManager.progress.retrievingPath = true;
        }
    }
};

/**
 * Look the content of all given path.
 * @param {string[]} path path to each files we will loook up 
 */
UpdateManager.readOnlineFileContent = function(paths) {
    //read each file
    paths.forEach(async path => {
        if (UpdateManager.checkLocalFileExistance(UpdateManager.convertPath(UpdateManager.constants.pathMain + path)) === false) {
            //file does not exist, create it
            const data = await UpdateManager.getContent(path);
            if (data.data.content === "" && data.data.encoding === "none") {
                console.log(`${path} is too big to get read. Downloading it.`);
                UpdateManager.downloadFile(data.data.download_url, UpdateManager.convertPath(UpdateManager.constants.pathMain + path), (e) => {
                    if (e) {
                        console.warn(`${path} has failed to download`);
                        console.error(e);
                    } else {
                        console.log(`${path} downloaded successfully`);
                    }
                });
            } else {
                //decode a string in base 64
                const decode = window.atob(data.data.content);
                let cpath = UpdateManager.convertPath(UpdateManager.constants.pathMain + path);
                UpdateManager.newFile(data.data.name, cpath, decode);
            }
        } else {
            //file exists, read content and compare
            let a = path.split(".");
            let ext = a[a.length - 1];

            //files we want to exclude from check, just want to know if they are here on local
            if (ext !== "png" && ext !== "dll" && ext !== "exe" && ext !== "dat" && ext !== "bin" && ext !== "pak" && ext !== "info" && ext !== "so" && ext !== "png" && ext !== "ico" && ext !== "ogg" && ext !== "mp3" && ext !== "ttf") {
                const data = await UpdateManager.getContent(path);
                if (data.data.content === "" && data.data.encoding === "none") {
                    console.log(`${path} is too big to get read. Checking size...`);

                    const localSize = UpdateManager.getFileSize(UpdateManager.constants.pathMain + path);
                    if (localSize !== data.data.size) {
                        UpdateManager.downloadFile(data.data.download_url, UpdateManager.convertPath(UpdateManager.constants.pathMain + path), (e) => {
                            if (e) {
                                console.warn(`${path} has failed to download`);
                                console.error(e);
                            } else {
                                console.log(`${path} downloaded successfully`);
                            }
                        });
                    }
                } else {
                    //decode a string in base 64
                    const decode = window.atob(data.data.content);
                    const local = UpdateManager.readLocalFileContent(UpdateManager.convertPath(UpdateManager.constants.pathMain + path));
                    if (local !== decode) {
                        //files are different, edit local file
                        UpdateManager.editLocalFile(UpdateManager.convertPath(UpdateManager.constants.pathMain + path), decode);
                    }
                }
            } else {
                console.log(`${path} exists and is an excluded file check.`);
            }
        }
        UpdateManager.progress.fileChecked++;
    });
    UpdateManager.progress.retrievingContentAndWriting = true;

    //then delete file that are not in the paths array
    UpdateManager.removeLocalFileNotIncluded(paths);
};

/**
 * Look the content of the given local file path
 * @param {string} path Path of the gile.
 * @returns {string} Content of the file. 
 */
UpdateManager.readLocalFileContent = function(path) {
    if (typeof require === "function" && typeof process === 'object') {
        const fs = require("fs");
        fs.readFile(path, "utf-8", (err, file) => {
            if (err) {
                console.log(err);
                return "";
            } else {
                return file;
            }
        });
    }
};

/**
 * Check if the given local file path exist. Return true if yes, false if no. 
 * @param {string} path Path to the file.
 * @returns {boolean}
 */
UpdateManager.checkLocalFileExistance = function(path) {
    if (typeof require === "function" && typeof process === 'object') {
        const fs = require("fs");
        //fs.access is faster than fs.existsSync
        fs.access(path, fs.F_OK, (err) => {
            if (err) {
                console.error(err);
                return false;
            }
            //file exists
            return true;
        });
    }
};

/**
 * Create a new file at the given path and with the given content.
 * @async Asynchroneous because in the case we need to download content, it can take times.
 * @param {string} path The path of the file.
 * @param {string} name The name of the file
 * @param {string} content The github API response content decoded.
 */
UpdateManager.newFile = async function(path, name, content) {
    if (typeof require === "function" && typeof process === 'object') {
        const fs = require("fs");
        fs.access(path, fs.F_OK, (err) => {
            if (err) {
                const fs = require('fs');
                //TODO test with app
                fs.mkdir(path, { recursive: true }, (er) => {
                    if (er) throw er;
                    console.log('Directory created successfully!');
                });
            } else {
                console.log("Directory already exists");
            }
            //check in case the last / is not here
            if (path[path.length - 1] !== "/") path += "/";

            fs.writeFile(path + name, content, 'utf8', (err) => {
                if (err) throw err;
            });
        });
    }
};

/**
 * Return the size in byte of the given file.
 * @param {string} path The path of the file 
 * @returns {number | 0} Size in byte of the file. 0 if file not found
 */
UpdateManager.getFileSize = function(path) {
    if (typeof require === "function" && typeof process === 'object') {
        const fs = require("fs"); //Load the filesystem module
        try {
            return fs.statSync(path).size;
        } catch (e) {
            console.log(e);
            return 0;
        }
    }
};

/**
 * Edit the content of a local file.
 * @param {string} path path to the file
 * @param {string} content content to write
 */
UpdateManager.editLocalFile = function(path, content) {
    if (typeof require === "function" && typeof process === 'object') {
        const fs = require("fs"); //Load the filesystem module
        fs.writeFile(path, content, (err) => {
            // throws an error, you could also catch it here
            if (err) {
                console.warn(`Could not edit ${path}`);
                console.error(err);
            } else {
                console.log(`${path} edited successfully.`);
            }
        });
    }
};

/**
 * 
 * @param {URL} url The url where the file is located and will be downloaded.
 * @param {string} dest The destination path where the file will be saved once downloaded
 * @param {(err?: Error | null) => void} [call] Callback function
 */
UpdateManager.downloadFile = function(url, dest, call) {
    if (typeof require === "function" && typeof process === 'object') {
        const fs = require('fs');
        const file = fs.createWriteStream(dest);
        if (url.split(":")[0] === "http") {
            const http = require('http');
            const request = http.get(url, function(response) {
                response.pipe(file);
                file.on('finish', function() {
                    file.close(call); // close() is async, call cb after close completes.
                });
            }).on('error', function(err) { // Handle errors
                fs.unlink(dest); // Delete the file async. (But we don't check the result)
                if (call) call(err.message);
            });
        } else if (url.split(":")[0] === "https") {
            const https = require("https");
            const request = https.get(url, function(response) {
                response.pipe(file);
                file.on('finish', function() {
                    file.close(call); // close() is async, call cb after close completes.
                });
            }).on('error', function(err) { // Handle errors
                fs.unlink(dest); // Delete the file async. (But we don't check the result)
                if (call) call(err.message);
            });
        } else {
            const e = new Error("url protocol is not supported");
            call(e);
        }
    }
};

/**
 * Convert a path string into the correct platform form and without the file path at the end
 * @param {string} path path to convert
 * @returns {string} path converted
 */
UpdateManager.convertPath = function(path) {
    //if we do not check and there is not NodeJS, platform is ""
    if (typeof require === "function" && typeof process === 'object') {
        let cpath = path;
        if (UpdateManager.constants.platform === "win32") {
            cpath = cpath.split("\\"); //for windows
            cpath.pop();
            cpath.join("\\");
        } else {
            cpath = cpath.split("/"); //for linux
            cpath.pop();
            cpath.join("/");
        }
        return path;
    }
};

/**
 * Remove local files that were not included in files online, that means we need to delete them.
 * @param {string[]} paths 
 */
UpdateManager.removeLocalFileNotIncluded = function(paths) {
    if (typeof require === "function" && typeof process === 'object') {
        const fs = require("fs");
        var path = require('path');
        const ignoredFolderName = [".git", "test", "KyraLog"];
        const ignoredFileExtension = ["sh", "bat", "", "idx", ".gitignore"];
        let fileFound = [];

        var walk = function(dir, done) {
            var results = [];
            var ignored = [];
            fs.readdir(dir, function(err, list) {
                if (err) return done(err);
                var pending = list.length;
                if (!pending) return done(null, results, ignored);
                list.forEach(function(file) {
                    file = path.resolve(dir, file);
                    fs.stat(file, function(err, stat) {
                        if (stat && stat.isDirectory()) {
                            let l = file.split("/");
                            if (ignoredFolderName.indexOf(l[l.length - 1]) > -1) {
                                ignored.push(file);
                                if (!--pending) done(null, results, ignored);
                            } else {
                                walk(file, function(err, res) {
                                    results = results.concat(res);
                                    if (!--pending) done(null, results, ignored);
                                });
                            }
                        } else {
                            let l = file.split("/");
                            if (ignoredFileExtension.indexOf(l[l.length - 1]) > -1 || file.includes("test")) {
                                ignored.push(file);
                                if (!--pending) done(null, results, ignored);
                            } else {
                                results.push(file);
                                if (!--pending) done(null, results, ignored);
                            }
                        }
                    });
                });
            });
        };

        walk(UpdateManager.constants.pathMain + "www/", function(err, results, ignored) {
            if (err) throw err;
            let index = 0; //faster than using indexOf at each iteration
            results.forEach(r => {
                let toBeRemove = UpdateManager.constants.pathMain;
                r = r.replace(toBeRemove, '');
                results[index] = r;
                index++;
            });
            fileFound = results;
        });

        UpdateManager.progress.localFileFound = fileFound.length;

        //now that we have all local file and all online file, check if they are not duplicates
        fileFound.forEach(file => {
            if (paths.indexOf(file) === -1) {
                const localPath = fileFound[fileFound.indexOf(file)];
                //try to delete it
                try {
                    fs.unlink(UpdateManager.constants.pathMain + localPath);
                    //file removed
                } catch (err) {
                    console.error(err);
                }
                //then try to remove the directory
                const dirPath = UpdateManager.convertPath(localPath);
                fs.rmdir(dirPath, (err) => {
                    if (!err) console.log(`Removed empty folder ${dirPath}`);
                });
            }
            UpdateManager.progress.localFileChecked++;
        });

        UpdateManager.progress.cleaningUp = true;
        UpdateManager.finish();
    }
};

/**
 * Is called when the game has finished updated
 */
UpdateManager.finish = function() {
    if (typeof require === "function" && typeof process === 'object') {
        const fs = require("fs");
        const updateJSON = require("../../src/resources/data/Update.json");

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //januar = 0
        let yyyy = today.getFullYear();
        updateJSON.lastCheck = dd + '/' + mm + '/' + yyyy;
        updateJSON.updateFound = false;
        fs.writeFileSync(`../../src/resources/data/Update.json`, JSON.stringify(updateJSON), function(err) {
            if (err) throw err;
        });

        //finish update
        UpdateManager.progress.finished = true;
    }
};