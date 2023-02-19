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
        this.isMapLoaded = false;
        /**
         * Link the tilesetId to the firstgid.
         * @type {Map<number, number>}
         */
        this.setMap = new Map();

        /**@type {GameMapLayer[]} */
        this.GroundLayers = [];
        /**@type {GameMapLayer[]} */
        this.CollisionLayers = [];
        /**@type {GameMapLayer[]} */
        this.OverLayers = [];
        this.LayerMaxPositionX = 0;
        this.LayerMaxPositionY = 0;

        this.CenteredPositionLayerX = 0;
        this.CenteredPositionLayerY = 0;
    }

    /**
     * @param {GameScope} scope
     */
    render(scope) {
        const ctx = scope.cache.context[this.canvasGroup];
        const Width = scope.w;
        const Height = scope.h;

        ctx.clearRect(0, 0, Width, Height);

        if (!this.isMapLoaded) {
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
        const CachedMap = scope.cache.layers[this.currentMapName];

        // TODO move this with the camera
        ctx.drawImage(CachedMap.ground,
            this.CenteredPositionLayerX,
            this.CenteredPositionLayerY,
            CachedMap.ground.width, CachedMap.ground.height);
        ctx.drawImage(CachedMap.collision,
            this.CenteredPositionLayerX,
            this.CenteredPositionLayerY,
            CachedMap.collision.width, CachedMap.collision.height);
        ctx.drawImage(CachedMap.over,
            this.CenteredPositionLayerX,
            this.CenteredPositionLayerY,
            CachedMap.over.width, CachedMap.over.height);

        //TODO also check if the tile is visible on screen, if no, don't draw it
        //TODO create multiple canvases for each layer
        //TODO to optimize, give as little info as possible to function
        //TODO to optimize, save coordinates etc so we don't need to re calculate them again

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
        const Width = scope.w;
        const Height = scope.h;

        const MapToRender = scope.cache.map[this.currentMapName];
        const CachedMap = scope.cache.layers[this.currentMapName];

        if (this.resized) {
            this.CenteredPositionLayerX = (Width - this.LayerMaxPositionX * MapToRender.tilewidth) / 2;
            this.CenteredPositionLayerY = (Height - this.LayerMaxPositionY * MapToRender.tileheight) / 2;
            this.resized = false;
            this.needsUpdate = true;
        }
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
        // path to file: ../../folder/folder/file.ext
        // return file
        return source.split("/").last().split(".")[0];
    }

    /**
     * Change the map to display from the current one to the wanted one.
     * @param {GameScope} scope
     * @param {string} map The new map to render.
     */
    changeMap(scope, map) {
        //? maybe put it in the if, because the map is "loaded", just not yet initialised
        this.isMapLoaded = false;
        if (!scope.cache.map[map]) {
            // try to live load the map
            return DataLoaderManager.setup([{
                name: map,
                path: "./resources/Data/map/",
                status: true,
                parameters: {},
                objPath: "map"
            }], 0, () => {
                return this.changeMap(scope, map);
            });
        }
        this.currentMapName = map;
        const MapLoaded = scope.cache.map[map];

        // live load the map images
        const MapTileSetsImageToLoad = [];
        MapLoaded.tilesets.forEach((tileset, tilesetId) => {
            // get the name of the image through the string pattern, and replace it for further use
            tileset.source = `Tilesets/${this.getImageNameFromSource(tileset.source)}`;
            MapTileSetsImageToLoad.push(tileset.source);

            // create a map that link tileset id and the firstgid
            this.setMap.set(tilesetId, tileset.firstgid);
        });

        // sort all layer to its respective class
        this.GroundLayers = MapLoaded.layers.filter(layer => layer.name.includes("Ground"));
        this.CollisionLayers = MapLoaded.layers.filter(layer => layer.name.includes("Collision"));
        this.OverLayers = MapLoaded.layers.filter(layer => layer.name.includes("Over"));

        // calculate the largest dimension of the layer to center them all
        MapLoaded.layers.forEach(layer => {
            if (this.LayerMaxPositionX < layer.width + layer.startx) this.LayerMaxPositionX = layer.width + layer.startx;
            if (this.LayerMaxPositionY < layer.height + layer.starty) this.LayerMaxPositionY = layer.height + layer.starty;
        });

        GameLoadImage(scope, MapTileSetsImageToLoad, () => {
            //TODO STEP 1
            if (!scope.cache.layers[map]) {
                scope.cache.layers[map] = {
                    collision: null,
                    ground: null,
                    over: null,
                    collisionPattern: []
                };
            }

            this.drawMap(scope, map);
        });
    }

    /**
    * 
    * @param {GameScope} scope 
    * @param {string} map 
    */
    async drawMap(scope, map) {
        const CachedLayer = scope.cache.layers[map];
        const CachedMap = scope.cache.map[map];
        // draw ground
        CachedLayer.ground = await this.drawLayer(scope, CachedMap, this.GroundLayers);
        // draw over
        CachedLayer.over = await this.drawLayer(scope, CachedMap, this.OverLayers);
        // draw collision
        CachedLayer.collision = await this.drawLayer(scope, CachedMap, this.CollisionLayers);
        // get the collision pattern
        // TODO

        this.isMapLoaded = true;
        this.resized = true;
    }

    /**
     * @param {GameScope} scope 
     * @param {GameMapPattern} map 
     * @param {GameMapLayer[]} layers 
     * @returns {Promise<HTMLImageElement>}
     */
    drawLayer(scope, map, layers) {
        return new Promise((resolve, reject) => {
            const Width = scope.w;
            const Height = scope.h;

            // create the canvas for the layer
            const canvas = document.createElement('canvas');
            // get the max size
            let MaxWidth = Width, MaxHeight = Height;
            map.layers.forEach(layer => {
                if (layer.height > MaxHeight) { MaxHeight = layer.height; }
                if (layer.width > MaxWidth) { MaxWidth = layer.width; }
            });
            canvas.width = MaxWidth;
            canvas.height = MaxHeight;

            // get context and constants
            const ctx = canvas.getContext('2d');
            const TileWidth = map.tilewidth;
            const TileHeight = map.tileheight;

            // make sure to smooth each pixel so it doesn't look rough
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";

            // draw everything
            layers.forEach((layer, layerId) => {
                if (layer.visible != false && layer.opacity != 0) {
                    ctx.globalAlpha = layer.opacity;

                    const LayerPositionX = 0;
                    const LayerPositionY = 0;

                    layer.chunks.forEach((chunk, chunkId) => {
                        const ChunkPositionX = LayerPositionX + chunk.x * TileWidth;
                        const ChunkPositionY = LayerPositionY + chunk.y * TileHeight;

                        chunk.data.forEach((tile, tileId) => {
                            if (tile !== 0) {
                                const TilePositionX = ChunkPositionX + (tileId % chunk.width) * TileWidth;
                                const TilePositionY = ChunkPositionY + (Math.floor(tileId / chunk.height) * TileHeight);

                                // get the image depending of the tile value and image max tile value
                                const TileData = this.getImageFromTile(map.tilesets, tile);
                                const TileImage = scope.cache.image[TileData.source].image;

                                // calculating the source coodinates of the tile on the source image
                                const TileSourceX = ((tile - TileData.firstgid) * TileWidth) % TileImage.width;
                                const TileSourceY = Math.floor(((tile - TileData.firstgid) * TileHeight) / TileImage.height) * TileHeight;

                                ctx.drawImage(
                                    TileImage,
                                    // source coordinates to get the tile on image
                                    TileSourceX, TileSourceY,
                                    // dimension of the tile
                                    TileWidth, TileHeight,
                                    // source coordinates on the screen
                                    TilePositionX, TilePositionY,
                                    // dimension of the tile the screen
                                    TileWidth, TileHeight
                                );
                            }
                        });
                    });
                }
            });

            const i = document.createElement('img');
            i.onerror = function () {
                const e = new Error(`${i.src} failed (game map)`);
                reject(e);
                throw e;
            };
            i.onload = function () {
                resolve(i);
                return i;
            }
            i.src = canvas.toDataURL('image/png', 1.0);
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
        if (tile == 0) return { source: "Tilesets/" + this.getImageNameFromSource(sets[0].source), firstgid: sets[0].firstgid };
        let setIndex = 0;
        let lastGid = 0;

        // until the firstgid is < tile, replace the source
        // so when it's not true anymore, we know we have the right source
        // while (setIndex + 1 < sets.length && sets[setIndex].firstgid <= tile) {
        //     setIndex++;
        // }
        sets.forEach((set, setId) => {
            lastGid = set.firstgid;
            if (tile >= lastGid) setIndex = setId;
        });

        return { source: "Tilesets/" + this.getImageNameFromSource(sets[setIndex].source), firstgid: sets[setIndex].firstgid };
    }

    /**
     * 
     * @param {GameScope} scope 
     * @param {GameMapPattern} map 
     * @param {GameMapLayer[]} layers 
     */
    drawMapOld(scope, map, layers) {
        const ctx = scope.cache.context[this.canvasGroup];
        const TileWidth = map.tilewidth;
        const TileHeight = map.tileheight;
        const Width = scope.w;
        const Height = scope.h;

        // make sure to smooth each pixel so it doesn't look rough
        ctx.imageSmoothingEnabled = true;

        layers.forEach((layer, layerId) => {
            if (!layer.visible || layer.opacity == 0) return;
            ctx.globalAlpha = layer.opacity;
            /*
            coordinates: layer.x and layer.y indicates the top left corner of the layer on the whole map
            start: layer.startx layer.starty is the starting point compared to the rest of the grid
            size: layer.width and layer.height means the total tile on the layer
            */
            // where the tile is on the whole map grid
            // we now set the top left corner
            const LayerPositionX = (Width - this.LayerMaxPositionX * TileWidth) / 2;
            const LayerPositionY = (Height - this.LayerMaxPositionY * TileWidth) / 2;

            //TEST
            // ctx.fillStyle = "white";
            // ctx.fillRect(LayerPositionX, LayerPositionY, layer.width * TileWidth, layer.height * TileHeight);
            //TEST END

            layer.chunks.forEach((chunk, chunkId) => {
                // set the top left corner of the current chunk
                const ChunkPositionX = LayerPositionX + chunk.x * TileWidth;
                const ChunkPositionY = LayerPositionY + chunk.y * TileHeight;

                //TEST
                // const ChunkColor = ["#555555", "#666666", "#777777", "#888888", "#999999", "#AAAAAA", "#BBBBBB", "#CCCCCC", "#DDDDDD"];
                // ctx.fillStyle = ChunkColor[chunkId];
                // ctx.fillRect(ChunkPositionX, ChunkPositionY, chunk.width * TileWidth, chunk.height * TileHeight);
                // return;
                //TEST END

                /*
                size: chunk.width and chunk.height means the total tile on the chunk
                coordinates: chunk.x and chunk.y indicates the top left corner of the layer on the whole layer/map?
                */
                chunk.data.forEach((tile, tileId) => {
                    // get the exact position of the current tile
                    const TilePositionX = ChunkPositionX + (tileId % chunk.width) * TileWidth;
                    const TilePositionY = ChunkPositionY + (Math.floor(tileId / chunk.height) * TileHeight);

                    //TEST
                    // ctx.fillStyle = (((tileId % chunk.width + Math.floor(tileId / chunk.height)) % 2 == 0) ? "white" : "darkgrey");
                    // if (tileId == 0) ctx.fillStyle = "green";
                    // else if (tileId == chunk.data.length - 1) ctx.fillStyle = "green";
                    // ctx.fillRect(TilePositionX, TilePositionY, TileWidth, TileHeight);
                    // return;
                    //TEST END

                    // if tile == 0, it means it's empty, so just skip it
                    if (tile !== 0) {
                        // get the image depending of the tile value and image max tile value
                        const TileData = this.getImageFromTile(map.tilesets, tile);
                        const TileImage = scope.cache.image[TileData.source].image;

                        // calculating the source coodinates of the tile on the source image
                        const TileSourceX = ((tile - TileData.firstgid) * TileWidth) % TileImage.width;
                        const TileSourceY = Math.floor(((tile - TileData.firstgid) * TileHeight) / TileImage.height) * TileHeight;

                        // if (TileSourceY == 6) TileSourceY = (Math.floor((tile - TileData.firstgid) / (TileImage.height / TileHeight)) - 1) * TileHeight;
                        // console.log(TileSourceX / TileWidth, TileSourceY / TileHeight);
                        if (Math.floor(((tile - TileData.firstgid) * TileHeight) / TileImage.height) == 6) return;
                        // BUG image smoothing can take a pixel on the next image, divide the images in pixel?
                        ctx.drawImage(
                            TileImage,
                            TileSourceX, TileSourceY,
                            TileWidth, TileHeight,
                            TilePositionX, TilePositionY,
                            TileWidth, TileHeight
                        );
                    }
                });
            });
        });
    }


}

// BUG over layer tiles have pixel of miss placement (again)
// TODO save the image of the map once then move the camera

/*
GOAL: render multiple layer of maps

STEP 1 load map and save each layer images in the cache
STEP 2 create the camera and entities
STEP 3 display in hte correct order
Also, changing things on the map re create the image, replace it in cache
TODO remake the code in a clearer manner
*/

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

? What order to render?
Logics want ground, then collision, then over

we want the player to be in the center of the screen at all time
so if he doesn't move, we only need to draw each layer on their canvas, then update them all only if player moves

the layer, from the farthest to the closest:
ground
collision
animated
entities
over
*/