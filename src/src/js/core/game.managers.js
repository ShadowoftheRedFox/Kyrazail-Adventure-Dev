// PluginManager
// The static class that manages the plugins.

function PluginManager() {
    throw new Error('This is a static class');
}

PluginManager._scripts = [];
PluginManager._errorUrls = [];
PluginManager._parameters = {};
PluginManager._count = 0;

/**
 * @param {Array<{}>} plugins 
 * @param {any} call Callback function that is called when done
 */
PluginManager.setup = function(plugins, call) {
    plugins.forEach(function(plugin) {
        if (plugin.status && this._scripts.indexOf(plugin.name) === -1) {
            this.setParameters(plugin.name, plugin.parameters);
            this.loadScript(plugin.name + '.js', plugin.path);
            this._scripts.push(plugin.name);
        }
    }, this);

    const inter = setInterval(() => {
        if (PluginManager._count === plugins.length) {
            if (call) call();
            clearInterval(inter);
        }
    }, 100);
};

PluginManager.checkErrors = function() {
    var url = this._errorUrls.shift();
    if (url) {
        throw new Error('Failed to load: ' + url);
    }
};

PluginManager.parameters = function(name) {
    return this._parameters[name.toLowerCase()] || {};
};

PluginManager.setParameters = function(name, parameters) {
    this._parameters[name.toLowerCase()] = parameters;
};

PluginManager.loadScript = function(name, path) {
    var url = path + name;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.async = false;
    script.onerror = this.onError.bind(this);
    script._url = url;
    const container = document.getElementById("mainContainer");
    container.appendChild(script);
    PluginManager._count++;
};

PluginManager.onError = function(e) {
    this._errorUrls.push(e.target._url);
};

//--------------------------------------------------------------------------------------------------------------
// SaveManager
// The static class that manages saves.

function SaveManager() {
    throw new Error('This is a static class');
}

/**
 * Used to save data.
 * @param {import("../../game").scope} scope
 * @param {string} path Where the file should be saved
 * @param {string} name the name of the file
 * @param {any} data the data that will be saved in the file, crypted
 * @return {object} info if the action succeed, or not, and some other info
 */
SaveManager.save = function(scope, path, name, data) {
    if (scope.constants.isNodejs === true) {
        //save in local save using Node.js
        const fs = require('fs');
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
        const toE = {
            info: "Do not change any of the info under, this will corrupt the file. Do not chnage the file name too.",
            saveName: name,
            gameVersion: scope.constants.config.version,
            auto: null,
            local: true,
            timeSave: null,
            timeCreated: null,
            config: scope.constants.config,
            data: tokenGeneration(data)
        };

        fs.writeFileSync(`${toE.timeCreated}.kyraSave`, toE, (err) => {
            if (err) {
                return {
                    saveName: name,
                    error: err,
                    status: 'error'
                };
            } else {
                return {
                    saveName: name,
                    error: err,
                    status: 'success'
                };
            }
        });
    } else {
        //save in local files using filesystem: https://web.dev/file-system-access/
    }
};

/**
 * Load the given file
 * @param {import("../../game").scope} scope 
 * @param {string} path Where the file should be saved
 * @param {string} name the name of the file
 */
SaveManager.load = function(scope, path, name) {
    if (scope.constants.isNodejs === true) {
        //load from local save using Node.js
        const fs = require('fs');
    } else {
        //load from local files using filesystem: https://web.dev/file-system-access/
    }
};


/**
 * See the file in the load directory
 * @param {import("../../game").scope} scope 
 * @param {string} path Where the file should be saved
 * @param {string} name the name of the file
 * @return {{
 * files: String[],
 * errors: any,
 * status: "error" | "success"
 * }} The file directory and some info on each file.
 */
