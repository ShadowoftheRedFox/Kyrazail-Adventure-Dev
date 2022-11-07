/// <reference path="../../ts/type.d.ts"/>
function ScriptLoaderManager() {
    throw new Error('This is a static class');
}

ScriptLoaderManager._scripts = [];
ScriptLoaderManager._errorUrls = [];
ScriptLoaderManager._parameters = {};

ScriptLoaderManager.setup = async function (plugins, number, call) {
    if (!plugins) throw new ReferenceError("plugins is not defined.");
    if (isNaN(number)) throw new ReferenceError("number is not defined.");
    if (typeof call !== "function") throw new TypeError(`Call is not a function, got ${typeof call}`);
    if (number >= plugins.length) return call();
    const plugin = plugins[number];
    if (!plugin.status) return ScriptLoaderManager.setup(plugins, number + 1, call);
    ScriptLoaderManager._scripts.push(plugin.name);
    ScriptLoaderManager.setParameters(plugin.name, plugin.parameters);
    var url = plugin.path + plugin.name + ".js";
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.async = false;
    script.onerror = function () {
        ScriptLoaderManager._errorUrls.push(url);
        WindowManager.fatal(`${url} failed`);
    };
    script._url = url;
    document.body.appendChild(script);
    script.onload = () => ScriptLoaderManager.setup(plugins, number + 1, call);
};

ScriptLoaderManager.parameters = function (name) {
    return this._parameters[name.toLowerCase()] || {};
};

ScriptLoaderManager.setParameters = function (name, parameters = {}) {
    this._parameters[name.toLowerCase()] = parameters;
};

function DataLoaderManager() {
    throw new Error("This is a static class.");
}

DataLoaderManager._datas = [];
DataLoaderManager._errorUrls = [];
DataLoaderManager._dataLoaded = {};

DataLoaderManager.setup = function (plugins, number, call) {
    if (!plugins || !Array.isArray(plugins)) throw new ReferenceError(`plugins is not an array, got ${typeof plugins}`);
    if (isNaN(number)) throw new ReferenceError(`number is not a number, got ${typeof number}`);
    if (typeof call !== "function") throw new TypeError(`call is not a function, got ${typeof call}`);
    if (number >= plugins.length) {
        return call();
    }
    const plugin = plugins[number];
    if (!plugin.status) {
        return DataLoaderManager.setup(plugins, number + 1, call);
    }
    DataLoaderManager._datas.push(plugin.name);
    var url = plugin.path + plugin.name + ".json";
    let httpRequest = new XMLHttpRequest(); // asynchronous request
    httpRequest.open("GET", `${url}`);
    httpRequest.overrideMimeType('application/json');
    httpRequest.send();
    httpRequest.addEventListener("readystatechange", async function () {
        if (this.readyState === this.DONE) {
            // when the request has completed
            let object = JSON.parse(this.response);
            //if object is present, create a path or go to the path and add the data at the end of the path
            if (object) {
                //get each path steps
                var objPath = plugin.objPath.split(".");
                var currentPath = DataLoaderManager._dataLoaded;
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
                currentPath[plugin.name] = object;
                DataLoaderManager.setup(plugins, number + 1, call);
            }
        }
    });

    httpRequest.onerror = function (err) {
        DataLoaderManager._errorUrls.push(url);
        console.warn(`${url} failed.\n${err}`);
        DataLoaderManager.setup(plugins, number + 1, call);
    };
};