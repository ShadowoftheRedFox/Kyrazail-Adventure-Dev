// PluginManager
// The static class that manages the plugins.

function PluginManager() {
    throw new Error('This is a static class');
}

PluginManager._scripts = [];
PluginManager._errorUrls = [];
PluginManager._parameters = {};

/**
 * @param {Array<Object>} plugins 
 */
PluginManager.setup = function(plugins) {
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
    const container = document.getElementById("mainContainer");
    container.appendChild(script);
};

PluginManager.onError = function(e) {
    this._errorUrls.push(e.target._url);
};