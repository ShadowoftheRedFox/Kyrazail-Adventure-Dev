function testCanvasCreationMap() {
    var can = document.getElementById("canvas");
    var ctx = can.getContext('2d');
    var map = {
        cols: 8, //# of cols
        rows: 8, // # of rows
        tSize: 32, // tile size (32px x 32px)
        tiles: [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1]
        ], // map
    };

    var tileAtlas = new Image();
    tileAtlas.src = 'https://i.stack.imgur.com/2JX3d.png';
    tileAtlas.onload = function() {
        for (var c = 0; c < map.cols; c++) {
            for (var r = 0; r < map.rows; r++) {
                ctx.drawImage(
                    tileAtlas, // image
                    0,
                    0,
                    map.tSize, // size of tiles for cut size x
                    map.tSize, // size of tiles for cut size y
                    c * map.tSize, // place tiles on canvas x
                    r * map.tSize, // place tiles on canvas y
                    map.tSize, // place height
                    map.tSize // place width
                );

            }
        }
    };
}

function mapRenderManager() {
    throw new Error("This is a static class.");
}

/**
 * Check if we need to update the map or not.
 * @param {scope} scope
 * @returns {boolean} 
 */
mapRenderManager.checkStateChange = function(scope) {
    var changeState = false;
    const data = scope.cache.data,
        currentMap = scope.state.global.map.current,
        mapData = data.map[currentMap],
        groundData = mapData.ground,
        player = scope.state.entities.player;

    if (mapRenderManager.data.lastMap !== currentMap) {
        changeState = true;
        //make the player respawn ath the spawn tile of the new map
        scope.state.entities.player.state.data.justSpawned = true;
    } else if (mapRenderManager.data.lastPlayerX !== player.state.position.x) {
        changeState = true;
    } else if (mapRenderManager.data.lastPlayerY !== player.state.position.y) {
        changeState = true;
    } else if (mapRenderManager.data.lastCanvasX !== scope.constants.width) {
        changeState = true;
    } else if (mapRenderManager.data.lastCanvasY !== scope.constants.height) {
        changeState = true;
    } else if (mapRenderManager.data.lastPlayerFacing !== player.state.position.facing) {
        changeState = true;
    }

    return changeState;
};

mapRenderManager.data = {
    lastPlayerX: null,
    lastPlayerY: null,
    lastPlayerFacing: null,
    lastMap: null,
    renderRoof: false,
    lastCanvasX: null,
    lastCanvasY: null
};

/**
 * 
 * @param {scope} scope 
 * @returns 
 */
mapRenderManager.ground = function(scope) {

    if (mapRenderManager.checkStateChange(scope) === false) return;

    const data = scope.cache.data,
        currentMap = scope.state.global.map.current,
        /**
         * @type {MapTypeLim}
         */
        mapData = data.map[currentMap],
        player = scope.state.entities.player,
        ctx = scope.contextMap,
        tilesMaps = scope.constants.tilesMap;

    //it's the top left corner, where the middle of the map will be in the center of the canvas
    var centeredX = 0,
        centeredY = 0;

    let mapWidth = mapData.width * mapData.tilewidth,
        mapHeight = mapData.height * mapData.tileheight,
        canvasCenterX = scope.constants.width / 2,
        canvasCenterY = scope.constants.height / 2;

    centeredX = canvasCenterX - mapWidth / 2;
    centeredY = canvasCenterY - mapHeight / 2;

    mapRenderManager.data = {
        lastPlayerX: player.state.position.x,
        lastPlayerY: player.state.position.y,
        lastPlayerFacing: player.state.position.facing,
        lastMap: currentMap,
        renderRoof: true,
        lastCanvasX: scope.constants.width,
        lastCanvasY: scope.constants.height
    };

    scope.state.global.map.cornerX = centeredX;
    scope.state.global.map.cornerY = centeredY;

    //correct the player position
    player.state.position.x = centeredX + mapData.tilewidth * player.state.tiles.currentTileX * 2;
    player.state.position.y = centeredY + mapData.tilewidth * player.state.tiles.currentTileY * 2;

    //draw a background
    ctx.drawImage(
        scope.cache.image.parallaxes.BlueSky.image, // image
        0,
        0,
        scope.constants.width,
        scope.constants.height
    );
    ctx.drawImage(
        scope.cache.image.titles2.Mountains.image, // image
        0,
        0,
        scope.constants.width,
        scope.constants.height
    );

    //* we suppose we correctly loaded images before, maybe need a check somewhere

    /**
     * TODO: add colision array
     * find a way to render the player (maybe a special tile number? -1?)
     * set spawn tile coordinate (in a array for more?)
     * set event array
     * animated tile?
     */

    let tileSize = mapData.tilewidth;

    if (mapData.infinite === false) {
        mapData.layers.forEach(async layer => {
            //check if layer is visible
            if (layer.visible === true) {
                //the tile index of the layer
                /**
                 * @type {tilesetsImage}
                 */
                let mapIndex = 0;
                for (let col = 0; col < mapHeight; col += tileSize) {
                    for (let row = 0; row < mapWidth; row += tileSize) {
                        //the tile we are looking for
                        let tileVal = layer.data[mapIndex];
                        //get the correct image corresponding to the tile value
                        let tileImageSource = mapRenderManager.getTileImageSource(tileVal, mapData.tilesets);
                        /**
                         * @type {tilesetsImage}
                         */
                        let tileImage = scope.cache.image.tilesets[tileImageSource.src];
                        if (tileVal != 0) {
                            let atlasCol = tileImage.columns;
                            let atlasRow = tileImage.tilecount / atlasCol;
                            tileVal -= tileImageSource.g;
                            let sourceY = Math.floor(tileVal / atlasCol) * tileSize;
                            let sourceX = (tileVal % atlasCol) * tileSize;
                            ctx.drawImage(tileImage.image,
                                sourceX, sourceY,
                                tileSize, tileSize,
                                row + centeredX, col + centeredY,
                                tileSize, tileSize);
                        }
                        mapIndex++;
                    }
                }
            }
        });
    }
};

mapRenderManager.roof = function(scope) {
    if (mapRenderManager.data.renderRoof === false) return;

    const data = scope.cache.data,
        currentMap = scope.state.global.map.current,
        mapData = data.map[currentMap],
        groundData = mapData.ground,
        player = scope.state.entities.player;
};

/**
 * Return the source of the wanted tile value.
 * @param {number} value The value of the tile we want to draw.
 * @param {{firstgid:number,source: string}[]} sets All source image used to render this map.
 * @returns {{src:string,g:number}}
 */
mapRenderManager.getTileImageSource = function(value, sets) {
    if (sets.length === 0) throw new Error("Can't read the source of an empty array.");
    let source = sets[0].source;
    let g = sets[0].firstgid;
    if (value === 0) return source;

    sets.forEach(set => {
        if (value >= set.firstgid) {
            source = set.source;
            g = set.firstgid;
        }
    });
    return { src: source, g: g };
};