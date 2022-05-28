// import { lightEffect } from "../function/lightEffect.js";
// import { bubble } from "../function/bubble.js";
/** Game idle Module
 * Called by the game loop, this module will
 * perform show an idle screen of the player didn't
 * interract for a certain amount of time.
 * @param {scope} scope
 * @deprecated
 */
class Idle {
    /** Game idle Module
     * Called by the game loop, this module will
     * perform show an idle screen of the player didn't
     * interract for a certain amount of time.
     * @param {scope} scope
     */
    constructor(scope) {
        var idle = this;
        // Setup globals
        //dimension partent de haut gauche a bas droite
        const ctx = scope.context,
            h = scope.constants.height,
            w = scope.constants.width,
            tFps = scope.constants.targetFps;
        //getting all of our image ready and easy to use, with easy names
        const img = {
            balloon: scope.cache.image.system.Balloon,
            shadow: scope.cache.image.system.Shadow,
            campFireBase: scope.cache.image.tilesets.Outside_B,
            campFireFlame: scope.cache.image.characters["!Flame"],
            drunk: [
                scope.cache.image.characters.Damage1,
                scope.cache.image.characters.Damage2,
                scope.cache.image.characters.Damage3,
                scope.cache.image.characters.Damage4
            ],
            monster: [
                scope.cache.image.characters.Monster1,
                scope.cache.image.characters.Monster2,
                scope.cache.image.characters.Monster3
            ],
            drink: scope.cache.image.characters["!Other3"],
            people: [
                scope.cache.image.characters.Actor1,
                scope.cache.image.characters.Actor2,
                scope.cache.image.characters.Actor3,
                scope.cache.image.characters.Actor4,
                scope.cache.image.characters.Actor5
            ],
            map: {
                Outside_A1: scope.cache.image.tilesets.Outside_A1,
                Outside_A2: scope.cache.image.tilesets.Outside_A2,
                Outside_A5: scope.cache.image.tilesets.Outside_A5,
                Inside_B: scope.cache.image.tilesets.Inside_B,
                Inside_C: scope.cache.image.tilesets.Inside_C
            },
            guard: scope.cache.image.characters.People4,
            spell: scope.cache.image.animations.Spear1
        };

        // Create the initial state
        idle.state = {
            countFrame: 0,
            justSpawned: false,
            fade: 0,
            fading: false,
            flameCountFrame: 0,
            sleepCountFrame: 0,
            sleepAmount: [],
            bubble: {
                bubbleCountFrame: 0,
                choosen: {}
            },
            beer: {},
            guard: {
                guardCountFrame: 0,
                exclamation: false,
                exclamationDone: false,
                exclamationCount: 0,
                exclamationDoneCount: 0,
                interrogation: false,
                interrogationDone: false,
                interrogationCount: 0,
                interrogationDoneCount: 0,
                silent: false,
                silentDone: false,
                silentCount: 0,
                silentDoneCount: 0
            },
            running: {
                amount: []
            },
            monsters: {
                amount: []
            },
            training: {
                amount: []
            }
        };


        var IS = idle.state,
            countFrame = IS.countFrame;
        const initialState = JSON.parse(JSON.stringify(IS));

        // Draw the menu on the canvas
        idle.render = function menuRender() {
            if (scope.constants.idle.isIdle === false) {
                if (IS.justSpawned === false) {
                    IS.fade = 0;
                    IS.countFrame = 0;
                    IS.justSpawned = true;
                    IS.fading = false;
                }
                return;
            }
            if (IS.justSpawned === true) {
                IS.fading = true;
                IS.justSpawned = false;
            }
            if (IS.fading === true) {
                IS.fade += 0.05;
                ctx.globalAlpha = IS.fade;
                if (IS.fade >= 1) {
                    IS.fading = false;
                    ctx.globalAlpha = 1;
                }
            }
            //getting the width of the canvas and getting all the screen filled with grass tiles, who are 32x32 px
            /**
             * Horizontal line of the map.
             */
            var col = Math.ceil(w / 32);
            /**
             * Vertical line of the map.
             */
            var line = Math.ceil(h / 32);

            /**Draw player afk with "..." animation */
            function playerAFK() {
                ctx.font = "bold 48px serif";
                ctx.fillStyle = "#fff";
                ctx.textAlign = "center";
                countFrame++;

                //countFrame = target fps mean 1 seconds elpased
                if (countFrame <= tFps) {
                    ctx.fillText("Player is afk", w / 2, h / 2);
                } else if (countFrame <= 2 * tFps) {
                    ctx.fillText("Player is afk.", w / 2, h / 2);
                } else if (countFrame <= 3 * tFps) {
                    ctx.fillText("Player is afk..", w / 2, h / 2);
                } else {
                    ctx.fillText("Player is afk...", w / 2, h / 2);
                    if (countFrame >= tFps * 4) countFrame = 0;
                }
            }
            /**Guard front */
            function gf() {
                ctx.drawImage(img.guard.image, 10 * 32, 4 * 32, 32, 32, w / 2, (line - 7) * 32, 32, 32);
            }
            /**Guard left */
            function gl() {
                ctx.drawImage(img.guard.image, 10 * 32, 5 * 32, 32, 32, w / 2, (line - 7) * 32, 32, 32);
            }
            /**Guard right */
            function gr() {
                ctx.drawImage(img.guard.image, 10 * 32, 6 * 32, 32, 32, w / 2, (line - 7) * 32, 32, 32);
            }
            /**Draw a shadow where you put the coordinate, 4px lower.
             * @param {number} x Horizontal coordinate.
             * @param {number} y Vertical coordinate.
             */
            function s(x, y) {
                ctx.drawImage(img.shadow.image, x, y + 4);
            }

            //showing an idle screen.
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, w, h);

            //* background maps
            //drawing maps on each case who are statics and at the same place 

            if (!scope.cache.map.ground.idle) {
                //! Laggy
                for (let colCase = 0; colCase <= col; colCase++) {
                    for (let lineCase = 0; lineCase <= line; lineCase++) {
                        //to not redraw grass on trees
                        if (lineCase >= 2) {
                            ctx.drawImage(img.map.Outside_A5.image, 128, 64, 32, 32, colCase * 32, lineCase * 32, 32, 32);
                        }
                        if (lineCase === 5 && colCase % 2 === 1) {
                            //draw front tree
                            ctx.drawImage(img.campFireBase.image, 0, 14 * 32, 64, 64, colCase * 32 - 32, 32, 64, 64);
                        }
                        if (lineCase === 0 && colCase % 2 === 0) {
                            //draw border tree on top
                            //since they take 2 case, do it one time on two
                            ctx.drawImage(img.campFireBase.image, 2 * 32, 14 * 32, 64, 64, colCase * 32, lineCase * 32, 64, 64);
                        }
                        //16x16 px path tile
                        if (lineCase === line - 3) {
                            //path down
                            ctx.drawImage(img.map.Outside_A2.image, 5 * 16, 2 * 16, 16, 4 * 16, colCase * 32, lineCase * 32 - 64, 32, 32 * 3);
                        }
                    }
                }
            } else {
                ctx.drawImage(scope.cache.map.ground.idle.image, 0, 0, w, h);
            }

            //* All in one function for drunk people
            /**
             * Draw drunk people around a camp fire at given coordinate.
             * @param {number} x Horizontal coordinate.
             * @param {number} y Vertival coordinate.
             * @param {number} number The amount of time this function is used total.
             */
            function drunkPeople(x, y, number) {
                //base right top
                ctx.drawImage(img.campFireBase.image, 4 * 32, 10 * 32, 32, 32, x, y, 32, 32);
                //flame
                IS.flameCountFrame++;
                if (IS.flameCountFrame <= 20) {
                    ctx.drawImage(img.campFireFlame.image, 9 * 32, 1 * 32, 32, 32, x, y, 32, 32);
                } else if (IS.flameCountFrame <= 40) {
                    ctx.drawImage(img.campFireFlame.image, 10 * 32, 1 * 32, 32, 32, x, y, 32, 32);
                } else {
                    ctx.drawImage(img.campFireFlame.image, 11 * 32, 1 * 32, 32, 32, x, y, 32, 32);
                    if (IS.flameCountFrame >= 60) IS.flameCountFrame = 0;
                }
                // lightEffect(ctx, x + 16, y + 16, 5 * 32, 32 * 4, ctx.globalAlpha, 0.0065, "#e25822");

                if (!IS.sleepAmount[number]) {
                    IS.sleepAmount[number] = [];
                }
                for (var i = 0; i < 4; i++) {
                    if (!IS.sleepAmount[number][i]) {
                        const choosenImage = img.drunk[Math.floor(Math.random() * img.drunk.length)],
                            randomPeopleX = Math.floor((choosenImage.image.width / 32) * Math.random()),
                            randomPeopleY = Math.floor((choosenImage.image.height / 32) * Math.random());

                        IS.sleepAmount[number][i] = {
                            choosenImage: choosenImage,
                            randomPeopleX: randomPeopleX,
                            randomPeopleY: randomPeopleY
                        };
                    }
                    try {
                        switch (i) {
                            case 0:
                                ctx.drawImage(IS.sleepAmount[number][i].choosenImage.image, 32 * IS.sleepAmount[number][i].randomPeopleX, 32 * IS.sleepAmount[number][i].randomPeopleY, 32, 32, x + 32, y + 32, 32, 32);
                                break;
                            case 1:
                                ctx.drawImage(IS.sleepAmount[number][i].choosenImage.image, 32 * IS.sleepAmount[number][i].randomPeopleX, 32 * IS.sleepAmount[number][i].randomPeopleY, 32, 32, x - 32, y + 32, 32, 32);
                                break;
                            case 2:
                                ctx.drawImage(IS.sleepAmount[number][i].choosenImage.image, 32 * IS.sleepAmount[number][i].randomPeopleX, 32 * IS.sleepAmount[number][i].randomPeopleY, 32, 32, x + 32, y - 32, 32, 32);
                                break;
                            case 3:
                                ctx.drawImage(IS.sleepAmount[number][i].choosenImage.image, 32 * IS.sleepAmount[number][i].randomPeopleX, 32 * IS.sleepAmount[number][i].randomPeopleY, 32, 32, x - 32, y - 32, 32, 32);
                                break;
                            default:
                                ctx.drawImage(IS.sleepAmount[number][i].choosenImage.image, 32 * IS.sleepAmount[number][i].randomPeopleX, 32 * IS.sleepAmount[number][i].randomPeopleY, 32, 32, x + 32, y + 32, 32, 32);
                                break;
                        }
                    } catch (e) {
                        if (e) {
                            //nothing
                        }
                    }
                }

                if (!IS.beer[number]) {
                    //creating where the beer should be and stock their pos
                    IS.beer[number] = {
                        beerAmount: Math.floor(Math.random() * 16), //there is 20 tiles free but some needs to be empty
                        beerPos: []
                    };
                    var pos = [
                        [-64, -64],
                        [-64, -32],
                        [-64, 0],
                        [-64, 32],
                        [-64, 64],

                        [-32, -64],
                        [-32, 0],
                        [-32, 64],

                        [0, -64],
                        [0, -32],
                        [0, 32],
                        [0, 64],

                        [32, -64],
                        [32, 0],
                        [32, 64],

                        [64, -64],
                        [64, -32],
                        [64, 0],
                        [64, 32],
                        [64, 64]
                    ];
                    for (var b = 0; b <= IS.beer[number].beerAmount; b++) {
                        const index = Math.floor(Math.random() * pos.length);
                        pos.slice(index, 1);
                        IS.beer[number].beerPos.push({
                            x: pos[index][0],
                            y: pos[index][1],
                            randomX: Math.floor(Math.random() * 7) + 1,
                            randomY: Math.floor(Math.random() * 2) + 2
                        });
                    }
                }
                for (var p = 0; p <= IS.beer[number].beerAmount; p++) {
                    const thisBeer = IS.beer[number].beerPos[p];
                    ctx.drawImage(img.map.Inside_C.image, thisBeer.randomX * 32, thisBeer.randomY * 32, 32, 32, x + thisBeer.x, y + thisBeer.y, 32, 32);
                }

                IS.bubble.bubbleCountFrame++;
                //setting an object to display on every character
                if (!IS.bubble.choosen[number]) {
                    IS.bubble.choosen[number] = {
                        current: 0
                    };
                }
                //getting coordinate depending of the current people, x first then y
                const c = [
                        [32, 0],
                        [-32, -64],
                        [32, -64],
                        [-32, 0]
                    ],
                    cu = IS.bubble.choosen[number].current;
                //bubble
                if (IS.bubble.bubbleCountFrame <= 40) {
                    ctx.drawImage(img.balloon.image, 0, 9 * 32, 32, 32, x + c[cu][0], y + c[cu][1], 32, 32);
                } else if (IS.bubble.bubbleCountFrame <= 80) {
                    ctx.drawImage(img.balloon.image, 1 * 32, 9 * 32, 32, 32, x + c[cu][0], y + c[cu][1], 32, 32);
                } else if (IS.bubble.bubbleCountFrame <= 120) {
                    ctx.drawImage(img.balloon.image, 2 * 32, 9 * 32, 32, 32, x + c[cu][0], y + c[cu][1], 32, 32);
                } else if (IS.bubble.bubbleCountFrame <= 160) {
                    ctx.drawImage(img.balloon.image, 3 * 32, 9 * 32, 32, 32, x + c[cu][0], y + c[cu][1], 32, 32);
                } else if (IS.bubble.bubbleCountFrame <= 200) {
                    ctx.drawImage(img.balloon.image, 4 * 32, 9 * 32, 32, 32, x + c[cu][0], y + c[cu][1], 32, 32);
                } else if (IS.bubble.bubbleCountFrame <= 240) {
                    ctx.drawImage(img.balloon.image, 5 * 32, 9 * 32, 32, 32, x + c[cu][0], y + c[cu][1], 32, 32);
                } else if (IS.bubble.bubbleCountFrame <= 280) {
                    ctx.drawImage(img.balloon.image, 6 * 32, 9 * 32, 32, 32, x + c[cu][0], y + c[cu][1], 32, 32);
                } else if (IS.bubble.bubbleCountFrame <= 320) {
                    ctx.drawImage(img.balloon.image, 7 * 32, 9 * 32, 32, 32, x + c[cu][0], y + c[cu][1], 32, 32);
                } else if (IS.bubble.bubbleCountFrame >= 400) {
                    IS.bubble.bubbleCountFrame = 0;
                    //choosing the next character using a pseudo random method
                    IS.bubble.choosen[number].current = Math.floor(Math.random() * 4);
                }
            }

            drunkPeople(85 * w / 100, 20 * h / 100, 0);
            drunkPeople(55 * w / 100, 28 * h / 100, 1);
            drunkPeople(78 * w / 100, 42 * h / 100, 2);

            //running people part
            //on the road so don't need a lot of coordinate calculation
            const guardData = IS.guard;

            //draw shadow
            s(w / 2, (line - 7) * 32);
            guardData.guardCountFrame++;
            //* guard looking animation
            if (guardData.guardCountFrame <= 400) {
                gf();
            } else if (guardData.guardCountFrame <= 600) {
                if (guardData.interrogation === false && guardData.interrogationDone === false && guardData.interrogationDoneCount < 3) guardData.interrogation = true;
                gl();
            } else if (guardData.guardCountFrame <= 700) {
                gf();
            } else if (guardData.guardCountFrame <= 850) {
                gr();
            } else if (guardData.guardCountFrame <= 1000) {
                if (guardData.exclamation === false && guardData.exclamationDone === false && guardData.exclamationDoneCount < 3) guardData.exclamation = true;
                gl();
            } else if (guardData.guardCountFrame <= 1150) {
                gf();
            } else if (guardData.guardCountFrame <= 1500) {
                if (guardData.silent === false && guardData.silentDone === false && guardData.silentDoneCount < 1) guardData.silent = true;
                gr();
            } else {
                gf();
                if (guardData.guardCountFrame >= 2400) {
                    guardData.guardCountFrame = 0;
                    guardData.exclamation = false;
                    guardData.exclamationDone = false;
                    guardData.exclamationCount = 0;
                    guardData.exclamationDoneCount = 0;
                    guardData.interrogation = false;
                    guardData.interrogationDone = false;
                    guardData.interrogationCount = 0;
                    guardData.interrogationDoneCount = 0;
                    guardData.silent = false;
                    guardData.silentDone = false;
                    guardData.silentCount = 0;
                    guardData.silentDoneCount = 0;
                    IS.running.amount = [];
                    IS.monsters.amount = [];
                }
            }

            //balloon reaction manager
            if (guardData.interrogation === true) {
                bubble(scope, w / 2, (line - 7) * 32, 1, guardData.interrogationCount);
                if (guardData.interrogationDone === false) {
                    guardData.interrogationCount = 0;
                    guardData.interrogationDone = true;
                    const inter = setInterval(() => {
                        guardData.interrogationCount++;
                        if (guardData.interrogationCount >= 7) {
                            guardData.interrogation = false;
                            guardData.interrogationCount = 0;
                            guardData.interrogationDoneCount++;
                            if (guardData.interrogationDoneCount < 3) guardData.interrogationDone = false;
                            clearInterval(inter);
                        }
                    }, 150);
                }
            }
            if (guardData.exclamation === true) {
                bubble(scope, w / 2, (line - 7) * 32, 0, guardData.exclamationCount);
                if (guardData.exclamationDone === false) {
                    guardData.exclamationCount = 0;
                    guardData.exclamationDone = true;
                    const inter = setInterval(() => {
                        guardData.exclamationCount++;
                        if (guardData.exclamationCount >= 7) {
                            guardData.exclamation = false;
                            guardData.exclamationCount = 0;
                            guardData.exclamationDoneCount++;
                            if (guardData.exclamationDoneCount < 3) guardData.exclamationDone = false;
                            clearInterval(inter);
                        }
                    }, 150);
                }
            }
            if (guardData.silent === true) {
                bubble(scope, w / 2, (line - 7) * 32, 7, guardData.silentCount);
                if (guardData.silentDone === false) {
                    guardData.silentCount = 0;
                    guardData.silentDone = true;
                    const inter = setInterval(() => {
                        guardData.silentCount++;
                        if (guardData.silentCount >= 7) {
                            guardData.silent = false;
                            guardData.silentCount = 0;
                            guardData.silentDoneCount++;
                            if (guardData.silentDoneCount < 1) guardData.silentDone = false;
                            clearInterval(inter);
                        }
                    }, 500);
                }
            }


            /**
             * Draw people running on the path.
             * @param {number} x Where are they on the horizontal position.
             */
            function runningPeople(x) {
                //get three random actor running
                const runner = IS.running;
                for (var i = 0; i < 3; i++) {
                    if (!runner.amount[i]) {
                        let a = [2, 6],
                            b = [1, 4, 7, 10];
                        const choosenImage = img.people[Math.floor(Math.random() * img.people.length)],
                            randomPeopleX = b[Math.floor(b.length * Math.random())],
                            randomPeopleY = a[Math.floor(a.length * Math.random())];

                        runner.amount[i] = {
                            choosenImage: choosenImage,
                            randomPeopleX: randomPeopleX,
                            randomPeopleY: randomPeopleY
                        };
                    }
                    try {
                        switch (i) {
                            case 0:
                                s(x - 32, (line - 5.25) * 32);
                                if (30 > x % 60) {
                                    ctx.drawImage(runner.amount[i].choosenImage.image, 32 * (runner.amount[i].randomPeopleX + 1), 32 * runner.amount[i].randomPeopleY, 32, 32, x - 32, (line - 5.25) * 32, 32, 32);
                                } else {
                                    ctx.drawImage(runner.amount[i].choosenImage.image, 32 * (runner.amount[i].randomPeopleX - 1), 32 * runner.amount[i].randomPeopleY, 32, 32, x - 32, (line - 5.25) * 32, 32, 32);
                                }
                                break;
                            case 1:
                                s(x, (line - 4.25) * 32);
                                if (30 > x % 60) {
                                    ctx.drawImage(runner.amount[i].choosenImage.image, 32 * (runner.amount[i].randomPeopleX - 1), 32 * runner.amount[i].randomPeopleY, 32, 32, x, (line - 4.25) * 32, 32, 32);
                                } else {
                                    ctx.drawImage(runner.amount[i].choosenImage.image, 32 * (runner.amount[i].randomPeopleX + 1), 32 * runner.amount[i].randomPeopleY, 32, 32, x, (line - 4.25) * 32, 32, 32);
                                }
                                break;
                            case 2:
                                s(x - 64, (line - 3.25) * 32);
                                if (30 > x % 60) {
                                    ctx.drawImage(runner.amount[i].choosenImage.image, 32 * (runner.amount[i].randomPeopleX + 1), 32 * runner.amount[i].randomPeopleY, 32, 32, x - 64, (line - 3.25) * 32, 32, 32);
                                } else {
                                    ctx.drawImage(runner.amount[i].choosenImage.image, 32 * (runner.amount[i].randomPeopleX - 1), 32 * runner.amount[i].randomPeopleY, 32, 32, x - 64, (line - 3.25) * 32, 32, 32);
                                }
                                break;
                            default:
                                s(x - 64, (line - 3.25) * 32);
                                if (30 > x % 60) {
                                    ctx.drawImage(runner.amount[i].choosenImage.image, 32 * (runner.amount[i].randomPeopleX + 1), 32 * runner.amount[i].randomPeopleY, 32, 32, x - 64, (line - 3.25) * 32, 32, 32);
                                } else {
                                    ctx.drawImage(runner.amount[i].choosenImage.image, 32 * (runner.amount[i].randomPeopleX - 1), 32 * runner.amount[i].randomPeopleY, 32, 32, x - 64, (line - 3.25) * 32, 32, 32);
                                }
                                break;
                        }
                    } catch (e) {
                        if (e) {
                            //nothing
                        }
                    }
                }
            }

            if (guardData.guardCountFrame >= 400 && guardData.guardCountFrame <= 1100) {
                runningPeople(((guardData.guardCountFrame - 400) / 500) * w);
            }

            /**
             * Draw monster running on the path.
             * @param {number} x Where are they on the horizontal position.
             */
            function runningMonster(x) {
                //get three random actor running
                const runner = IS.monsters;
                for (var i = 0; i < 5; i++) {
                    if (!runner.amount[i]) {
                        let a = [2, 6],
                            b = [1, 4, 7, 10];
                        const choosenImage = img.monster[Math.floor(Math.random() * img.monster.length)],
                            randomPeopleX = b[Math.floor(b.length * Math.random())],
                            randomPeopleY = a[Math.floor(a.length * Math.random())];

                        runner.amount[i] = {
                            choosenImage: choosenImage,
                            randomPeopleX: randomPeopleX,
                            randomPeopleY: randomPeopleY
                        };
                    }
                    try {
                        switch (i) {
                            case 0:
                                s(x, (line - 5.25) * 32);
                                if (30 > x % 60) {
                                    ctx.drawImage(runner.amount[i].choosenImage.image, 32 * (runner.amount[i].randomPeopleX + 1), 32 * runner.amount[i].randomPeopleY, 32, 32, x, (line - 5.25) * 32, 32, 32);
                                } else {
                                    ctx.drawImage(runner.amount[i].choosenImage.image, 32 * (runner.amount[i].randomPeopleX - 1), 32 * runner.amount[i].randomPeopleY, 32, 32, x, (line - 5.25) * 32, 32, 32);
                                }
                                break;
                            case 1:
                                s(x - 48, (line - 4.25) * 32);
                                if (30 > x % 60) {
                                    ctx.drawImage(runner.amount[i].choosenImage.image, 32 * (runner.amount[i].randomPeopleX - 1), 32 * runner.amount[i].randomPeopleY, 32, 32, x - 48, (line - 4.25) * 32, 32, 32);
                                } else {
                                    ctx.drawImage(runner.amount[i].choosenImage.image, 32 * (runner.amount[i].randomPeopleX + 1), 32 * runner.amount[i].randomPeopleY, 32, 32, x - 48, (line - 4.25) * 32, 32, 32);
                                }
                                break;
                            case 2:
                                s(x - 16, (line - 3.25) * 32);
                                if (30 > x % 60) {
                                    ctx.drawImage(runner.amount[i].choosenImage.image, 32 * (runner.amount[i].randomPeopleX + 1), 32 * runner.amount[i].randomPeopleY, 32, 32, x - 16, (line - 3.25) * 32, 32, 32);
                                } else {
                                    ctx.drawImage(runner.amount[i].choosenImage.image, 32 * (runner.amount[i].randomPeopleX - 1), 32 * runner.amount[i].randomPeopleY, 32, 32, x - 16, (line - 3.25) * 32, 32, 32);
                                }
                                break;
                            case 3:
                                s(x - 128, (line - 5) * 32);
                                if (30 > x % 60) {
                                    ctx.drawImage(runner.amount[i].choosenImage.image, 32 * (runner.amount[i].randomPeopleX + 1), 32 * runner.amount[i].randomPeopleY, 32, 32, x - 128, (line - 5) * 32, 32, 32);
                                } else {
                                    ctx.drawImage(runner.amount[i].choosenImage.image, 32 * (runner.amount[i].randomPeopleX - 1), 32 * runner.amount[i].randomPeopleY, 32, 32, x - 128, (line - 5) * 32, 32, 32);
                                }
                                break;
                            default:
                                s(x - 80, (line - 3.5) * 32);
                                if (30 > x % 60) {
                                    ctx.drawImage(runner.amount[i].choosenImage.image, 32 * (runner.amount[i].randomPeopleX + 1), 32 * runner.amount[i].randomPeopleY, 32, 32, x - 80, (line - 3.5) * 32, 32, 32);
                                } else {
                                    ctx.drawImage(runner.amount[i].choosenImage.image, 32 * (runner.amount[i].randomPeopleX - 1), 32 * runner.amount[i].randomPeopleY, 32, 32, x - 80, (line - 3.5) * 32, 32, 32);
                                }
                                break;
                        }
                    } catch (e) {
                        if (e) {
                            //nothing
                        }
                    }
                }
            }
            if (guardData.guardCountFrame >= 700 && guardData.guardCountFrame <= 1400) {
                runningMonster(((guardData.guardCountFrame - 800) / 500) * w);
            }

            //people training part

            /**
             * Create training people.
             * @param {number} x Horizontal coordinate.
             * @param {number} y Vertival coordinate.
             * @param {number} number Number of time function has been used.
             */
            function trainingPeople(x, y, number) {
                const training = IS.training;
                if (!training.amount[number]) {
                    let a = [1, 4, 7, 10],
                        b = [3, 7];
                    const choosenImage = img.people[Math.floor(Math.random() * img.people.length)],
                        randomPeopleX = a[Math.floor(a.length * Math.random())],
                        randomPeopleY = b[Math.floor(b.length * Math.random())];

                    training.amount[number] = {
                        choosenImage: choosenImage,
                        randomPeopleX: randomPeopleX,
                        randomPeopleY: randomPeopleY,
                        frame: 0
                    };
                }
                training.amount[number].frame++;
                const that = training.amount[number];
                that.frame++;
                ctx.drawImage(that.choosenImage.image, that.randomPeopleX * 32, that.randomPeopleY * 32, 32, 32, x, y, 32, 32);

                ctx.drawImage(img.spell.image, img.spell.image.width / img.spell.w, img.spell.image.height / img.spell.h, img.spell.w, img.spell.h, x, y + 3 * 32, 40, 40);
            }

            trainingPeople(10 * w / 100, 40 * h / 100, 0);
            trainingPeople(15 * w / 100, 40 * h / 100, 1);


            ctx.fillStyle = "#010b4a";
            if (IS.fade <= 0.6) {
                ctx.fillRect(0, 0, w, h);
            } else {
                ctx.globalAlpha = 0.6;
                ctx.fillRect(0, 0, w, h);
            }

            ctx.globalAlpha = 1;
            playerAFK();
        };

