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
        /**
         * Link the tilesetId to the firstgid.
         * @type {Map<number, number>}
         */
        this.setMap = new Map();
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

        HACK to fix the line problem when drawing perfact size
        When we are drawing multiple case, line appears between them when devicePixelRation gets tiny
        so we draw the tile 1 pixel wider and higher
        so the next one cover the pixel

        then we need to clear the extra pixel left on the right side and bottom
        */

        const GroundLayers = MapToRender.layers.filter(layer => layer.name == "Ground");
        const CollisionLayers = MapToRender.layers.filter(layer => layer.name == "Collision");
        const OverLayers = MapToRender.layers.filter(layer => layer.name == "Over");

        /*
        ? What order to render?
        Logics want ground, then collision, then over

        we want the player to be in the center of the screen at all time
        so if he doesn't move, we only need to draw each layer on their canvas, then update them all only if player moves
        */

        //TODO also check if the tile is visible on screen, if no, don't draw it
        //TODO create multiple canvases for each layer
        this.drawMap(scope, MapToRender, GroundLayers);
        this.drawMap(scope, MapToRender, CollisionLayers);
        this.drawMap(scope, MapToRender, OverLayers);

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
     * Return the image name of the set source.
     * @param {string} source The original source string.
     * @returns {string} The image name.
     */
    getImageNameFromSource(source) {
        return source.split("/").last().split(".")[0];
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
        scope.cache.map[map].tilesets.forEach((tileset, tilesetId) => {
            // get the name of the image through the string pattern, and replace it for further use
            tileset.source = `Tilesets/${this.getImageNameFromSource(tileset.source)}`;
            MapTileSetsImageToLoad.push(tileset.source);

            // create a map that link tileset id and the firstgid
            this.setMap.set(tilesetId, tileset.firstgid);
        });

        GameLoadImage(scope, MapTileSetsImageToLoad, () => {
            this.mapLoaded = true;
            this.needsUpdate = true;
        });
    }


    /**
     * Return the correct image name depending of the sets and tile.
     * @param {GameMapTileSet[]} sets The sets array to look for.
     * @param {number} tile The tile.
     * @returns {{source:string, firstgid:number}} The image name and firstgid.
     */
    getImageFromTile(sets, tile = 0) {
        if (!sets || !Array.isArray(sets) || !sets.length) throw new TypeError("sets must be an array longer than 0!");
        if (tile == 0) return null;
        let imageSource = "";
        let setIndex = 0;

        // until the firstgid is >= tile, replace the source
        // so when it's not true anymore, we know we have the right source
        while (setIndex < sets.length && sets[setIndex].firstgid > tile) {
            setIndex++;
        }
        return { source: "Tilesets/" + this.getImageNameFromSource(sets[setIndex].source), firstgid: sets[setIndex].firstgid };
    }

    drawMap(scope, map, layers) {
        const ctx = scope.cache.context[this.canvasGroup];
        const TileWidth = map.tilewidth;
        const TileHeight = map.tileheight;
        const Width = scope.w;
        const Height = scope.h;

        layers.forEach((layer, layerId) => {
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
            // we now set the top left corner
            const LayerPositionX = (Width - layer.width * TileWidth) / 2;
            const LayerPositionY = (Height - layer.height * TileWidth) / 2;

            ctx.fillStyle = "white";
            ctx.fillRect(LayerPositionX, LayerPositionY, layer.width, layer.height);

            layer.chunks.forEach((chunk, chunkId) => {
                //BUG there is a pixel between each chunk border

                // set the top left corner of the current chunk
                const ChunkPositionX = LayerPositionX + ((chunkId % (layer.width / chunk.width)) * chunk.width) * TileWidth;
                const ChunkPositionY = LayerPositionY + (Math.floor(chunkId / (layer.height / chunk.height)) * chunk.height) * TileHeight;

                /*
                ! size
                chunk.width and chunk.height means the total tile on the chunk
                */
                /*
                ! coordinates
                chunk.x and chunk.y indicates the top left corner of the layer on the whole layer/map?
                */
                chunk.data.forEach((tile, tileId) => {
                    // get the exact position of the current tile
                    const TilePositionX = ChunkPositionX + (tileId % chunk.width) * TileWidth;
                    const TilePositionY = ChunkPositionY + (Math.floor(tileId / chunk.height)) * TileHeight;

                    //TEST
                    // ctx.fillStyle = (((tileId % chunk.width + Math.floor(tileId / chunk.height)) % 2 == 0) ? "grey" : "darkgrey");
                    // if (tileId == 0) ctx.fillStyle = "green";
                    // if (tileId == chunk.data.length - 1) ctx.fillStyle = "green";
                    // ctx.fillRect(TilePositionX, TilePositionY, TileWidth + 1, TileHeight + 1);
                    //TEST END

                    // if tile == 0, it means it's empty, so just ski it
                    if (tile !== 0) {
                        // else, get the image depending of the tile value and image max tile value
                        const TileData = this.getImageFromTile(map.tilesets, tile);
                        // and render the tile
                        const TileImage = scope.cache.image[TileData.source].image;

                        // calculating the source coodinates of the tile on the source image
                        const TileSourceX = ((tile - TileData.firstgid) * TileWidth) % TileImage.width;
                        const TileSourceY = Math.floor(((tile - TileData.firstgid) * TileHeight) / TileImage.height);

                        // make sure to smooth each pixel so it doesn't look rough
                        ctx.imageSmoothingEnabled = true;
                        ctx.drawImage(
                            TileImage,
                            TileSourceX, TileSourceY,
                            TileWidth + 1, TileHeight + 1,
                            TilePositionX, TilePositionY,
                            TileWidth + 1, TileHeight + 1
                        );
                    }
                });
            });

            //HACK clearing extra pixel on the right side (plus the pixel at the corner, so the +1 at the end)
            ctx.clearRect(LayerPositionX + layer.width * TileWidth, LayerPositionY, 1, layer.height * TileHeight + 1);
            //HACK and no the bottom
            ctx.clearRect(LayerPositionX, LayerPositionY + layer.height * TileHeight, layer.width * TileWidth, 1);
        });
    }
}