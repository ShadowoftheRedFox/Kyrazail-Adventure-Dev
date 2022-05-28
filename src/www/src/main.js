//set up scripts
PluginManager.setup(scripts);

//set up json files
DataManager.setup(datas);

//set up warning on unload
WindowManager.init();

// wait for the HTML to load
window.onload = async function() {
    try {
        const container = document.getElementById("mainContainer");
        console.log("Html domain is fully loaded, starting game.");
        // Instantiate a new game in the global scope at good proportions
        window.game = new Game(container.offsetWidth, container.offsetHeight, defaultConfig.targetFps);
        document.getElementById('gameViewport').ondragstart = function() {
            return false;
        };
        document.getElementById('mapViewport').ondragstart = function() {
            return false;
        };
    } catch (e) {
        WindowManager.fatal(e, container.offsetWidth, container.offsetHeight);
    }
};