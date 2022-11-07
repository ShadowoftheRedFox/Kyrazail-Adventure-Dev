/// <reference path="../../ts/type.d.ts"/>

class GameMapInterface extends GameInterfaces {
    /**
     * @param {GameScope} scope
     */
    constructor(scope) {
        super({
            asOwnCanvas: true,
            zindex: ConfigConst.ZINDEX.MAP,
            canvasGroup: "GameMapGroup",
            requiredImage: [],
            requiredAudio: []
        }, scope);

        this.currentMapName = "";
        this.mapLoaded = false;
    }

    /**
     * @param {GameScope} scope
     */
    render(scope) {
        const ctx = scope.cache.context[this.canvasGroup];
        const Width = scope.w;
        const Height = scope.h;

        ctx.clearRect(0, 0, Width, Height);

        if (!this.mapLoaded) {
            // if the map is not loaded, display loading map and wait
            ctx.fillStyle = "White";
            ctx.font = "2em Azure";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.fillText("Loading map", Width / 2, Height / 2, Width);
            this.needsUpdate = false;
        }

        //STEP map
        //STEP map animated
        //STEP entities
        //STEP map over
        //STEP map effect
    }

    /**
     * @param {GameScope} scope
     */
    update(scope) {
        //STEP map
        //STEP map animated
        //STEP entities
        //STEP map over
        //STEP map effect
    }

    /**
     * Change the map to display from the current one to the wanted one.
     * @param {GameScope} scope
     * @param {string} map The new map to render.
     */
    changeMap(scope, map) {
        //? maybe put it in the if, because the map is "loaded", just not yet initialised
        this.mapLoaded = false;
        if (!scope.cache.map[map]) {
            console.log(`Loading live map ${map}`);
            // try to live load the map
            return DataLoaderManager.setup([{
                name: map,
                path: "./resources/Data/map/",
                status: true,
                parameters: {},
                objPath: "map"
            }], 0, () => {
                console.log("live load map finish");
                this.changeMap(scope, map, "a");
            });
        }
        this.currentMapName = map;
        // live load the map images
        const MapTileSetsImageToLoad = [];
        scope.cache.map[map].tilesets.forEach(tileset => {
            // get the name of the image through the string pattern
            MapTileSetsImageToLoad.push(`Tilesets/${tileset.source.split("/").last().split(".")[0]}`);
        });

        GameLoadImage(scope, MapTileSetsImageToLoad, () => {
            this.mapLoaded = true;
            this.needsUpdate = true;
        });
    }
}