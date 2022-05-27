// import { roundRect } from "../function/roundedRectangle.js";
// import { frameRectangle } from "../function/frameRectangle.js";
/**
 * Will return of the opposite boolean value.
 * @param {boolean} bool  
 * @returns 
 */
function opposite(bool) {
    if (bool === false) return true;
    return false;
}
/** Player Module
 * Main player entity module.
 * @constructor scope
 */
class Player {
    /** Player Module
     * Main player entity module.
     * @param {scope} scope
     */
    constructor(scope) {
        var player = this;
        /**
         * @type {MapTypeLim}
         */
        const map = scope.cache.data.map[scope.state.global.map.current];
        // Create the initial state
        player.state = {
            position: {
                //bind player to spawn tile of the map
                x: scope.state.global.map.cornerX + map.tileSize * 2 * map.spawn[0] /*+ playerDim / 2*/ ,
                y: scope.state.global.map.cornerY + map.tileSize * 2 * map.spawn[1] /*+ playerDim / 2*/ ,
                /**
                 * @type {DirectionType} 
                 */
                facing: "south",
                running: false,
                moving: false,
                lastAnimation: 0
            },
            moveSpeed: 1.5,
            data: {
                justSpawned: true,
                spCountDown: Date.now(),
                inventoryOpen: false
            },
            movement: {
                moving: false,
                startedMoving: null
            },
            tiles: {
                currentTileX: map.spawn[0],
                currentTileY: map.spawn[1]
            },
            animationSpeed: 30,
            moveStack: [],
            map: {}
        };
        // Set up any other var/constants
        var right = false,
            left = false,
            up = false,
            down = false,
            moving = false,
            running = false,
            debug = scope.debug.debug,
            attack = false,
            /**
             * Dimension of the drawed player, in px, and it's a square.
             */
            playerDim = 32,
            /**
             * Line of the player on the image, 0 or 1.
             */
            playerLine = 1,
            /**
             * Row of the player on the image 0 to 3.
             */
            playerRow = 2,
            lastAnimation = player.state.position.lastAnimation;

        const kb = scope.settings.config.keyBoard,
            mapctx = scope.contextMap;

        // Draw the player on the canvas
        player.render = function playerRender() {
            //make the player spawn at the spawn tile of the map
            if (player.state.data.justSpawned === true) {

                // render the player at the spawn tile
                player.state.position.x = scope.state.global.map.cornerX + map.tileSize * 2 * map.spawn[0] /*+ playerDim / 2*/ ;
                player.state.position.y = scope.state.global.map.cornerY + map.tileSize * 2 * map.spawn[1] /*+ playerDim / 2*/ ;
                player.state.data.justSpawned = false;
            }

            if (scope.cache.image.characters.Spiritual) {
                const spirit = scope.cache.image.characters.Spiritual,
                    animationSpeed = player.state.animationSpeed;

                let stepAnimation = false;
                if (animationSpeed > (player.state.position.x + player.state.position.y) % (animationSpeed * 2)) {
                    stepAnimation = false;
                } else {
                    stepAnimation = true;
                }

                //draw the player on the correct direction and on idle or step
                if (player.state.position.facing === "east") { // right
                    if (player.state.position.moving === true) {
                        if (stepAnimation === true) {
                            mapctx.drawImage(spirit.image,
                                (playerRow * 3 + 0) * 32 + 1,
                                (playerLine * 4 + 2) * 32 + 1,
                                32,
                                32,
                                player.state.position.x, player.state.position.y, playerDim, playerDim);
                        } else {
                            mapctx.drawImage(spirit.image,
                                (playerRow * 3 + 2) * 32 + 1,
                                (playerLine * 4 + 2) * 32 + 1,
                                32,
                                32,
                                player.state.position.x, player.state.position.y, playerDim, playerDim);
                        }
                    } else {
                        mapctx.drawImage(spirit.image,
                            (playerRow * 3 + 1) * 32 + 1,
                            (playerLine * 4 + 2) * 32 + 1,
                            32,
                            32,
                            player.state.position.x, player.state.position.y, playerDim, playerDim);
                    }
                }
                if (player.state.position.facing === "west") { // left
                    if (player.state.position.moving === true) {
                        if (stepAnimation === true) {
                            mapctx.drawImage(spirit.image,
                                (playerRow * 3 + 0) * 32 + 1,
                                (playerLine * 4 + 1) * 32 + 1,
                                32,
                                32,
                                player.state.position.x, player.state.position.y, playerDim, playerDim);
                        } else {
                            mapctx.drawImage(spirit.image,
                                (playerRow * 3 + 2) * 32 + 1,
                                (playerLine * 4 + 1) * 32 + 1,
                                32,
                                32,
                                player.state.position.x, player.state.position.y, playerDim, playerDim);
                        }
                    } else {
                        mapctx.drawImage(spirit.image,
                            (playerRow * 3 + 1) * 32 + 1,
                            (playerLine * 4 + 1) * 32 + 1,
                            32,
                            32,
                            player.state.position.x, player.state.position.y, playerDim, playerDim);
                    }
                }
                if (player.state.position.facing === "north") { // up
                    if (player.state.position.moving === true) {
                        if (stepAnimation === true) {
                            mapctx.drawImage(spirit.image,
                                (playerRow * 3 + 0) * 32 + 1,
                                (playerLine * 4 + 3) * 32 + 1,
                                32,
                                32,
                                player.state.position.x, player.state.position.y, playerDim, playerDim);
                        } else {
                            mapctx.drawImage(spirit.image,
                                (playerRow * 3 + 2) * 32 + 1,
                                (playerLine * 4 + 3) * 32 + 1,
                                32,
                                32,
                                player.state.position.x, player.state.position.y, playerDim, playerDim);
                        }
                    } else {
                        mapctx.drawImage(spirit.image,
                            (playerRow * 3 + 1) * 32 + 1,
                            (playerLine * 4 + 3) * 32 + 1,
                            32,
                            32,
                            player.state.position.x, player.state.position.y, playerDim, playerDim);
                    }
                }
                if (player.state.position.facing === "south") { // down
                    if (player.state.position.moving === true) {
                        if (stepAnimation === true) {
                            mapctx.drawImage(spirit.image,
                                (playerRow * 3 + 0) * 32 + 1,
                                (playerLine * 4 + 0) * 32 + 1,
                                32,
                                32,
                                player.state.position.x, player.state.position.y, playerDim, playerDim);
                        } else {
                            mapctx.drawImage(spirit.image,
                                (playerRow * 3 + 2) * 32 + 1,
                                (playerLine * 4 + 0) * 32 + 1,
                                32,
                                32,
                                player.state.position.x, player.state.position.y, playerDim, playerDim);
                        }
                    } else {
                        mapctx.drawImage(spirit.image,
                            (playerRow * 3 + 1) * 32 + 1,
                            (playerLine * 4 + 0) * 32 + 1,
                            32,
                            32,
                            player.state.position.x, player.state.position.y, playerDim, playerDim);
                    }
                }
            } else {
                mapctx.fillStyle = '#40d870';
                mapctx.fillRect(player.state.position.x, player.state.position.y, playerDim, playerDim);
            }

            //draw the inventory
            if (player.state.data.inventoryOpen === true) {
                //TODO
            }
        };

        // Fired via the global update method.
        // Mutates state as needed for proper rendering next state
        player.update = function playerUpdate() {
            //to follow which key are being pressed, at same time or not
            /*var map = player.state.map; // You could also use an array
            onkeydown = onkeyup = function(e) {
                map[e.key] = e.type == 'keydown';
                console.log(map);
            };*/

            // Set up `onkeydown` event handler.
            onkeydown = function(ev) {
                if (debug === true) console.log(ev);
                if (kb.debug.includes(ev.key) && scope.constants.omnipotent === true) {
                    if (debug === false) {
                        scope.debug.debug = true;
                        scope.debug.showFps = true;
                        debug = true;
                        console.log(scope);
                        const inter = setInterval(() => {
                            console.log(scope);
                            if (scope.debug.debug === false) {
                                clearInterval(inter);
                            }
                        }, 1 * 60 * 1000);
                    } else {
                        scope.debug.debug = false;
                        scope.debug.showFps = false;
                        debug = false;
                    }
                }
                if (scope.menu.paused === false && player.state.data.inventoryOpen === false) {
                    if (kb.run.includes(ev.key)) {
                        running = true;
                        player.state.position.running = running;
                    }
                    if (kb.interaction.includes(ev.key)) {
                        attack = true;
                    }
                    if (kb.right.includes(ev.key)) {
                        right = true;
                        player.state.position.facing = "east";
                        player.state.position.moving = true;
                        if (!player.state.moveStack.includes("r")) player.state.moveStack.push("r");
                    }
                    if (kb.left.includes(ev.key)) {
                        left = true;
                        player.state.position.facing = "west";
                        player.state.position.moving = true;
                        if (!player.state.moveStack.includes("l")) player.state.moveStack.push("l");
                    }
                    if (kb.up.includes(ev.key)) {
                        up = true;
                        player.state.position.facing = "north";
                        player.state.position.moving = true;
                        if (!player.state.moveStack.includes("u")) player.state.moveStack.push("u");
                    }
                    if (kb.down.includes(ev.key)) {
                        down = true;
                        player.state.position.facing = "south";
                        player.state.position.moving = true;
                        if (!player.state.moveStack.includes("d")) player.state.moveStack.push("d");
                    }
                }
            };

            // Set up `onkeyup` event handler.
            onkeyup = function(ev) {
                if (kb.pause.includes(ev.key) || kb.back.includes(ev.key)) {
                    if (scope.menu.paused === false && player.state.data.inventoryOpen === false) {
                        right = false;
                        left = false;
                        up = false;
                        down = false;
                        running = false;
                        attack = false;
                        player.state.position.moving = false;
                        scope.menu.paused = true;
                    }
                } else if (kb.inventory.includes(ev.key)) {
                    if (player.state.data.inventoryOpen === false) {
                        player.state.data.inventoryOpen = true;
                        scope.constants.cursor = true;
                    } else {
                        player.state.data.inventoryOpen = false;
                        scope.constants.cursor = false;
                    }
                }
                if (scope.menu.paused === false && player.state.data.inventoryOpen === false) {
                    if (kb.run.includes(ev.key)) {
                        running = false;
                        player.state.position.running = running;
                    }

                    if (kb.right.includes(ev.key)) {
                        right = false;
                        player.state.movement.moving = true;
                        if (player.state.moveStack.includes("r")) {
                            let index = player.state.moveStack.indexOf("r");
                            player.state.moveStack.splice(index, 1);
                        }
                    } else if (kb.left.includes(ev.key)) {
                        left = false;
                        player.state.movement.moving = true;
                        if (player.state.moveStack.includes("l")) {
                            let index = player.state.moveStack.indexOf("l");
                            player.state.moveStack.splice(index, 1);
                        }
                    } else if (kb.up.includes(ev.key)) {
                        up = false;
                        player.state.movement.moving = true;
                        if (player.state.moveStack.includes("u")) {
                            let index = player.state.moveStack.indexOf("u");
                            player.state.moveStack.splice(index, 1);
                        }
                    } else if (kb.down.includes(ev.key)) {
                        down = false;
                        player.state.movement.moving = true;
                        if (player.state.moveStack.includes("d")) {
                            let index = player.state.moveStack.indexOf("d");
                            player.state.moveStack.splice(index, 1);
                        }
                    }
                }
            };

            //check if players have is running, then edit move speed, in px
            if (running === true) {
                player.state.moveSpeed = 64;
            } else {
                player.state.moveSpeed = 32;
            }

            // Check if keys are pressed, if so, update the players position.
            if (scope.menu.paused === false && player.state.data.inventoryOpen === false) {
                if (player.state.movement.moving === false) {
                    const tileColisionToCheck = [],
                        currentTileX = player.state.tiles.currentTileX,
                        currentTileY = player.state.tiles.currentTileY;
                    let moved = false;
                    let tileChecked = 0;

                    if (left === true) {
                        //add tile we will cross in the array
                        if (currentTileX - 1 >= 0) tileColisionToCheck.push(map.colision[currentTileY][currentTileX - 1]);
                        if (running === true && currentTileX - 2 >= 0) tileColisionToCheck.push(map.colision[currentTileY][currentTileX - 2]);
                        //then look into the array
                        tileColisionToCheck.forEach(tile => {
                            if (tile === 0) {
                                //check if that's another tile and we already moved, that mean the last tile was free
                                if (moved === true || tileChecked === 0) {
                                    //free tile, move on it
                                    moved = true;
                                    player.state.tiles.currentTileX--;
                                    player.state.position.x -= playerDim;
                                } else {
                                    moved = false;
                                    //launch event at the tile that is blocked, if there is an event
                                    // map.event[currentTileY][currentTileX - 1];
                                }
                            }
                            tileChecked += 1;
                        });
                    } else if (right === true) {
                        //add tile we will cross in the array
                        if (currentTileX + 1 < map.width / 2) tileColisionToCheck.push(map.colision[currentTileY][currentTileX + 1]);
                        if (running === true && currentTileX + 2 < map.width / 2) tileColisionToCheck.push(map.colision[currentTileY][currentTileX + 2]);
                        //then look into the array
                        tileColisionToCheck.forEach(tile => {
                            if (tile === 0) {
                                //check if that's another tile and we already moved, that mean the last tile was free
                                if (moved === true || tileChecked === 0) {
                                    //free tile, move on it
                                    moved = true;
                                    player.state.tiles.currentTileX++;
                                    player.state.position.x += playerDim;
                                } else {
                                    moved = false;
                                    //launch event at the tile that is blocked, if there is an event
                                    // map.event[currentTileY][currentTileX + 1];
                                }
                            }
                            tileChecked += 1;
                        });
                    } else if (up === true) {
                        //add tile we will cross in the array
                        if (currentTileY - 1 >= 0) tileColisionToCheck.push(map.colision[currentTileY - 1][currentTileX]);
                        if (running === true && currentTileY - 2 >= 0) tileColisionToCheck.push(map.colision[currentTileY - 2][currentTileX]);
                        //then look into the array
                        tileColisionToCheck.forEach(tile => {
                            if (tile === 0) {
                                //check if that's another tile and we already moved, that mean the last tile was free
                                if (moved === true || tileChecked === 0) {
                                    //free tile, move on it
                                    moved = true;
                                    player.state.tiles.currentTileY--;
                                    player.state.position.y -= playerDim;
                                } else {
                                    moved = false;
                                    //launch event at the tile that is blocked, if there is an event
                                    // map.event[currentTileY - 1][currentTileX];
                                }
                            }
                            tileChecked += 1;
                        });
                    } else if (down === true) {
                        //add tile we will cross in the array
                        if (currentTileY + 1 < map.height / 2) tileColisionToCheck.push(map.colision[currentTileY + 1][currentTileX]);
                        if (running === true && currentTileY + 1 < map.height / 2) tileColisionToCheck.push(map.colision[currentTileY + 2][currentTileX]);
                        //then look into the array
                        tileColisionToCheck.forEach(tile => {
                            if (tile === 0) {
                                //check if that's another tile and we already moved, that mean the last tile was free
                                if (moved === true || tileChecked === 0) {
                                    //free tile, move on it
                                    moved = true;
                                    player.state.tiles.currentTileY++;
                                    player.state.position.y += playerDim;
                                } else {
                                    moved = false;
                                    //launch event at the tile that is blocked, if there is an event
                                    // map.event[currentTileY + 1][currentTileX];
                                }
                            }
                            tileChecked += 1;
                        });
                    }

                    player.state.movement.moving = true;
                }

                if (player.state.movement.startedMoving && player.state.movement.startedMoving + 200 <= Date.now()) {
                    player.state.movement.moving = false;
                    player.state.movement.startedMoving = Date.now();
                } else if (!player.state.movement.startedMoving || player.state.movement.startedMoving >= Date.now()) {
                    player.state.movement.startedMoving = Date.now();
                }
            }

            if (attack === true) {
                scope.state.global.player.pv--;
                attack = false;
            }

            // Bind the player to the boundary
            player.state.position.x = Math.min(Math.max(player.state.position.x, (playerDim / 2) + 10), scope.constants.width);
            player.state.position.y = Math.min(Math.max(player.state.position.y, (playerDim / 2) + 10), scope.constants.height);

            // if (debug) console.log(`x = ${player.state.position.x}\ny = ${player.state.position.y}`);
        };

        return player;
    }
}