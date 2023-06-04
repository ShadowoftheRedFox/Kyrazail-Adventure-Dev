class GameMapInterface extends GameInterfaces {
    /**
     * @param {GameScope} scope
     */
    constructor(scope) {
        super({
            asOwnCanvas: true,
            zindex: ConfigConst.ZINDEX.MAP,
            canvasGroup: "GameMapGroup",
            requiredImage: ["System/Shadow", "Characters/!Flame"],
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
        this.keyPressDelay = 0;
        this.tileDelay = 0;
        this.tileCount = 0;

        this.eventReady = true;
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

        // STEP map
        const CachedMap = scope.cache.layers[this.currentMapName];
        const DataMap = scope.cache.data.map[this.currentMapName];

        // draw ground
        ctx.drawImage(CachedMap.ground, this.CenteredPositionLayerX, this.CenteredPositionLayerY, CachedMap.ground.width, CachedMap.ground.height);
        // STEP map animated
        // TODO draw event tiles
        DataMap.events.forEach(event => {
            this.drawEventTile(ctx, scope.cache.image["Characters/!Flame"].image, event);
        })
        // draw the shadow
        ctx.drawImage(scope.cache.image["System/Shadow"].image, Width / 2, Height / 2 + 4);
        // TODO draw all entities shadow
        // draw collision layer
        ctx.drawImage(CachedMap.collision, this.CenteredPositionLayerX, this.CenteredPositionLayerY, CachedMap.collision.width, CachedMap.collision.height);
        // STEP render entities here
        // draw the player
        if (!Player.character.invisible && Player.character.src) {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(scope.cache.image[Player.character.src].image, Player.character.row + this.stepAnimation * 32, (Player.character.col + GameOrientation.indexOf(Player.orientation)) * 32, 32, 32, Width / 2, Height / 2, 32, 32);
            ctx.imageSmoothingEnabled = true;
        }
        // draw over layer
        ctx.drawImage(CachedMap.over, this.CenteredPositionLayerX, this.CenteredPositionLayerY, CachedMap.over.width, CachedMap.over.height);
        // STEP map effect

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
        const MapData = scope.cache.data.map[this.currentMapName];
        const Collision = scope.cache.layers[this.currentMapName].collisionPattern;
        let PlayerRunning = GameConfig.alwaysRun;

        if (this.resized) {
            this.resized = false;
            this.needsUpdate = true;
        }

        // center everything from the player
        this.CenteredPositionLayerX = Width / 2 - Player.x * MapToRender.tilewidth * 2;
        this.CenteredPositionLayerY = Height / 2 - Player.y * MapToRender.tileheight * 2;

        // detect run
        if (KTM.pressed(GameConfig.keyBoard.run)) {
            PlayerRunning = !GameConfig.alwaysRun;
        }

        // pause
        if (KTM.pressed(GameConfig.keyBoard.pause) && this.keyPressDelay + 150 < Date.now()) {
            scope.state.menu.pause.pause(scope);
            this.activated = false;
            return;
        }

        // if the player isn't moving
        if (Player.goalX == Player.x && Player.goalY == Player.y) {
            let old = { x: Player.goalX, y: Player.goalY };
            if (KTM.pressed(GameConfig.keyBoard.left)) {
                Player.goalX--;
                Player.orientation = "west";
            }
            else if (KTM.pressed(GameConfig.keyBoard.up)) {
                Player.goalY--;
                Player.orientation = "north";
            }
            else if (KTM.pressed(GameConfig.keyBoard.right)) {
                Player.goalX++;
                Player.orientation = "east";
            }
            else if (KTM.pressed(GameConfig.keyBoard.down)) {
                Player.goalY++;
                Player.orientation = "south";
            }
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
                if (Player.x > Player.goalX) { Player.x = Player.goalX; }
            } else {
                Player.x -= speed;
                if (Player.x < Player.goalX) { Player.x = Player.goalX; }
            }
            this.needsUpdate = true;
        }
        if (Player.goalY != Player.y) {
            if (Player.goalY > Player.y) {
                Player.y += speed;
                if (Player.y > Player.goalY) { Player.y = Player.goalY; }
            } else {
                Player.y -= speed;
                if (Player.y < Player.goalY) { Player.y = Player.goalY; }
            }
            this.needsUpdate = true;
        }

        //STEP map animated
        if (this.tileDelay + 1000 < Date.now()) {
            //BUG stop rendering when leaving the tab
            this.tileDelay = Date.now();
            this.tileCount++;
            this.tileCount = this.tileCount.clamp(0, 12);
            this.needsUpdate = true;
        }
        //STEP entities
        //STEP map effect

        // STEP check for event
        MapData.events.forEach(event => {
            if (event.x == Player.goalX && event.y == Player.goalY && Player.orientation == event.o && KTM.pressed(GameConfig.keyBoard.confirm) && this.eventReady) {
                GameEventHandler.handle(event.e, ...event.a);
                this.eventReady = false;
                //TODO do a global event for the popup
                scope.state.menu.mapUI.newPopup(scope, `${event.a[1] > 0 ? `+${event.a[1]}` : event.a[1]} ${event.a[0]}`);
                setTimeout(() => {
                    this.eventReady = true;
                }, 100);
            }
        })
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
     * @param {number} spawn Player spawn number on the map
     */
    changeMap(scope, map, spawn = 0) {
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
        const MapData = scope.cache.data.map[map];

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
        // TODO animated layer

        // initialise the player here, at the wanted spawn
        scope.state.entities.player = new GameEntityPlayer(scope, MapData.player[spawn].x, MapData.player[spawn].y, MapData.player[spawn].o);

        // TODO remove old and spawn the new entities
        MapData.entities.forEach(entity => { });
        // TODO also spawn the player party

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

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {HTMLImageElement} image 
     * @param {GameMapEvent} event 
     * @param {number} x 
     * @param {number} y 
     */
    drawEventTile(ctx, image, event, x, y) {
        let sx = 0;
        let sy = 0;
        switch (event.t) {
            default:
            case 1:
                sx = 6 * 32;
                sy = (4 + this.tileCount % 4) * 32;
                break;
            case 2:
                sx = 7 * 32;
                sy = (4 + this.tileCount % 4) * 32;
                break;
            case 3:
                sx = 8 * 32;
                sy = (4 + this.tileCount % 4) * 32;
                break;
            case 4:
                sx = (9 + this.tileCount % 3) * 32;
                sy = 4 * 32;
                break;
            case 5:
                sx = (9 + this.tileCount % 3) * 32;
                sy = 5 * 32;
                break;
            case 6:
                sx = (9 + this.tileCount % 3) * 32;
                sy = 6 * 32;
                break;
            case 7:
                sx = (9 + this.tileCount % 3) * 32;
                sy = 7 * 32;
                break;
        }

        // TODO check if animated tile is in the screen, if not don't draw it
        ctx.drawImage(image, sx, sy, 32, 32,
            this.CenteredPositionLayerX + event.x * 32, this.CenteredPositionLayerY + event.y * 32, 32, 32);
    }
}