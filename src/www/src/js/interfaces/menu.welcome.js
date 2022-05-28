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
                    settings: false,
                    subSettings: false,
                    subsubSettings: false, //this is epic
                    load: false,
                    subLoad: false,
                    loadSure: false,
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
                token: null,
                textAreaPresent: false,
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
                ctx.drawImage(img, 0, 0,
                    img.width, img.height - 55,
                    welcome.state.position.x,
                    welcome.state.position.y,
                    scope.constants.width,
                    scope.constants.height
                );
            } else if (scope.constants.image.titles1.Night) {
                const img = scope.cache.image.titles1.Night.image;
                ctx.drawImage(img, 0, 0,
                    img.width, img.height,
                    welcome.state.position.x,
                    welcome.state.position.y,
                    scope.constants.width,
                    scope.constants.height
                );
            } else {
                ctx.fillStyle = '#8cf598';
                ctx.fillRect(
                    //in case the image don't load correctly
                    welcome.state.position.x,
                    welcome.state.position.y,
                    scope.constants.width,
                    scope.constants.height
                );
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
                            // document.onclick = () => inputs.click();

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
        };

        // Fired via the global update method.
        // Mutates state as needed for proper rendering next state
        welcome.update = function welcomeUpdate() {
            const kb = scope.settings.config.keyBoard;
            // Check if keys are pressed, if so, update the welcomes position.
            document.onkeyup = function(ev) {
                //TODO centralize each input for each category
                if (scope.menu.welcome === false) return;
                if (data.spawnTransition === true) return;
                if (ev.target.id === "textAreaLoad") return;
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
                } else if (kb.left.includes(ev.key)) {
                    if (subMenu.newGameSure.no === true) {
                        subMenu.newGameSure.no = false;
                        subMenu.newGameSure.yes = true;
                        //we don't do it for yes since there is only 2 choice
                    } else if (Focused.subSettings === true) {
                        //! -----------------------------------------------------------------------------

                        //! -----------------------------------------------------------------------------
                    } else if (Focused.subLoad === true) {
                        //! -----------------------------------------------------------------------------

                        //! -----------------------------------------------------------------------------
                    }
                } else if (kb.right.includes(ev.key)) {
                    if (subMenu.newGameSure.yes === true) {
                        subMenu.newGameSure.yes = false;
                        subMenu.newGameSure.no = true;
                        //we don't do it for no since there is only 2 choice
                    } else if (Focused.subSettings === true) {
                        //! -----------------------------------------------------------------------------

                        //! -----------------------------------------------------------------------------
                    } else if (Focused.subLoad === true) {
                        //! -----------------------------------------------------------------------------

                        //! -----------------------------------------------------------------------------
                    }
                } else if (kb.up.includes(ev.key)) {
                    if (Focused.subSettings === true) {
                        //! -----------------------------------------------------------------------------

                        //! -----------------------------------------------------------------------------
                    } else if (Focused.subLoad === true) {
                        //! -----------------------------------------------------------------------------

                        //! -----------------------------------------------------------------------------
                    } else if (Focused.newGame === true) {
                        //nothing, we're already on top
                    } else if (Focused.load === true) {
                        Focused.load = false;
                        Focused.newGame = true;
                    } else if (Focused.settings === true) {
                        Focused.settings = false;
                        Focused.load = true;
                    } else if (Focused.quitGame === true) {
                        Focused.quitGame = false;
                        Focused.settings = true;
                    }
                } else if (kb.down.includes(ev.key)) {
                    if (Focused.subSettings === true) {
                        //! -----------------------------------------------------------------------------

                        //! -----------------------------------------------------------------------------
                    } else if (Focused.subLoad === true) {
                        //! -----------------------------------------------------------------------------

                        //! -----------------------------------------------------------------------------
                    } else if (Focused.newGame === true) {
                        Focused.newGame = false;
                        Focused.load = true;
                    } else if (Focused.load === true) {
                        Focused.load = false;
                        Focused.settings = true;
                    } else if (Focused.settings === true) {
                        Focused.settings = false;
                        Focused.quitGame = true;
                    } else if (Focused.quitGame === true) {
                        //nothing, we're already at the bottom
                    }
                } else if (kb.confirm.includes(ev.key)) {
                    if (Focused.subSettings === true) {
                        //! -----------------------------------------------------------------------------

                        //! -----------------------------------------------------------------------------
                    } else if (Focused.subLoad === true) {
                        //! -----------------------------------------------------------------------------

                        //! -----------------------------------------------------------------------------
                    } else if (Focused.newGame === true) {
                        Focused.newGame = false;
                        Focused.newGameSure = true;
                    } else if (Focused.load === true) {
                        Focused.subLoad = true;
                        Focused.load = false;
                    } else if (Focused.settings === true) {
                        Focused.subSettings = true;
                        Focused.settings = false;
                    } else if (Focused.quitGame === true && scope.constants.transition.transition === false) {
                        window.close(); //only work for app
                        WindowManager.closeGame(); //close the page
                    } else if (Focused.newGameSure === true && subMenu.newGameSure.no === true) {
                        Focused.newGame = true;
                        Focused.newGameSure = false;
                    } else if (Focused.newGameSure === true && subMenu.newGameSure.yes === true) {
                        Focused.newGame = true;
                        Focused.newGameSure = false;
                        subMenu.newGameSure.no = true;
                        scope.menu.welcome = false;
                        transition(100, scope);
                    }
                } else if (kb.back.includes(ev.key)) {
                    if (Focused.subSettings === true) {
                        //! -----------------------------------------------------------------------------

                        //! -----------------------------------------------------------------------------
                    } else if (Focused.subLoad === true) {
                        //! -----------------------------------------------------------------------------

                        //! -----------------------------------------------------------------------------
                    } else if (Focused.newGameSure === true) {
                        Focused.newGame = true;
                        Focused.newGameSure = false;
                    } else if (Focused.subLoad === true) {
                        Focused.subLoad = false;
                        Focused.load = true;
                        data.textAreaPresent = false;
                    } else if (Focused.subSettings === true) {
                        Focused.subSettings = false;
                        Focused.settings = true;
                    } else if (Focused.subLanguage === true) {
                        Focused.subLanguage = false;
                        Focused.quitGame = true;
                    }
                }
            };
        };

        return welcome;
    }
}