SaveManager.loadDir = function(scope, path) {
    if (scope === true || scope.constants.isNodejs === true) {
        //load from local save using Node.js
        const fs = require('fs');
        //test C:\\KyraADV\\save
        const files = fs.readdirSync(path, function(err) {
            //handling error
            if (err) {
                console.log("loadDir failed.");
                return {
                    files: null,
                    errors: err,
                    status: "error"
                };
            }
        });
        console.log("loadDir success, reading file");
        return {
            files: files, //array of the file name found
            errors: null,
            status: "success"
        };
    } else {
        //load from local files using filesystem: https://web.dev/file-system-access/
    }
};

SaveManager.loadSaveFileViewer = function(scope, path) {
    if (scope === true || scope.constants.isNodejs === true) {
        //load from local save using Node.js
        const fs = require('fs');
        const dir = SaveManager.loadDir(scope, path),
            files = dir.files;
        dir.content = {};
        //listing all files using forEach
        console.log("Files:");
        console.log(files);
        files.forEach(file => {
            console.log(`reading file ${file}`);
            dir.content[file] = {
                name: file,
                errors: null,
                status: "success",
                data: null
            };
            dir.content[file].data = fs.readFileSync(`${path}\\${file}`, 'utf8', (err) => {
                if (err) {
                    dir.content[file].status = "error";
                    dir.content[file].errors = err;
                }
            });
        });
        return dir;
    }
};

//--------------------------------------------------------------------------------------------------------------
// Data manager
// The static class that manages the json files.

function DataManager() {
    throw new error("This is a static class.");
}

DataManager._scripts = [];
DataManager._errorUrls = [];
DataManager._dataLoaded = {};
DataManager._count = 0;

/**
 * @param {Array<Object>} plugins 
 * @param {any} call Callback function that is called when done
 */
DataManager.setup = function(plugins, call) {
    plugins.forEach(async function(plugin) {
        if (plugin.status && this._scripts.indexOf(plugin.name) === -1) {
            await this.loadScript(plugin.name + '.json', plugin.path, plugin);
            this._scripts.push(plugin.name);
        }
    }, this);

    const inter = setInterval(() => {
        if (DataManager._count === plugins.length) {
            if (call) call();
            clearInterval(inter);
        }
    }, 100);
};

DataManager.checkErrors = function() {
    var url = this._errorUrls.shift();
    if (url) {
        throw new Error('Failed to load: ' + url);
    }
};

DataManager.loadScript = async function(name, path, obj) {
    var url = path + name;
    let httpRequest = new XMLHttpRequest(); // asynchronous request
    httpRequest.open("GET", `${url}`);
    httpRequest.overrideMimeType('application/json');
    httpRequest.send();
    httpRequest.addEventListener("readystatechange", async function() {
        if (this.readyState === this.DONE) {
            // when the request has completed
            let object = JSON.parse(this.response);
            //if object is present, create a path or go to the path and add teh data at the end of the path
            if (object) {
                //get each path steps
                var objPath = obj.objPath.split(".");
                var currentPath = DataManager._dataLoaded;
                //check if there is a path, or paste it in global
                if (objPath[0] !== "") {
                    //going through the path
                    objPath.forEach(path => {
                        if (!currentPath[path]) {
                            currentPath[path] = {};
                        }
                        currentPath = currentPath[path];
                    });
                }
                //adding data
                currentPath[obj.name] = object;
                DataManager._count++;
            }
        }
    });

    httpRequest.onerror = function(err) {

    };
};


//--------------------------------------------------------------------------------------------------------------
// Window manager
// The static class that manages the window related interactions.

function WindowManager() {
    throw new Error("WindowManager is a static class.");
}

WindowManager.init = function() {
    window.addEventListener("beforeunload", function(e) {
        if (!window.game.state.once.checkUpdate.state.focused.yes || window.game.state.once.checkUpdate.state.focused.yes === false) {
            var confirmationMessage = "Are you sure you want to reload the page. Progression might not be saved.";

            e.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
            return confirmationMessage; // Gecko, WebKit, Chrome <34
        }
    });
};

WindowManager.closeGame = function() {
    window.game = {};
    const containerElement = document.getElementById("container");
    var element = findElement(containerElement, "CANVAS");
    if (element == null) {
        return false;
    } else {
        element.remove();
        return true;
    }
};

