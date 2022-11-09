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
            return;
        }

        //STEP map
        const MapToRender = scope.cache.map[this.currentMapName];

        /*
        ? What will we do?
        We're gonna render the map, centered on the player
        The player should always be in the center of the screen
        So we need to get the center of the screen
        Then the size of the map
        then draw each layer  
        
        render ground first
        then collision
        then over
        */

        const CenterX = Width / 2;
        const CenterY = Height / 2;

        const TileWidth = MapToRender.tilewidth;
        const TileHeight = MapToRender.tileheight;

        const MapGround = MapToRender.layers.filter(layer => layer.name == "Ground");
        const MapCollision = MapToRender.layers.filter(layer => layer.name == "Collision");
        const MapOver = MapToRender.layers.filter(layer => layer.name == "Over");

        /*
        ? What order to render?
        Logics want ground, then collision, then over

        we want the player to be in the center of the screen at all time
        so if he doesn't move, we only need to draw each layer on their canvas, then update them all only if player moves
        */

        //TODO find how the fuck to get the coordinates of each tile ;-;
        //TODO also check if the tile is visible on screen, if no, don't draw it
        MapGround.forEach(layer => {
            if (!layer.visible || layer.opacity == 0) return;
            ctx.globalAlpha = layer.opacity;
            /*
            ! coordinates
            layer.x and layer.y indicates the top left corner of the layer on the whole map
            */
            /*
            ! start
            layer.startx layer.starty is the starting point compared to the rest of the grid
            */
            /*
            ! size
            layer.width and layer.height means the total tile on the layer
            */
            // where the tile is on the whole map grid
            let TilePositionX = CenterX + layer.x * TileWidth;
            let TilePositionY = CenterY + layer.y * TileHeight;
            layer.chunks.forEach(chunk => {
                console.log(chunk);
                /*
                ! size
                chunk.width and chunk.height means the total tile on the chunk
                */
                /*
                ! coordinates
                chunk.x and chunk.y indicates the top left corner of the layer on the whole layer/map?
                */
                TilePositionX += chunk.x * TileWidth;
                TilePositionY += chunk.y * TileHeight;
                chunk.data.forEach((tile, tileIndex) => {
                    // get the exact position of the current tile
                    let CurrentTileX = TilePositionX + (tileIndex % chunk.width) * TileWidth;
                    let CurrentTileY = TilePositionY + (Math.floor(tileIndex / chunk.height)) * TileHeight;
                    // if tile == 0, it means it's empty, so just clear the position on the context
                    if (tile == 0) {
                        ctx.clearRect(CurrentTileX, CurrentTileY, TileWidth, TileHeight);
                    } else {
                        // else, get the image depending of the tile value and image max tile value
                        let TileImage = null;
                        MapToRender.tilesets.forEach((set, setId) => {
                            // if we are at the last set, it in all case the one we need
                            if (setId + 1 == MapToRender.tilesets.length) { TileImage = scope.cache.image[set.source].image; return; }
                            // else, if the first tile id is bigger than the current tile, and since we're goinf from the tiniest to the biggest
                            // it means that the image was the one before that one
                            if (tile < set.firstgid && !TileImage) {
                                TileImage = scope.cache.image[MapToRender.tilesets[setId - 1].source].image;
                                return;
                            }
                        });
                        let TileSourceX = (tileIndex % chunk.width) * TileWidth;
                        let TileSourceY = (Math.floor(tileIndex / chunk.height)) * TileHeight;
                        ctx.drawImage(TileImage, TileSourceX, TileSourceY, TileWidth, TileHeight, CurrentTileX, CurrentTileY, TileWidth, TileHeight);
                    }
                });
            });
        });
        //TEST need to debug the part above
        /*
        TEST 1: render, but not correct tiles, nor correct images
        */


        //STEP map animated
        //STEP entities
        //STEP map over
        //STEP map effect

        this.needsUpdate = false;
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
            // try to live load the map
            return DataLoaderManager.setup([{
                name: map,
                path: "./resources/Data/map/",
                status: true,
                parameters: {},
                objPath: "map"
            }], 0, () => {
                this.changeMap(scope, map);
            });
        }
        this.currentMapName = map;
        // live load the map images
        const MapTileSetsImageToLoad = [];
        scope.cache.map[map].tilesets.forEach(tileset => {
            // get the name of the image through the string pattern, and replace it for further use
            tileset.source = `Tilesets/${tileset.source.split("/").last().split(".")[0]}`;
            MapTileSetsImageToLoad.push(tileset.source);
        });

        GameLoadImage(scope, MapTileSetsImageToLoad, () => {
            this.mapLoaded = true;
            this.needsUpdate = true;
        });
    }
}