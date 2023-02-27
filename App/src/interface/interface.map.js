

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

        /**@type {GameMapLayer[]} */
        this.GroundLayers = [];
        /**@type {GameMapLayer[]} */
        this.CollisionLayers = [];
        /**@type {GameMapLayer[]} */
        this.OverLayers = [];

        this.CenteredPositionLayerX = 0;
        this.CenteredPositionLayerY = 0;

        this.stepAnimation = 0;
        this.stepAnimationTimeout = 0;
    }

    /**
     * @param {GameScope} scope
     */
    render(scope) {
        const ctx = scope.cache.context[this.canvasGroup];
        const Width = scope.w;
        const Height = scope.h;
        const Player = scope.state.entities.player;

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
        // draw ground
        ctx.drawImage(CachedMap.ground, this.CenteredPositionLayerX, this.CenteredPositionLayerY, CachedMap.ground.width, CachedMap.ground.height);
        //STEP map animated
        // draw collision layer
        ctx.drawImage(CachedMap.collision, this.CenteredPositionLayerX, this.CenteredPositionLayerY, CachedMap.collision.width, CachedMap.collision.height);
        // STEP render entities here
        // draw the player
        if (!Player.character.invisible && Player.character.src) {
            ctx.imageSmoothingEnabled = false;
            //BUG find a way to smooth without having the next image pixels
            ctx.drawImage(scope.cache.image[Player.character.src].image,
                Player.character.row + this.stepAnimation * 32,
                (Player.character.col + GameOrientation.indexOf(Player.orientation)) * 32,
                32, 32,
                this.CenteredPositionLayerX + (Player.x) * MapToRender.tilewidth * 2,
                this.CenteredPositionLayerY + (Player.y) * MapToRender.tileheight * 2,
                32, 32);
            ctx.imageSmoothingEnabled = true;
        }
        // draw over layer
        ctx.drawImage(CachedMap.over, this.CenteredPositionLayerX, this.CenteredPositionLayerY, CachedMap.over.width, CachedMap.over.height);
        //STEP map effect

        this.needsUpdate = false;
    }

    /**
     * @param {GameScope} scope
     */
    update(scope) {
        if (!this.isMapLoaded) return;
        const Width = scope.w;
        const Height = scope.h;
        const Player = scope.state.entities.player;
        const MapToRender = scope.cache.map[this.currentMapName];
        const Collision = scope.cache.layers[this.currentMapName].collisionPattern;
        let PlayerRunning = GameConfig.alwaysRun;

        if (this.resized) {
            this.CenteredPositionLayerX = Math.round((Width - MapToRender.width * MapToRender.tilewidth) / 2);
            this.CenteredPositionLayerY = Math.round((Height - MapToRender.height * MapToRender.tileheight) / 2);
            this.resized = false;
            this.needsUpdate = true;
        }

        /*
        TODO for the playe movement, set a goalX and goalY
        while the player isn't here, that means he's moving
        player x and y will increase, and may not be integer value
        */

        if (KeyboardTrackerManager.pressed([GameConfig.keyBoard.run])) {
            PlayerRunning = !GameConfig.alwaysRun;
        }

        if (Player.goalX == Player.x && Player.goalY == Player.y) {
            let old = { x: Player.goalX, y: Player.goalY };
            if (KeyboardTrackerManager.pressed(GameConfig.keyBoard.left)) { Player.goalX--; }
            else if (KeyboardTrackerManager.pressed(GameConfig.keyBoard.up)) { Player.goalY--; }
            else if (KeyboardTrackerManager.pressed(GameConfig.keyBoard.right)) { Player.goalX++; }
            else if (KeyboardTrackerManager.pressed(GameConfig.keyBoard.down)) { Player.goalY++; }
            // reset the step animation if the player doesn't move
            else { this.stepAnimation = 1; this.needsUpdate = true; }
            // check collision
            if ((Player.goalX < 0 || Player.goalX >= MapToRender.width / 2) ||
                (Player.goalY < 0 || Player.goalY > MapToRender.height / 2) ||
                (!Collision[Player.goalY] || Collision[Player.goalY][Player.goalX])) {
                Player.goalX = old.x;
                Player.goalY = old.y;
            }
        } else if (this.stepAnimationTimeout + 200 / ((PlayerRunning ? 2 : 1)) <= Date.now()) {
            // make the step animation
            this.stepAnimationTimeout = Date.now();
            this.stepAnimation = (this.stepAnimation == 0 ? 2 : 0);
        }

        //TODO might want to change this with the pathfinder
        // move depending on the speed of the player
        const speed = Player.movementSpeed * (PlayerRunning ? 2 : 1) / 10;
        if (Player.goalX != Player.x) {
            if (Player.goalX > Player.x) {
                Player.x += speed;
                Player.orientation = "east";
                if (Player.x > Player.goalX) { Player.x = Player.goalX; }
            } else {
                Player.x -= speed;
                Player.orientation = "west";
                if (Player.x < Player.goalX) { Player.x = Player.goalX; }
            }
            this.needsUpdate = true;
        }
        if (Player.goalY != Player.y) {
            if (Player.goalY > Player.y) {
                Player.y += speed;
                Player.orientation = "south";
                if (Player.y > Player.goalY) { Player.y = Player.goalY; }
            } else {
                Player.y -= speed;
                Player.orientation = "north";
                if (Player.y < Player.goalY) { Player.y = Player.goalY; }
            }
            this.needsUpdate = true;
        }

        //STEP map animated
        //STEP entities
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
        //TODO create the player 
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
        MapLoaded.tilesets.forEach(tileset => {
            // get the name of the image through the string pattern, and replace it for further use
            tileset.source = `Tilesets/${this.getImageNameFromSource(tileset.source)}`;
            MapTileSetsImageToLoad.push(tileset.source);
        });

        // sort all layer to its respective class
        this.GroundLayers = MapLoaded.layers.filter(layer => layer.name.includes("Ground"));
        this.CollisionLayers = MapLoaded.layers.filter(layer => layer.name.includes("Collision"));
        this.OverLayers = MapLoaded.layers.filter(layer => layer.name.includes("Over"));

        // initialise the player here
        //? might want to change if there is multiple spawns 

        scope.state.entities.player = new GameEntityPlayer(scope, MapLoaded.data.spawn.x, MapLoaded.data.spawn.y, "east");

        GameLoadImage(scope, MapTileSetsImageToLoad.concat(GameImagesToLoad), () => {
            try {
                if (!scope.cache.layers[map]) {
                    scope.cache.layers[map] = {
                        collision: null,
                        ground: null,
                        over: null,
                        collisionPattern: this.getCollisionPattern(scope, MapLoaded)
                    };
                }

                this.drawMap(scope, map);
            } catch (e) { WindowManager.fatal(e); }
        });
    }

    /**
     * @param {GameScope} scope
     * @param {GameMapPattern} map 
     * @returns {boolean[][]}
     */
    getCollisionPattern(scope, map) {
        /**@type {boolean[][]} */
        const collision = [];
        // since we have the max length and height for the whole map, make the array accordingly
        for (let y = 0; y < map.height; y += 2) {
            const lineCollision = [];
            for (let x = 0; x < map.width; x += 2) {
                lineCollision.push(0);
            }
            collision.push(lineCollision);
        }

        this.CollisionLayers.forEach(layer => {
            layer.chunks.forEach(chunk => {
                for (let tileId = 0; tileId < chunk.data.length; tileId += 2) {
                    const X = tileId % chunk.width;
                    const Y = Math.floor(tileId / chunk.height);
                    //only check if we're on the top left corner of the collision tile
                    if (X % 2 == 0 && Y % 2 == 0) {
                        const d = chunk.data;
                        collision[(chunk.y + Y) / 2][(chunk.x + X) / 2] =
                            (d[tileId] == 0 && // top left
                                d[tileId + 1] == 0 && // top right
                                d[tileId + chunk.width] == 0 && // bottom left
                                d[tileId + chunk.width + 1] == 0 // bottom right
                            ) ? 0 : 1;
                    }
                }
            });
        });

        return collision;
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
            // constants
            const TileWidth = map.tilewidth;
            const TileHeight = map.tileheight;

            // create the canvas for the layer
            const canvas = document.createElement('canvas');

            canvas.width = map.width * TileWidth;
            canvas.height = map.height * TileHeight;

            // get context 
            const ctx = canvas.getContext('2d');

            // make sure to smooth each pixel so it doesn't look rough
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";

            // draw everything
            layers.forEach(layer => {
                if (layer.visible != false && layer.opacity != 0) {
                    ctx.globalAlpha = layer.opacity;

                    const LayerPositionX = 0;
                    const LayerPositionY = 0;

                    layer.chunks.forEach(chunk => {
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
        sets.forEach((set, setId) => {
            lastGid = set.firstgid;
            if (tile >= lastGid) setIndex = setId;
        });

        return { source: "Tilesets/" + this.getImageNameFromSource(sets[setIndex].source), firstgid: sets[setIndex].firstgid };
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