// PluginManager
// The static class that manages the plugins.

function PluginManager() {
    throw new StaticClassError('This is a static class');
}

const container = document.getElementById("mainContainer");
const $container = document.getElementById('container');

PluginManager._scripts = [];
PluginManager._errorUrls = [];
PluginManager._parameters = {};

/**
 * @param {Array<{}>} plugins 
 */
PluginManager.setup = function(plugins) {
    PluginManager.task = plugins.length;
    plugins.forEach(function(plugin) {
        if (plugin.status && this._scripts.indexOf(plugin.name) === -1) {
            this.setParameters(plugin.name, plugin.parameters);
            this.loadScript(plugin.name + '.js', plugin.path);
            this._scripts.push(plugin.name);
        }
    }, this);
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
    document.body.appendChild(script);
};

PluginManager.onError = function(e) {
    this._errorUrls.push(e.target._url);
};

//--------------------------------------------------------------------------------------------------------------
// SaveManager
// The static class that manages saves.

function SaveManager() {
    throw new StaticClassError('This is a static class');
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
    throw new StaticClassError("This is a static class.");
}

DataManager._scripts = [];
DataManager._errorUrls = [];
DataManager._dataLoaded = {};

/**
 * @param {Array<Object>} plugins 
 */
DataManager.setup = function(plugins) {
    plugins.forEach(async function(plugin) {
        if (plugin.status && this._scripts.indexOf(plugin.name) === -1) {
            await this.loadScript(plugin.name + '.json', plugin.path, plugin);
            this._scripts.push(plugin.name);
        }
    }, this);
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
    throw new StaticClassError("WindowManager is a static class.");
}

WindowManager.data = {
    viewport: null,
    /**
     * @type {CanvasRenderingContext2D}
     */
    ctx: null,
    created: false
};

WindowManager.init = function() {
    WindowManager.data.created = true;
    const w = container.offsetWidth;
    const h = container.offsetHeight;

    function getPixelRatioInit(c) { var b = ['webkitBackingStorePixelRatio', 'mozBackingStorePixelRatio', 'msBackingStorePixelRatio', 'oBackingStorePixelRatio', 'backingStorePixelRatio']; var d = window.devicePixelRatio; var e = b.reduce(function(p, u) { return (c.hasOwnProperty(u) ? c[u] : 1); }); return d / e; }

    function generateCanvasInit(w, h) {
        var c = document.createElement('canvas'),
            x = c.getContext('2d'),
            r = getPixelRatioInit(x);
        c.width = Math.round(w * r);
        c.height = Math.round(h * r);
        c.style.width = w + 'px';
        c.style.height = h + 'px';
        x.setTransform(r, 0, 0, r, 0, 0);
        return c;
    }

    WindowManager.data.viewport = generateCanvasInit(w, h);
    WindowManager.data.viewport.id = "errorViewPort";
    WindowManager.data.ctx = WindowManager.data.viewport.getContext('2d');
    $container.insertBefore(WindowManager.data.viewport, $container.firstChild);
    console.log("Created error viewport.");

    window.addEventListener("beforeunload", function(e) {
        if (!window.game.state.once.checkUpdate.state.focused.yes || window.game.state.once.checkUpdate.state.focused.yes === false) {
            var confirmationMessage = "Are you sure you want to reload the page. Progression might not be saved.";

            e.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
            return confirmationMessage; // Gecko, WebKit, Chrome <34
        }
    });
    console.log("Added before unload event.");
};

WindowManager.closeGame = function() {
    window.game = {};
    var element = findElement($container, "CANVAS");
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
 * @param {Error} e The error.
 * @param {number} w Width of the canvas.
 * @param {number} h Height of the canvas.
 */
WindowManager.fatal = function(e, w, h) {
    function getPixelRatioInit(c) { var b = ['webkitBackingStorePixelRatio', 'mozBackingStorePixelRatio', 'msBackingStorePixelRatio', 'oBackingStorePixelRatio', 'backingStorePixelRatio']; var d = window.devicePixelRatio; var e = b.reduce(function(p, u) { return (c.hasOwnProperty(u) ? c[u] : 1); }); return d / e; }

    function generateCanvasInit(w, h) {
        var c = document.createElement('canvas'),
            x = c.getContext('2d'),
            r = getPixelRatioInit(x);
        c.width = Math.round(w * r);
        c.height = Math.round(h * r);
        c.style.width = w + 'px';
        c.style.height = h + 'px';
        x.setTransform(r, 0, 0, r, 0, 0);
        return c;
    }

    console.error(e);
    try {
        //stop the game loops
        window.cancelAnimationFrame(window.game.loop.stopLoop);
    } catch (err) {
        console.log(err);
    }

    if (WindowManager.data.ctx) {
        const ctx = WindowManager.data.ctx;
        //show error
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
        ctx.fillStyle = "#ff0000";
        ctx.font = "bold 32px serif";
        ctx.textBaseline = 'top';
        ctx.fillText("Fatal error:", w / 2, 10);
    } else {
        const w = container.offsetWidth;
        const h = container.offsetHeight;

        WindowManager.data.viewport = generateCanvasInit(w, h);
        WindowManager.data.viewport.id = "errorViewPort";
        WindowManager.data.ctx = WindowManager.data.viewport.getContext('2d');
        $container.insertBefore(WindowManager.data.viewport, $container.firstChild);
        console.log("Created error viewport.");

        const ctx = WindowManager.data.ctx;
        //show error
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
        ctx.fillStyle = "#ff0000";
        ctx.font = "bold 32px serif";
        ctx.textBaseline = 'top';
        ctx.fillText("Fatal error:", w / 2, 10);
    }
};


//--------------------------------------------------------------------------------------------------------------
// Update manager
// The static class that manages the auto updates of the game.

function UpdateManager() {
    throw new StaticClassError("UpdateManager is a static class.");
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