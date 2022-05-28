/**
 * @param {number} level
 * @returns {number}
 */
function pvFct(level) {
    const result = parseInt(level) * 50 + 50;
    return result;
}
/**
 * @param {number} level
 * @returns {number}
 */
function manaFct(level) {
    const result = parseInt(level) * 20 + 20;
    return result;
}
/**
 * @param {number} level
 * @returns {number}
 */
function xpFct(level) {
    const result = parseInt(level) * 60 + 60;
    return result;
}
/** pause Module
 * Main pause entity module.
 * @param {import("../../game").scope} scope
 */

class Pause {
    /** pause Module
     * Main pause entity module.
     * @param {import("../../game").scope} scope
     */
    constructor(scope) {
        // Setup globals
        var pause = this;
        const container = document.getElementById("container");

        /**
         * Draw a cursor at x-20 and y-16.
         * @param {number} x 
         * @param {number} y 
         */
        function cursor(ctx, x, y) {
            ctx.drawImage(scope.cache.image.system.Window.image, 101, 24, 16, 16, x - 20, y - 16, 20, 20);
        }

        //dimension partent de haut gauche a bas droite
        var w = scope.constants.width, // largeur
            h = scope.constants.height; // hauteur


        // Create the initial state
        pause.state = {
            position: {
                x: 0,
                y: 0
            },
            data: {
                focused: {
                    /**@type {1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9} */
                    main: 4,
                    inmain: true,
                    insub: false
                },
                subMenu: {
                    quest: {
                        active: true,
                        inactive: false,
                        subactive: scope.state.global.quest.active,
                        solved: false,
                        insolved: false,
                        subsolved: scope.state.global.quest.solved,
                        failed: false,
                        infailed: false,
                        subfailed: scope.state.global.quest.failed
                    },
                    party: {
                        varHeigth: 0,
                        lookup: false
                    },
                    equipement: {

                    },
                    skill: {

                    },
                    help: {
                        scroll: 0
                    },
                    load: {

                    },
                    save: {

                    },
                    exit: {

                    }
                },
                rectAnimation: {
                    speed: 8,
                    h: 0,
                    oldH: 0,
                    w: 0,
                    oldW: 0
                }
            },
            reseted: false
        };


        // Draw the menu on the canvas
        pause.render = function menuRender(data) {
            w = scope.constants.width; // largeur
            h = scope.constants.height; // hauteur
            const focus = pause.state.data.focused,
                subMenu = pause.state.data.subMenu,
                gglobal = scope.state.global,
                ra = pause.state.data.rectAnimation,
                quarter = Math.round(w / 4),
                third = Math.round(w / 3),
                init = JSON.parse(JSON.stringify(pause.state.data)),
                phone = (w < 1000) ? true : false;

            if (scope.menu.paused === true) {
                //set up some constant
                const ctx = scope.context,
                    lineThickness = ctx.lineWidth,
                    preTextAlign = ctx.textAlign;

                //background
                ctx.fillStyle = '#8cf598';
                ctx.globalAlpha = 0.6;
                ctx.fillRect(
                    pause.state.position.x,
                    pause.state.position.y,
                    w,
                    h
                );
                ctx.globalAlpha = 1;

                ctx.lineWidth = 11;
                ctx.fillStyle = "#000";
                ctx.strokeRect(
                    pause.state.position.x + 5,
                    pause.state.position.y + 5,
                    w - 10,
                    h - 10
                );
                ctx.strokeRect(
                    pause.state.position.x + 5,
                    pause.state.position.y + 5,
                    quarter - 5,
                    h - 10
                );

                ctx.lineWidth = lineThickness;
                ctx.fillStyle = '#fff';

                const player = scope.state.global.player,
                    level = player.level,
                    def = player.def,
                    atk = player.atk,
                    agility = player.agility,
                    perception = player.perception,
                    int = player.int,
                    luck = player.luck,
                    gold = scope.state.global.inv.gold,
                    xp = player.xp,
                    xpMax = xpFct(level),
                    pvMax = pvFct(level),
                    pv = player.pv,
                    manaMax = manaFct(level),
                    mana = player.mana;

                if (focus.main === 1) { // resume
                    //nothing, maybe show some stats?
                    ctx.fillStyle = '#fff';
                    ctx.textAlign = "center";
                    ctx.font = '24px Azure';
                } else if (focus.main === 2) { // quest
                    ctx.fillStyle = '#fff';
                    ctx.textAlign = "center";
                    ctx.font = '24px Azure';
                    const quest = subMenu.quest;
                    if (quest.subactive.main.length > 0 || quest.subactive.secondary.length > 0 ||
                        quest.subfailed.main.length > 0 | quest.subfailed.secondary.length > 0 ||
                        quest.subsolved.main.length > 0 || quest.subsolved.secondary.length > 0
                    ) {
                        // TODO add quest once quest module has been done 
                    } else {
                        ctx.fillText("You don't have quest right now.", (5 * quarter) / 2 + 20, 40 * h / 100, 3 * quarter - 40);
                        ctx.fillText("Check back later.", (5 * quarter) / 2 + 20, 60 * h / 100, 3 * quarter - 40);
                    }
                } else if (focus.main === 3) { // equipement
                    ctx.fillStyle = '#fff';
                    ctx.textAlign = "center";
                    ctx.font = '24px Azure';
                    // party equipement is part of the party members.
                } else if (focus.main === 4) { // party
                    const playerParty = {
                        level: level,
                        def: def,
                        atk: atk,
                        agility: agility,
                        perception: perception,
                        int: int,
                        luck: luck,
                        xp: xp,
                        pv: pv,
                        mana: mana,
                        username: gglobal.player.username,
                        face: {
                            image: gglobal.face.playerImage,
                            line: gglobal.face.playerLine,
                            row: gglobal.face.playerRow
                        }
                    };
                    const party = [playerParty].concat(gglobal.party),
                        varHeigth = subMenu.party.varHeigth - 0; //substract to go down, add to go up
                    if (subMenu.party.lookup === true) {
                        //show advanced member stat
                        const thisMember = (party[varHeigth / 175].username) ? party[varHeigth / 175] : party[varHeigth / 175].pause;

                        frameRectangle(scope, quarter + 30, 35, 96, 96, scope.cache.image.faces[thisMember.face.image].image, thisMember.face.line * 96, thisMember.face.row * 96, 96, 96);

                        ctx.fillStyle = '#fff';
                        ctx.textAlign = "left";
                        ctx.font = 'bold 20px Azure';
                        ctx.fillText(`${thisMember.username} | Level : ${thisMember.level}`, quarter + 136, 55 - varHeigth, quarter * 2);

                        //level bar
                        ctx.font = '16px Azure';
                        ctx.fillStyle = "#eb7a34";
                        roundRect(ctx, quarter + 136, 65 - varHeigth, (thisMember.xp / xpFct(thisMember.level)) * 200, 10, 5, true, false);
                        ctx.fillStyle = "#fff";
                        roundRect(ctx, quarter + 136, 65 - varHeigth, 200, 10, 5, false, true);
                        //level bar text
                        ctx.fillText(`${thisMember.xp} / ${xpFct(thisMember.level)} : XP`, quarter + 346, 75 - varHeigth);

                        //health bar
                        if (thisMember.pv <= pvFct(thisMember.level) / 10) {
                            //red
                            ctx.fillStyle = 'rgb(255,0,0)';
                        } else if (thisMember.pv <= pvFct(thisMember.level) / 4) {
                            //orange
                            ctx.fillStyle = "#FF7502";
                        } else if (thisMember.pv <= pvFct(thisMember.level) / 2) {
                            //yellow
                            ctx.fillStyle = "#FFD002";
                        } else if (thisMember.pv > pvFct(thisMember.level) / 2) {
                            //green
                            ctx.fillStyle = "#00C308";
                        }
                        //hp bar text
                        roundRect(ctx, quarter + 136, 85 - varHeigth, (thisMember.pv / pvFct(thisMember.level)) * 200, 10, 5, true, false);
                        ctx.fillStyle = "#fff";
                        roundRect(ctx, quarter + 136, 85 - varHeigth, 200, 10, 5, false, true);

                        ctx.textAlign = 'left';
                        ctx.fillText(`${thisMember.pv} / ${pvFct(thisMember.level)} : Health`, quarter + 346, 95 - varHeigth);

                        //mana bar
                        //blue
                        ctx.fillStyle = "#02B4FF";
                        roundRect(ctx, quarter + 136, 105 - varHeigth, (thisMember.mana / manaFct(thisMember.level)) * 200, 10, 5, true, false);
                        ctx.fillStyle = "#fff";
                        roundRect(ctx, quarter + 136, 105 - varHeigth, 200, 10, 5, false, true);
                        //mana bar text
                        ctx.fillText(`${thisMember.mana} / ${manaFct(thisMember.level)} : Mana`, quarter + 346, 115 - varHeigth);

                        //display stats
                        const widthRatio = (3 * quarter - 80) / 3;
                        ctx.fillText(`Attack: ${thisMember.atk}`, quarter + 40, 156 - varHeigth);
                        ctx.fillText(`Defense: ${thisMember.def}`, quarter + 40 + widthRatio, 156 - varHeigth);
                        ctx.fillText(`Agility: ${thisMember.agility}`, quarter + 40 + widthRatio * 2, 156 - varHeigth);
                        ctx.fillText(`Luck: ${thisMember.luck}`, quarter + 40, 176 - varHeigth);
                        ctx.fillText(`Knowledge: ${thisMember.int}`, quarter + 40 + widthRatio, 176 - varHeigth);
                        ctx.fillText(`Perception: ${thisMember.perception}`, quarter + 40 + widthRatio * 2, 176 - varHeigth);

                        //equipement
                    } else {

                        for (var member in party) {
                            if (party[member].username || party[member].pause.username) {
                                let trueParty = party[member];
                                // doing trueparty because there is the player and the member, who can have different object form in the futuer
                                if (trueParty.pause) trueParty = party[member].pause;
                                ctx.fillStyle = '#fff';
                                ctx.textAlign = "left";
                                ctx.font = 'bold 20px Azure';

                                //member is a string number, like "1" or "2" etc
                                //always the player is displayed first, meaning member = 0 === player .
                                frameRectangleTrans(scope, quarter + 20, 25 + 175 * member - varHeigth, quarter * 3 - 45, 170);
                                //making the frame with a whiter background
                                if (focus.insub === true && Math.floor(varHeigth / 175) === parseInt(member)) {
                                    frameRectangleTrans(scope, quarter + 20, 25 + 175 * member - varHeigth, quarter * 3 - 45, 170);
                                    frameRectangleTrans(scope, quarter + 20, 25 + 175 * member - varHeigth, quarter * 3 - 45, 170);
                                }
                                //draw the face of the character
                                frameRectangle(scope, quarter + 30, 35 + 175 * member - varHeigth, 96, 96, scope.cache.image.faces[trueParty.face.image].image, trueParty.face.line * 96, trueParty.face.row * 96, 96, 96);

                                ctx.fillText(`${trueParty.username} | Level : ${trueParty.level}`, quarter + 136, 55 + 175 * member - varHeigth, quarter * 2);

                                //level bar
                                ctx.font = '16px Azure';
                                ctx.fillStyle = "#eb7a34";
                                roundRect(ctx, quarter + 136, 65 + 175 * member - varHeigth, (trueParty.xp / xpFct(trueParty.level)) * 200, 10, 5, true, false);
                                ctx.fillStyle = "#fff";
                                roundRect(ctx, quarter + 136, 65 + 175 * member - varHeigth, 200, 10, 5, false, true);
                                //level bar text
                                ctx.fillText(`${trueParty.xp} / ${xpFct(trueParty.level)} : XP`, quarter + 346, 75 + 175 * member - varHeigth);

                                //health bar
                                if (trueParty.pv <= pvFct(trueParty.level) / 10) {
                                    //red
                                    ctx.fillStyle = 'rgb(255,0,0)';
                                } else if (trueParty.pv <= pvFct(trueParty.level) / 4) {
                                    //orange
                                    ctx.fillStyle = "#FF7502";
                                } else if (trueParty.pv <= pvFct(trueParty.level) / 2) {
                                    //yellow
                                    ctx.fillStyle = "#FFD002";
                                } else if (trueParty.pv > pvFct(trueParty.level) / 2) {
                                    //green
                                    ctx.fillStyle = "#00C308";
                                }
                                //hp bar text
                                roundRect(ctx, quarter + 136, 85 + 175 * member - varHeigth, (trueParty.pv / pvFct(trueParty.level)) * 200, 10, 5, true, false);
                                ctx.fillStyle = "#fff";
                                roundRect(ctx, quarter + 136, 85 + 175 * member - varHeigth, 200, 10, 5, false, true);

                                ctx.textAlign = 'left';
                                ctx.fillText(`${trueParty.pv} / ${pvFct(trueParty.level)} : Health`, quarter + 346, 95 + 175 * member - varHeigth);

                                //mana bar
                                //blue
                                ctx.fillStyle = "#02B4FF";
                                roundRect(ctx, quarter + 136, 105 + 175 * member - varHeigth, (trueParty.mana / manaFct(trueParty.level)) * 200, 10, 5, true, false);
                                ctx.fillStyle = "#fff";
                                roundRect(ctx, quarter + 136, 105 + 175 * member - varHeigth, 200, 10, 5, false, true);
                                //mana bar text
                                ctx.fillText(`${trueParty.mana} / ${manaFct(trueParty.level)} : Mana`, quarter + 346, 115 + 175 * member - varHeigth);

                                //display stats
                                const widthRatio = (3 * quarter - 80) / 3;
                                ctx.fillText(`Attack: ${trueParty.atk}`, quarter + 40, 156 + 175 * member - varHeigth);
                                ctx.fillText(`Defense: ${trueParty.def}`, quarter + 40 + widthRatio, 156 + 175 * member - varHeigth);
                                ctx.fillText(`Agility: ${trueParty.agility}`, quarter + 40 + widthRatio * 2, 156 + 175 * member - varHeigth);
                                ctx.fillText(`Luck: ${trueParty.luck}`, quarter + 40, 176 + 175 * member - varHeigth);
                                ctx.fillText(`Knowledge: ${trueParty.int}`, quarter + 40 + widthRatio, 176 + 175 * member - varHeigth);
                                ctx.fillText(`Perception: ${trueParty.perception}`, quarter + 40 + widthRatio * 2, 176 + 175 * member - varHeigth);
                            }
                        }
                    }
                } else if (focus.main === 5) { // skill
                    ctx.fillStyle = '#fff';
                    ctx.textAlign = "center";
                    ctx.font = '24px Azure';
                } else if (focus.main === 6) { // help
                    ctx.fillStyle = '#fff';
                    ctx.textAlign = "center";
                    ctx.font = '24px Azure';
                } else if (focus.main === 7) { // load
                    ctx.fillStyle = '#fff';
                    ctx.textAlign = "center";
                    ctx.font = '24px Azure';
                } else if (focus.main === 8) { // save
                    ctx.fillStyle = '#fff';
                    ctx.textAlign = "center";
                    ctx.font = '24px Azure';
                } else if (focus.main === 9) { // exit
                    ctx.fillStyle = '#fff';
                    ctx.textAlign = "center";
                    ctx.font = '24px Azure';
                    ctx.fillText("Are you sure you want", (5 * quarter) / 2 + 20, 40 * h / 100, 3 * quarter - 40);
                    ctx.fillText("to return to the main menu?", (5 * quarter) / 2 + 20, 60 * h / 100, 3 * quarter - 40);
                }
                ctx.textAlign = "left";
                ctx.font = '40px Azure';
                ctx.fillStyle = '#fff';
                ctx.fillText("Pause", (2.5 * w / 100), h / 10, quarter);
                underline(ctx, "Pause", (2.5 * w / 100), h / 10, ctx.fillStyle, "40px", ctx.textAlign);
                ctx.textAlign = preTextAlign;
                var menuRatio = Math.floor((8 * h / 10 - 70) / 9);
                if (menuRatio > 50) menuRatio = 50;

                //cursor that show which one are we choising
                ctx.fillStyle = "#59BAE9";
                cursor(ctx, 5 * w / 100, h / 10 + 28 + menuRatio * focus.main);

                ctx.fillStyle = "#fff";
                ctx.textAlign = "left";
                ctx.font = "24px Azure";

                ctx.fillText("Resume", 5 * w / 100, h / 10 + 30 + menuRatio * 1, quarter);
                ctx.fillText("Quest", 5 * w / 100, h / 10 + 30 + menuRatio * 2, quarter);
                ctx.fillText("Bag", 5 * w / 100, h / 10 + 30 + menuRatio * 3, quarter);
                ctx.fillText("Party", 5 * w / 100, h / 10 + 30 + menuRatio * 4, quarter);
                ctx.fillText("Skill", 5 * w / 100, h / 10 + 30 + menuRatio * 5, quarter);
                ctx.fillText("Help", 5 * w / 100, h / 10 + 30 + menuRatio * 6, quarter);
                ctx.fillText("Load", 5 * w / 100, h / 10 + 30 + menuRatio * 7, quarter);
                ctx.fillText("Save", 5 * w / 100, h / 10 + 30 + menuRatio * 8, quarter);
                ctx.fillText("Title", 5 * w / 100, h / 10 + 30 + menuRatio * 9, quarter);

                //show the amount of gold owned
                frameRectangleTrans(scope, 18, h - 72, quarter - 30, 52);
                ctx.textAlign = "center";
                ctx.shadowColor = "black";
                ctx.shadowBlur = 7;
                ctx.lineWidth = 5;
                ctx.strokeText(`Gold: ${gold}`, quarter / 2, h - 35, quarter - 66);
                ctx.shadowBlur = 0;
                var gradient = ctx.createLinearGradient(18, h - 62, quarter - 30, 52);
                gradient.addColorStop(0, "rgb(252, 252, 0)");
                gradient.addColorStop(1, "rgb(184, 111, 2)");
                ctx.fillStyle = gradient;
                ctx.fillText(`Gold: ${gold}`, quarter / 2, h - 35, quarter - 66);
                ctx.fillStyle = "white";

                ctx.lineWidth = 11;
                ctx.fillStyle = "#000";
                ctx.strokeRect(
                    pause.state.position.x + 5,
                    pause.state.position.y + 5,
                    w - 10,
                    h - 10
                );
                ctx.strokeRect(
                    pause.state.position.x + 5,
                    pause.state.position.y + 5,
                    quarter - 5,
                    h - 10
                );

                ctx.lineWidth = lineThickness;
            }
        };

        // Fired via the global update method.
        // Mutates state as needed for proper rendering next state
        pause.update = function menuUpdate() {
            w = scope.constants.width; // largeur
            h = scope.constants.height; // hauteur
            const focus = pause.state.data.focused,
                subMenu = pause.state.data.subMenu,
                gglobal = scope.state.global,
                ra = pause.state.data.rectAnimation,
                quarter = Math.round(w / 4),
                third = Math.round(w / 3),
                init = JSON.parse(JSON.stringify(pause.state.data)),
                phone = (w < 1000) ? true : false,
                kb = scope.settings.config.keyBoard;
            // Check if keys are pressed, if so, update the menus position.
            // Set up `onkeyup` event handler.
            document.documentElement.onkeyup = function(ev) {
                if (scope.menu.paused === false || scope.constants.idle.isIdle === true) return;
                if (kb.down.includes(ev.key)) {
                    if (focus.inmain === true && focus.main > 0 && focus.main < 9) {
                        focus.main++;
                    } else if (focus.insub === true) {
                        if (focus.main === 4) {
                            if (Math.ceil(h / 175) > 1) {
                                subMenu.party.varHeigth += 175; //makes the party members go up
                                if (subMenu.party.varHeigth / 175 + 1 > scope.state.global.party.length) subMenu.party.varHeigth = scope.state.global.party.length * 175;
                            }
                        }
                    }
                } else if (kb.up.includes(ev.key)) {
                    if (focus.inmain === true && focus.main > 1 && focus.main < 10) {
                        focus.main--;
                    } else if (focus.insub === true) {
                        if (focus.main === 4) {
                            if (Math.ceil(h / 175) > 1) {
                                subMenu.party.varHeigth -= 175; //makes the party members go down
                                if (subMenu.party.varHeigth < 0) subMenu.party.varHeigth = 0;
                            }
                        }
                    }
                } else if (kb.interaction.includes(ev.key)) {
                    if (focus.inmain === true) {
                        if (focus.main === 1) {
                            pause.state.data = init;
                            scope.menu.paused = false;
                        } else if (focus.main === 2) {
                            focus.inmain = false;
                            focus.insub = true;
                        } else if (focus.main === 3) {
                            focus.inmain = false;
                            focus.insub = true;
                        } else if (focus.main === 4) {
                            focus.inmain = false;
                            focus.insub = true;
                        } else if (focus.main === 5) {
                            focus.inmain = false;
                            focus.insub = true;
                        } else if (focus.main === 6) {
                            focus.inmain = false;
                            focus.insub = true;
                        } else if (focus.main === 7) {
                            focus.inmain = false;
                            focus.insub = true;
                        } else if (focus.main === 8) {
                            focus.inmain = false;
                            focus.insub = true;
                        } else if (focus.main === 9) {
                            scope.menu.welcome = true;
                            scope.menu.paused = false;
                            pause.state.data = init;
                            transition(100, scope);
                        }
                    } else if (focus.insub === true) {
                        if (focus.main === 2) {

                        } else if (focus.main === 3) {

                        } else if (focus.main === 4) {
                            subMenu.party.lookup = true;
                        } else if (focus.main === 5) {

                        } else if (focus.main === 6) {

                        } else if (focus.main === 7) {

                        } else if (focus.main === 8) {

                        } else if (focus.main === 9) {

                        }
                    }

                } else if (kb.back.includes(ev.key)) {
                    if (subMenu.party.lookup === true) {
                        if (focus.main === 2) {

                        } else if (focus.main === 3) {

                        } else if (focus.main === 4) {
                            subMenu.party.lookup = false;
                        } else if (focus.main === 5) {

                        } else if (focus.main === 6) {

                        } else if (focus.main === 7) {

                        } else if (focus.main === 8) {

                        } else if (focus.main === 9) {

                        }
                    } else if (focus.insub === true) {
                        if (focus.main === 2) {
                            focus.inmain = true;
                            focus.insub = false;
                        } else if (focus.main === 3) {
                            focus.inmain = true;
                            focus.insub = false;
                        } else if (focus.main === 4) {
                            focus.inmain = true;
                            focus.insub = false;
                        } else if (focus.main === 5) {
                            focus.inmain = true;
                            focus.insub = false;
                        } else if (focus.main === 6) {
                            focus.inmain = true;
                            focus.insub = false;
                        } else if (focus.main === 7) {
                            focus.inmain = true;
                            focus.insub = false;
                        } else if (focus.main === 8) {
                            focus.inmain = true;
                            focus.insub = false;
                        }
                    }
                } else if (kb.pause.includes(ev.key) || kb.back.includes(ev.key)) {
                    setTimeout(() => {
                        pause.state.data = init;
                        scope.menu.paused = false;
                    }, 1);
                }
            };
        };

        return pause;
    }
}