WindowManager.reloadGame = function() {
    //true for firefox
    location.reload(true);
};

/**
 * Show error on canvas, for fatal one that block and stops the game.
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Error} e 
 */
WindowManager.fatal = function(ctx, e, w, h) {
    window.cancelAnimationFrame(window.game.loop.stopLoop);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 16px serif";
    ctx.textAlign = "center";
    ctx.clearRect(0, 0, w, h);
    const report = e.stack.split("\n");
    for (let i = 0; i < report.length; i++) {
        const reportWidth = ctx.measureText(report[i]).width;
        if (reportWidth > w) report.push("Long crash log found. Check console for a full report.");
        ctx.fillText(report[i], w / 2, h / 2 + 16 * i);
    }
    console.log(e);
    ctx.fillStyle = "#ff0000";
    ctx.font = "bold 32px serif";
    ctx.textBaseline = 'top';
    ctx.fillText("Fatal error:", w / 2, 10);
};


//--------------------------------------------------------------------------------------------------------------
// Update manager
// The static class that manages the auto updates of the game.

function UpdateManager() {
    throw new Error("UpdateManager is a static class.");
}

/**
 * Check the package.json in the git repo, and check version, if different, return true, if same, return false
 * @param {string} version Current version of the game that will be tested with the version online. 
 * @param {any} call callback function
 * @returns {Boolean}
 */
UpdateManager.checkVersion = function(version, call) {
    if (!call) throw new TypeError("Call is not defined");

    function reqListener(res) {
        res = JSON.parse(res);
        const gamePackage = JSON.parse(window.atob(res.content));
        if (gamePackage.version === version) {
            call({ same: true, version: gamePackage.version });
        } else {
            call({ same: false, version: gamePackage.version });
        }
    }

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://api.github.com/repositories/462473385/contents/package.json", false); // false for synchronous request
    xmlHttp.send(null);
    xmlHttp.onload = reqListener(xmlHttp.responseText);
};

/**
 * We know there is a new version, save it if possible.
 * @param {string} version Version found
 */
UpdateManager.laterSave = function(version) {
    if (typeof require === "function" && typeof process === 'object') {
        const date = getDate();
        const fs = require("fs");
        const updateSaveFile = require("../../resources/data/Update.json");
        updateSaveFile.lastCheck = date;
        updateSaveFile.versionFound = version;
        updateSaveFile.updateFound = true;
        fs.writeFileSync(`../../resources/data/Update.json`, JSON.stringify(updateSaveFile), function(err) {
            if (err) throw err;
        });
    }
};

/**
 * Update the game.
 */
UpdateManager.updateGame = async function() {
    const mainFolder = await getContent("");
    console.log("Main folder");
    console.log(mainFolder);

    mainFolder.data.forEach(file => {
        if (file.type === "file") {
            pathLookUp.push(file.path);
        } else if (file.type === "dir") {
            dirAwaitLookUp.push(file.path);
        }
    });

    if (dirAwaitLookUp.length > 0) {
        await readRecur();
    }

    async function readRecur() {
        const dir = dirAwaitLookUp[0]; //? because we don't want duplicate, we will watch each dir one by one, and not with a foreach
        const dirRes = await getContent(dir);

        //if directory contain only one file, it's not an array. Prevent that:
        if (isNaN(dirRes.data.length) === false) {
            dirRes.data.forEach(file => {
                if (file.type === "file") {
                    pathLookUp.push(file.path);
                } else if (file.type === "dir") {
                    dirAwaitLookUp.push(file.path);
                } else {
                    console.warn(`File ${file.name} is not a known type:\n${file}`);
                }
            });
        } else {
            pathLookUp.push(dirRes.path);
        }

        //since we looked up the first dir, shift the object
        dirAwaitLookUp.shift();

        if (dirAwaitLookUp.length > 0) {
            readRecur();
        } else {
            finish();
        }
    }
};