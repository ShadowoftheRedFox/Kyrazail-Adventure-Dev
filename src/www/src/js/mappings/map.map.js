// import { roundRect } from "../../function/roundedRectangle.js";
/**
 * Generate the map, depending of the state.
 * @param {import("../../../game").scope} scope 
 */
const generateMap = (scope) => new Promise(async(resolve, reject) => {
    const systemImage = scope.cache.image.system;
    const tilesImage = scope.cache.image.tilesets;
    const img = [
        "Dungeon_A1.png",
        "Dungeon_A2.png",
        "Dungeon_A4.png",
        "Dungeon_A5.png",
        "Dungeon_B.png",
        "Dungeon_C.png",
        "Inside_A1.png",
        "Inside_A2.png",
        "Inside_A4.png",
        "Inside_A5.png",
        "Inside_B.png",
        "Inside_C.png",
        "Outside_A1.png",
        "Outside_A2.png",
        "Outside_A3.png",
        "Outside_A4.png",
        "Outside_A5.png",
        "Outside_B.png",
        "Outside_C.png",
        "World_A1.png",
        "World_A2.png",
        "World_B.png"
    ];

    const w = scope.constants.width,
        h = scope.constants.height,
        omni = scope.constants.omnipotent,
        ctx = scope.context,
        /**
         * Horizontal line of the map.
         */
        col = Math.ceil(w / 32),
        /**
         * Vertical line of the map.
         */
        line = Math.ceil(h / 32),
        tiles = scope.cache.image.tilesets;

    /**Create a full black background */
    function bbg() {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, scope.constants.width, scope.constants.height);
    }

    const maps = {
        ground: {},
        sky: {},
        event: {},
        collision: {},
        mapper: tileMap(scope, e => {})
    };

    /*
    We need four maps:
    - the grounds, and anything that will be displayed under entities, static tiles and tiles that are animated, so 3 maps to display at interval
    - the sky, and anythin that will be displayed above entities, like doors, roofs etc
    - the event map, where there will be event if the player is on the wanted area, like chests, doors... tiles that are animated on event
    - collision map, where the entities will be stop, like walls or cliffs

    Maps could be bigger or tinier than the canvas, so we need to take care of that:
    - if the maps is tinier, display something on the outside
    - if it's bigger, we will need to move the map across the canvas, and moves entities with it

    Entities should spawn on specific location of the map, so they would be displayed even if it's outise of the canvas
    So we will need coordinate for map, and move on it

    Name classification:
    - A are ground
    - B are exteriors decorations
    - C are interiors decorations

    Object classifications:
    - Each map will be present on each maps var, ground, sky and event on multiple states for animations, collision may be updated


    --  Image  --
    Image tiles are 16x16 squares, can be longer or larger depending if the object


    -- Methods --
    Create a map who link tile case name with an object, from wich we can draw correctly the case from a double string array
    */

    var mapCount = 0;
    var omniTime = 0;
    bbg();

    const canvas = document.getElementById("gameViewport");
    /**
     * This is the idle map.
     * It must recover all the screen.
     */
    mapCount++;
    omniTime += 5000;
    //* We will draw the map on the currrent canvas, and it will be "erased" by drawing over it. Once we want the image, canvas.toDataURL("image/jpeg", 1.0);
    for (let lineCase = 0; lineCase <= line; lineCase++) {
        for (let colCase = 0; colCase <= col; colCase++) {
            ctx.drawImage(tiles.Outside_A5.image, 128, 64, 32, 32, colCase * 32, lineCase * 32, 32, 32);

            if (lineCase === line - 1 && colCase % 2 === 1) {
                //draw front tree
                ctx.drawImage(tiles.Outside_B.image, 0, 14 * 32, 64, 64, colCase * 32 - 32, 32, 64, 64);
            }
            if (lineCase === line - 1 && colCase % 2 === 0) {
                //draw border tree on top
                //since they take 2 case, do it one time on two
                ctx.drawImage(tiles.Outside_B.image, 2 * 32, 14 * 32, 64, 64, colCase * 32, 0, 64, 64);
            }
            //16x16 px path tile
            if (lineCase === line - 3) {
                //path down
                ctx.drawImage(tiles.Outside_A2.image, 5 * 16, 2 * 16, 16, 4 * 16, colCase * 32, lineCase * 32 - 64, 32, 32 * 3);
            }
        }
    }
    const idleMapSrc = await canvas.toDataURL("image/jpeg", 1.0);
    const idleImage = new Image();
    idleImage.onload = () => {
        maps.ground.idle = {
            w: idleImage.width,
            h: idleImage.height,
            col: col,
            row: line,
            src: idleImage.src,
            image: idleImage
        };
        mapCount--;
    };
    idleImage.onerror = function() {
        console.warn(idleImage.src + ' failed');
        mapCount--;
    };
    idleImage.src = idleMapSrc;
    bbg();

    /**
     * Full grass map
     */
    mapCount++;
    for (var lineCase = 0; lineCase <= 20; lineCase++) {
        for (let colCase = 0; colCase <= 20; colCase++) {
            ctx.drawImage(tiles.Outside_A5.image, 128, 64, 32, 32, colCase * 32, lineCase * 32, 32, 32);
        }
    }

    const spawnMapSrc = await canvas.toDataURL("image/jpeg", 1.0);
    const spawnImage = new Image();
    spawnImage.onload = () => {
        maps.ground.spawn = {
            w: spawnImage.width,
            h: spawnImage.height,
            col: 20,
            row: 20,
            src: spawnImage.src,
            image: spawnImage
        };
        mapCount--;
    };
    spawnImage.onerror = function() {
        console.warn(spawnImage.src + ' failed');
        mapCount--;
    };
    spawnImage.src = spawnMapSrc;

    const mapTot = mapCount;
    // draw loading screen
    bbg();
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = '16px Arial';
    ctx.fillText("Loading map...", scope.constants.width / 2, scope.constants.height / 2);
    ctx.fillText(`Still loading map... ${mapTot - mapCount} / ${mapTot}`, scope.constants.width / 2, scope.constants.height * 93 / 100);
    const inter = setInterval(() => {
        bbg();
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.font = '16px Arial';
        ctx.fillText("Loading map...", scope.constants.width / 2, scope.constants.height / 2);
        ctx.fillStyle = "#59BAE9";
        ctx.clearRect(0, 2 * scope.constants.height / 3, scope.constants.width, scope.constants.height);
        roundRect(ctx, scope.constants.width * 20 / 100, scope.constants.height * 90 / 100, (1 - ((mapCount) / mapTot)) * scope.constants.width * 60 / 100, scope.constants.height * 5 / 100, 5, true);
        ctx.textAlign = "center";
        ctx.fillStyle = "#fff";
        ctx.font = '16px Arial';

        if (mapCount > 0) {
            ctx.fillText(`Still loading map... ${mapTot - mapCount} / ${mapTot}`, scope.constants.width / 2, scope.constants.height * 93 / 100);
        } else {
            scope.context.fillText(`Finished loading maps.`, scope.constants.width / 2, scope.constants.height * 93 / 100);
            console.log("Finished loading maps.");
            resolve(maps);
            clearInterval(inter);
        }
    }, 60);
});