        // Fired via the global update method.
        // Mutates state as needed for proper rendering next state
        idle.update = function menuUpdate() {
            if (scope.constants.welcome === true ||
                scope.constants.intro === true ||
                scope.constants.loadingGame === true ||
                scope.constants.loadingMap === true ||
                scope.constants.transition.transition === true ||
                scope.constants.paused === true) {
                return;
            } else {
                //check if the game is on idle or not
                if (!scope.constants.idle.lastIdleCheck) scope.constants.idle.lastIdleCheck = Date.now();

                const timeIdleMax = scope.constants.idle.idleTimeMax;
                var timeIdle = scope.constants.idle.idleTime,
                    lastIdleCheck = scope.constants.idle.lastIdleCheck;


                //update idle time
                timeIdle = Date.now() - lastIdleCheck;
                if (timeIdle >= timeIdleMax && scope.constants.idle.isIdle === false) {
                    scope.constants.idle.isIdle = true;
                    console.log("Setting afk mod on ON.");
                    if (IS.justSpawned === false) {
                        IS.fade = 0;
                        IS.countFrame = 0;
                        IS.justSpawned = true;
                        IS.fading = false;
                    }
                }
                document.onkeydown = function(ev) {
                    //the game got an event, it's not on idle
                    if (ev) {
                        timeIdle = 0;
                        scope.constants.idle.lastIdleCheck = Date.now();
                        if (scope.constants.idle.isIdle === true) {
                            scope.constants.idle.isIdle = false;
                            console.log("Player is back, setting afk mod on OFF");
                            IS = initialState;
                        }
                    }
                };
            }
        };
        return idle;
    }
}