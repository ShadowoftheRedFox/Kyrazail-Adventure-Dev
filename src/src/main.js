try { win.showDevTools(); } catch (e) {}

//set up scripts
PluginManager.setup(scripts);

//set up json files
// DataManager.setup(datas);

//set up warning on unload
WindowManager.init();
const container = document.getElementById("mainContainer");

// wait for the HTML to load
window.onload = async function() {
    try {
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
        console.log(e);
        const canvas = document.getElementById('gameViewport');
        /**
         * @type {CanvasRenderingContext2D}
         */
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#fff";
        ctx.font = "20px Azure";
        ctx.textAlign = 'left';
        ctx.fillText("Test", 20, 20);
        WindowManager.fatal(ctx, e, container.offsetWidth, container.offsetHeight);
    }
};