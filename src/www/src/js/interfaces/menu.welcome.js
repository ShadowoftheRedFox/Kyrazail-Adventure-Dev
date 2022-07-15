class Welcome {
    /** welcome Module
     * Main welcome entity module.
     * @param {scope} scope
     */
    constructor(scope) {
        // Setup globals
        var welcome = this;

        var w = scope.constants.width, // largeur
            h = scope.constants.height; // hauteur

        const ctx = scope.context, //canvas
            //if it's writing from left to right, right to left, centered etc
            defaultTextAlign = ctx.textAlign,
            //the thickness of line, for stroke form
            defaultLineThickness = ctx.lineWidth,
            //when you write text, the heigth given is the line. you can write above, under, in the middle etc
            defaultBaseLine = ctx.textBaseline;

        /**
         * Draw a cursor at x-20 and y-16.
         * @param {number} x 
         * @param {number} y 
         */
        function cursor(ctx, x, y) {
            ctx.drawImage(scope.cache.image.system.Window.image, 101, 24, 16, 16, x - 20, y - 16, 20, 20);
        }

        // Create the initial state
        welcome.state = {
            position: {
                x: 0,
                y: 0
            },
            data: {
                focused: {
                    newGame: true,
                    newGameSure: false,
                    load: false,
                    subLoad: false,
                    loadSure: false,
                    settings: false,
                    subSettings: false,
                    subsubSettings: false, //this is epic
                    quitGame: false
                },
                subMenu: {
                    newGameSure: {
                        yes: false,
                        no: true
                    },
                    load: {
                        clickedLoadFile: false,
                        loadFile: false,
                        loadThisFileYes: false,
                        loadThisFileNo: true
                    },
                    settings: {
                        General: true,
                        Audio: false,
                        Image: false,
                        Inputs: false,
                        subGeneral: {
                            language: true,
                            alwaysRun: false,
                            fps: false
                        },
                        subAudio: {
                            main: true,
                            background: false
                        },
                        subImage: {
                            quality: true, //? keep it?
                            red: false,
                            blue: false,
                            yellow: false
                        },
                        subInputs: {
                            //TODO
                        }
                    }
                },
                rectAnimation: {
                    h: 0,
                    oldH: 0,
                    speed: 8,
                    w: w / 1.7 - 87,
                    oldW: w / 1.7 - 87
                },
                countUp: 100,
                spawnTransition: true
            },
            saves: {
                err: "",
                files: ["saveTest_2.kyraadv", "saveTest.kyraadv"],
                filesContent: [{
                        "name": "saveTest_2"
                    },
                    {
                        "name": "saveTest"
                    }
                ],
                filesReaded: 2,
                loaded: true
            }
        };

        const data = welcome.state.data,
            Focused = data.focused,
            subMenu = data.subMenu;

        /** Function that can provide coordonate for animation of any form on welcome using animate rect space.
         * @param {boolean} [up=true] If it's up or down, true (default), if it's left or right, false
         */
        function animateRect(up) {
            //we need to move the form, so begin to draw it somewhere else
            //start from old position (this is the current position, which will be the old on after the movement)
            if (up === false) {
                //we move on the x axis
                //check if we need to move left or right
                if (data.rectAnimation.w > data.rectAnimation.oldW) {
                    //if destination width > current position, add speed, wich draw the rectangle speed px on the right
                    data.rectAnimation.oldW += data.rectAnimation.speed;
                    //check if we got farther then the final position, correct it if needed
                    if (data.rectAnimation.w < data.rectAnimation.oldW) data.rectAnimation.oldW = data.rectAnimation.w;
                } else {
                    //if destination width < current position, add speed, wich draw the rectangle speed px on the left
                    data.rectAnimation.oldW -= data.rectAnimation.speed;
                    //check if we got farther then the final position, correct it if needed
                    if (data.rectAnimation.w > data.rectAnimation.oldW) data.rectAnimation.oldW = data.rectAnimation.w;
                }
            } else {
                //we move on the y axis
                //check if we need to move up or down
                if (data.rectAnimation.h > data.rectAnimation.oldH) {
                    //if destination height > current position, add speed, wich draw the rectangle speed px under
                    data.rectAnimation.oldH += data.rectAnimation.speed;
                    //check if we got farther then the final position, correct it if needed
                    if (data.rectAnimation.h < data.rectAnimation.oldH) data.rectAnimation.oldH = data.rectAnimation.h;
                } else {
                    //if destination height < current position, add speed, wich draw the rectangle speed px upper
                    data.rectAnimation.oldH -= data.rectAnimation.speed;
                    //check if we got higher then the final position, correct it if needed
                    if (data.rectAnimation.h > data.rectAnimation.oldH) data.rectAnimation.oldH = data.rectAnimation.h;
                }
            }
        }

        // Draw the welcome on the canvas
        welcome.render = function welcomeRender() {
            w = scope.constants.width; // largeur
            h = scope.constants.height; // hauteur
            //pre setup menu
            ctx.filter = scope.constants.defaultFilter;

            //menu
            if (scope.cache.image.titles1.Landscape) {
                const img = scope.cache.image.titles1.Landscape.image;
                ctx.drawImage(img, 0, 0, img.width, img.height - 55, welcome.state.position.x, welcome.state.position.y, scope.constants.width, scope.constants.height);
            } else if (scope.constants.image.titles1.Night) {
                const img = scope.cache.image.titles1.Night.image;
                ctx.drawImage(img, 0, 0, img.width, img.height, welcome.state.position.x, welcome.state.position.y, scope.constants.width, scope.constants.height);
            } else {
                ctx.fillStyle = '#8cf598';
                //in case the image don't load correctly
                ctx.fillRect(welcome.state.position.x, welcome.state.position.y, scope.constants.width, scope.constants.height);
            }

            ctx.lineWidth = 10;
            ctx.fillStyle = "#000000";
            ctx.strokeRect(
                welcome.state.position.x + 5,
                welcome.state.position.y + 5,
                welcome.state.position.w - 8,
                scope.constants.height - 8
            );
            ctx.lineWidth = defaultLineThickness;

            //if we are not on the main menu or in a yes/no choice, enter the if
            if (Focused.subLoad === true) {
                ctx.textAlign = "center";
                ctx.font = '32px Azure';
                ctx.fillText("Load games", w / 2, h / 10);
                ctx.font = '16px Azure';

                //TODO load
                //! BUILDING: add this after the isNodeJs check, it's just to build on browser

                //if nodejs is here, that means it's an app, so try to reach the save file and look in here
                try {
                    if (scope.constants.isNodejs === true) {
                        if (welcome.state.saves.loaded === false) {
                            var loadingSave = async function loadingSaveFct() {
                                ctx.fillText("Loading your save files...", w / 2, h / 2);
                                const fs = require("fs");
                                const path = require('path');
                                //joining path of directory 
                                const directoryPath = path.join(scope.constants.savePath);
                                //passsing directoryPath and callback function
                                fs.readdir(directoryPath, function(err, files) {
                                    //handling error
                                    if (err) {
                                        welcome.state.saves.err = err;
                                    }
                                    welcome.state.saves.files = files;
                                    welcome.state.saves.loaded = true;
                                });
                            }();
                        } else if (welcome.state.saves.filesReaded < welcome.state.saves.files.length) {
                            const fs = require("fs");
                            fs.readFile(`${scope.constants.savePath}/${welcome.state.saves.files[welcome.state.saves.filesReaded]}`, 'utf8', (err, data) => {
                                const fileName = welcome.state.saves.files[welcome.state.saves.filesReaded].split(".");
                                if (fileName[fileName.length - 1] === "kyraadv") {
                                    if (err) welcome.state.saves.filesContent.push(err);
                                    else welcome.state.saves.filesContent.push(data);
                                }
                                welcome.state.saves.filesReaded++;
                            });
                        } else {
                            ctx.fillText(welcome.state.saves.files, w / 2, h / 3);
                            ctx.fillText(welcome.state.saves.err, w / 2, h / 3 + 35);
                            ctx.fillText(welcome.state.saves.filesContent.join("/|\\"), w / 2, h / 3 + 70);
                        }
                    } else {
                        if (subMenu.load.clickedLoadFile === true) {
                            subMenu.load.clickedLoadFile = false;
                            //add a input file and check it
                            const saveInputGenerated = generateLoad(document);
                            //TODO do a button, on click: 
                            let inputs = document.createElement('input');
                            inputs.type = 'file';
                            //! because the page need a user interaction before firing it
                            //_ document.onclick = () => inputs.click();

                            //? if we are in the pause menu, the user already interacted
                            inputs.click();
                            const saveReader = new FileReader();
                            inputs.onchange = _this => {
                                //file inputed
                                let files = Array.from(inputs.files);
                                const file = files[0]; //the first file inputed only
                                console.log(file);

                                //get the name and the ext of teh file
                                const fileName = _this.target.value.split('\\').pop();
                                console.log(fileName);

                                saveReader.readAsText(file, "UTF-8");
                                saveReader.onload = function(evt) {
                                    console.log(evt.target.result);
                                };
                                saveReader.onerror = function(evt) {
                                    console.log("error reading file");
                                    console.log(evt);
                                };
                            };
                        }
                    }
                } catch (e) {
                    ctx.fillText(e, w / 2, h / 3);
                    console.log(e);
                }
            } else if (Focused.subSettings === true) {
                ctx.textAlign = "center";
                ctx.font = '32px Azure';
                ctx.fillText("Settings", w / 2, h / 10);

                ctx.textAlign = "left";
                ctx.font = '16px Azure';

                if (subMenu.settings.General === true) {
                    underline(ctx, "General", 50, 2 * (h - 200) / 5, ctx.fillStyle, "16px", ctx.textAlign);

                    ctx.fillText("Language:", w / 4, 2 * (h - 200) / 5);
                } else if (subMenu.settings.Audio === true) {
                    underline(ctx, "Audio", 50, 3 * (h - 200) / 5, ctx.fillStyle, "16px", ctx.textAlign);


                } else if (subMenu.settings.Image === true) {
                    underline(ctx, "Image", 50, 4 * (h - 200) / 5, ctx.fillStyle, "16px", ctx.textAlign);


                } else if (subMenu.settings.Inputs === true) {
                    underline(ctx, "Inputs", 50, 5 * (h - 200) / 5, ctx.fillStyle, "16px", ctx.textAlign);


                }

                ctx.fillText("General", 50, 2 * (h - 200) / 5);
                ctx.fillText("Audio", 50, 3 * (h - 200) / 5);
                ctx.fillText("Image", 50, 4 * (h - 200) / 5);
                ctx.fillText("Inputs", 50, 5 * (h - 200) / 5);

                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(200, 1 * h / 10);
                ctx.lineTo(200, 9 * h / 10);
                ctx.stroke();

            } else {
                //background title
                ctx.globalAlpha = 0.6;
                roundRect(ctx, w / 2 - 590 / 2, h / 3 - 66, 590, 100, 50, true, false);
                ctx.globalAlpha = 1;

                //create the gradient of title
                var gradient = ctx.createLinearGradient(w / 2 - 200, h / 3, w / 2 + 200, h / 3);
                gradient.addColorStop(0, "#F3C126");
                gradient.addColorStop(0.5, "#6FE0E1");
                gradient.addColorStop(1, "#3C1EEE");
                ctx.fillStyle = gradient;

                //write title
                ctx.textAlign = "center";
                ctx.font = '40px Azure';
                ctx.fillText("Kyrazail Adventure", w / 2, h / 3);
                underline(ctx, "Kyrazail Adventure", w / 2, h / 3, gradient, "40px", ctx.textAlign);

                if (Focused.newGameSure === false && data.spawnTransition === false) { //for moving using mouse
                    if (MouseTrackerManager.checkOver(w / 2 - 175, Math.round(52 * h / 100) - 40, 350, 80) === true) {
                        Focused.newGame = true;
                        Focused.load = false;
                        Focused.settings = false;
                        Focused.quitGame = false;
                    } else if (MouseTrackerManager.checkOver(w / 2 - 175, Math.round(64.5 * h / 100) - 40, 350, 80) === true) {
                        Focused.load = true;
                        Focused.newGame = false;
                        Focused.settings = false;
                        Focused.quitGame = false;
                    } else if (MouseTrackerManager.checkOver(w / 2 - 175, Math.round(77 * h / 100) - 40, 350, 80) === true) {
                        Focused.settings = true;
                        Focused.newGame = false;
                        Focused.load = false;
                        Focused.quitGame = false;
                    } else if (MouseTrackerManager.checkOver(w / 2 - 175, Math.round(89.5 * h / 100) - 40, 350, 80) === true) {
                        Focused.quitGame = true;
                        Focused.newGame = false;
                        Focused.load = false;
                        Focused.settings = false;
                    }

                    if (MouseTrackerManager.checkClick(w / 2 - 175, Math.round(52 * h / 100) - 40, 350, 80) === true) {
                        Focused.newGame = false;
                        Focused.newGameSure = true;
                        MouseTrackerManager.data.click = [];
                    } else if (MouseTrackerManager.checkClick(w / 2 - 175, Math.round(64.5 * h / 100) - 40, 350, 80) === true) {
                        Focused.load = false;
                        Focused.subLoad = true;
                        MouseTrackerManager.data.click = [];
                    } else if (MouseTrackerManager.checkClick(w / 2 - 175, Math.round(77 * h / 100) - 40, 350, 80) === true) {
                        Focused.settings = false;
                        Focused.subSettings = true;
                        MouseTrackerManager.data.click = [];
                    } else if (MouseTrackerManager.checkClick(w / 2 - 175, Math.round(89.5 * h / 100) - 40, 350, 80) === true) {
                        if (scope.constants.isNodejs === true) {
                            windowClose(); //only work for app
                        } else {
                            WindowManager.closeGame(); //close the page
                        }
                    }
                }

                //round rect that show which one are we choising
                ctx.fillStyle = "#59BAE9";
                if (Focused.newGame === true) {
                    data.rectAnimation.h = 0;
                } else if (Focused.load === true) {
                    data.rectAnimation.h = Math.round(12.5 * h / 100);
                } else if (Focused.settings === true) {
                    data.rectAnimation.h = Math.round(25 * h / 100);
                } else if (Focused.quitGame === true) {
                    data.rectAnimation.h = Math.round(37.5 * h / 100);
                }
                //animate the form
                if (data.rectAnimation.h != data.rectAnimation.oldH) {
                    //using the function that edit position, so we don't need to rewrite it fully each time
                    animateRect();
                    //draw the form
                    ctx.globalAlpha = 0.6;
                    roundRect(ctx, w / 2 - 175, Math.round(52 * h / 100) + data.rectAnimation.oldH - 40, 350, 80, 20, true);
                    ctx.globalAlpha = 1;
                } else {
                    //we don't need to move the form, so draw it at same position
                    ctx.globalAlpha = 0.6;
                    roundRect(ctx, w / 2 - 175, Math.round(52 * h / 100) + data.rectAnimation.h - 40, 350, 80, 20, true);
                    ctx.globalAlpha = 1;
                }

                ctx.textBaseline = "middle";
                ctx.font = '24px Azure';
                ctx.fillStyle = '#000';
                //text of the main menu
                ctx.fillText("New Game", w / 2, Math.round(52 * h / 100));
                ctx.fillText("Load", w / 2, Math.round(64.5 * h / 100));
                ctx.fillText("Settings", w / 2, Math.round(77 * h / 100));
                ctx.fillText("Quit Game", w / 2, Math.round(89.5 * h / 100));
                ctx.textAlign = defaultTextAlign;
                ctx.textBaseline = defaultBaseLine;
            }

            if (Focused.newGameSure === true) {
                //mouse interaction
                if (MouseTrackerManager.checkOver(w / 1.7 - 87, h / 1.8 - 55, 174, 80) === true) {
                    subMenu.newGameSure.no = true;
                    subMenu.newGameSure.yes = false;
                } else if (MouseTrackerManager.checkOver(w / 2.52 - 87, h / 1.8 - 55, 174, 80) === true) {
                    subMenu.newGameSure.yes = true;
                    subMenu.newGameSure.no = false;
                }

                if (MouseTrackerManager.checkClick(w / 2.52 - 87, h / 1.8 - 55, 174, 80) === true) {
                    MouseTrackerManager.data.click = [];
                    subMenu.newGameSure.no = true;
                    subMenu.newGameSure.yes = false;
                    Focused.newGameSure = false;
                    Focused.newGame = true;
                    scope.menu.welcome = false;
                    transition(100, scope);
                } else if (MouseTrackerManager.data.click.length > 0) {
                    MouseTrackerManager.data.click = [];
                    subMenu.newGameSure.no = true;
                    subMenu.newGameSure.yes = false;
                    Focused.newGameSure = false;
                    Focused.newGame = true;
                }

                //background rect
                if (scope.cache.image.intro.blueForest) {
                    ctx.drawImage(scope.cache.image.intro.blueForest.image, w / 4, h / 4, w / 2, h / 2);
                } else {
                    ctx.fillStyle = "#8cf598";
                    roundRect(ctx, w / 4, h / 4, w / 2, h / 2, 20, true, false);
                }
                //stroke rect
                ctx.fillStyle = "#000";
                ctx.lineWidth = 12;
                roundRect(ctx, w / 4 - 6, h / 4 - 6, w / 2 + 10, h / 2 + 10, 30, false, true);
                ctx.lineWidth = defaultLineThickness;

                //text
                ctx.textAlign = "center";
                ctx.font = '24px Azure';
                ctx.fillText("Are you sure ?", w / 2, h / 3);

                //round rect that show which one are we choising
                ctx.fillStyle = "#59BAE9";
                if (subMenu.newGameSure.no === true) {
                    data.rectAnimation.w = w / 1.7 - 87;
                } else if (subMenu.newGameSure.yes === true) {
                    data.rectAnimation.w = w / 2.52 - 87;
                }

                //animate the form
                if (data.rectAnimation.w != data.rectAnimation.oldW) {
                    //using the function that edit position, so we don't need to rewrite it fully each time
                    animateRect(false);
                    //draw the form
                    roundRect(ctx, data.rectAnimation.oldW, h / 1.8 - 55, 174, 80, 20, true);
                } else {
                    //we don't need to move the form, so draw it at same position
                    roundRect(ctx, data.rectAnimation.w, h / 1.8 - 55, 174, 80, 20, true);
                }

                //choices
                ctx.fillStyle = "#000";
                ctx.font = '24px Azure';
                ctx.fillText("Yes", w / 2.52, h / 1.8);
                ctx.fillText("No", w / 1.7, h / 1.8);
                ctx.textAlign = defaultTextAlign;
                ctx.textBaseline = defaultBaseLine;
            }

            if (data.spawnTransition === true) {
                //since we draw a black rectangle, we want the global alpha to decrease when we draw it
                data.countUp = data.countUp - 1;
                if (data.countUp <= 0) {
                    data.countUp = 100;
                    data.spawnTransition = false;
                } else {
                    //black
                    ctx.globalAlpha = data.countUp / 100;
                    ctx.fillStyle = "#000";
                    ctx.fillRect(0, 0, w, h);
                }
                ctx.globalAlpha = 1;
            }


            if (MouseTrackerManager.checkClick(0, 0, 10000, 10000, 5000)) {
                if (MouseTrackerManager.data.click.length > 0) {
                    let c = MouseTrackerManager.data.click[MouseTrackerManager.data.click.length - 1];

                    //this whole part draw a circle on the screen, it's to check where i'm click and if ot's working fine :p
                    const centerX = c.x; //what this do? xD 
                    const centerY = c.y;
                    const radius = 5;
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                    ctx.fillStyle = 'red';
                    ctx.fill();
                    ctx.lineWidth = 5;
                    ctx.strokeStyle = '#003300';
                    ctx.stroke();
                }
            }
        };

        // Fired via the global update method.
        // Mutates state as needed for proper rendering next state
        welcome.update = function welcomeUpdate() {
            const kb = scope.settings.config.keyBoard;
            // Check if keys are pressed, if so, update the welcomes position.
            document.onkeyup = function(ev) {
                if (scope.menu.welcome === false) return;
                if (data.spawnTransition === true) return;
                if (scope.debug.debug) console.log(ev);
                if (kb.debug.includes(ev.key)) {
                    if (scope.debug.debug === false) {
                        scope.debug.debug = true;
                        scope.debug.showFps = true;
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
                    }
                }

                //* -----------------------------------------------------------------------------------------
                if (Focused.newGame === true) {
                    if (kb.confirm.includes(ev.key)) {
                        Focused.newGame = false;
                        Focused.newGameSure = true;
                    } else if (kb.down.includes(ev.key)) {
                        Focused.newGame = false;
                        Focused.load = true;
                    }
                    //* -----------------------------------------------------------------------------------------
                } else if (Focused.newGameSure === true) {
                    if (kb.back.includes(ev.key)) {
                        Focused.newGame = true;
                        Focused.newGameSure = false;
                    } else if (subMenu.newGameSure.yes === true && kb.confirm.includes(ev.key)) {
                        subMenu.newGameSure.no = true;
                        subMenu.newGameSure.yes = false;
                        Focused.newGameSure = false;
                        Focused.newGame = true;
                        scope.menu.welcome = false;
                        transition(100, scope);
                    } else if (subMenu.newGameSure.no === true && kb.confirm.includes(ev.key)) {
                        Focused.newGame = true;
                        Focused.newGameSure = false;
                    } else if (subMenu.newGameSure.yes === true && kb.right.includes(ev.key)) {
                        subMenu.newGameSure.yes = false;
                        subMenu.newGameSure.no = true;
                    } else if (subMenu.newGameSure.no === true && kb.left.includes(ev.key)) {
                        subMenu.newGameSure.no = false;
                        subMenu.newGameSure.yes = true;
                    }
                    //* -----------------------------------------------------------------------------------------
                } else if (Focused.load === true) {
                    if (kb.confirm.includes(ev.key)) {
                        Focused.load = false;
                        Focused.subLoad = true;
                    } else if (kb.down.includes(ev.key)) {
                        Focused.load = false;
                        Focused.settings = true;
                    } else if (kb.up.includes(ev.key)) {
                        Focused.load = false;
                        Focused.newGame = true;
                    }
                    //* -----------------------------------------------------------------------------------------
                } else if (Focused.subLoad === true) {
                    if (kb.back.includes(ev.key)) {
                        Focused.subLoad = false;
                        Focused.load = true;
                    }
                    //* -----------------------------------------------------------------------------------------
                } else if (Focused.loadSure === true) {
                    if (kb.back.includes(ev.key)) {
                        Focused.loadSure = false;
                        Focused.subLoad = true;
                    }
                    //* -----------------------------------------------------------------------------------------
                } else if (Focused.settings === true) {
                    if (kb.confirm.includes(ev.key)) {
                        Focused.settings = false;
                        Focused.subSettings = true;
                    } else if (kb.down.includes(ev.key)) {
                        Focused.settings = false;
                        Focused.quitGame = true;
                    } else if (kb.up.includes(ev.key)) {
                        Focused.settings = false;
                        Focused.load = true;
                    }
                    //* -----------------------------------------------------------------------------------------
                } else if (Focused.subSettings === true) {
                    if (kb.back.includes(ev.key)) {
                        Focused.subSettings = false;
                        Focused.settings = true;

                        /* settings order
                            general
                            audio
                            image
                            inputs
                            
                            we'll talk here, it'll be easier  
                            so u see what i'm doing down here?
                            basically, i'm doing the keyboard action to choose the menu in settings

                            kb stands for keayboard   
                            do you have the type.d.ts file open?
                        */
                    } else if (kb.up.includes(ev.key)) {
                        if (subMenu.settings.Audio === true) {
                            subMenu.settings.Audio = false;
                            subMenu.settings.General = true;
                        } else if (subMenu.settings.Image === true) {
                            subMenu.settings.Image = false;
                            subMenu.settings.Audio = true;
                        } else if (subMenu.settings.Inputs === true) {
                            subMenu.settings.Inputs = false;
                            subMenu.settings.Image = true;
                        }
                    } else if (kb.down.includes(ev.key)) {
                        if (subMenu.settings.General === true) {
                            subMenu.settings.Audio = false;
                            subMenu.settings.General = true;
                        } else if (subMenu.settings.Audio === true) {
                            subMenu.settings.Image = false;
                            subMenu.settings.Audio = true;
                        } else if (subMenu.settings.Image === true) {
                            subMenu.settings.Inputs = false;
                            subMenu.settings.Image = true;
                        }
                    }
                    //* -----------------------------------------------------------------------------------------
                } else if (Focused.subsubSettings === true) { //epic subsub
                    if (kb.back.includes(ev.key)) {
                        Focused.subsubSettings = false;
                        Focused.subSettings = true;
                    }
                    //* -----------------------------------------------------------------------------------------
                } else if (Focused.quitGame === true) {
                    if (kb.confirm.includes(ev.key)) {
                        if (scope.constants.isNodejs === true) {
                            windowClose(); //only work for app
                        } else {
                            WindowManager.closeGame(); //close the page
                        }
                    } else if (kb.up.includes(ev.key)) {
                        Focused.settings = true;
                        Focused.quitGame = false;
                    }
                }
            };
        };
        return welcome;
    }
}