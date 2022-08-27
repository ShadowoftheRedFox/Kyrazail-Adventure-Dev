/// <reference path="../../ts/type.d.ts"/>

const GameMainInterfaceTopBackground = [
    ["Battlebacks1/Ship", "Battlebacks2/Ship", "white"],
    ["Battlebacks1/Clouds", "Battlebacks2/Clouds", "black"],
    ["Battlebacks1/Sky", "Battlebacks2/Sky", "black"],
    ["Battlebacks1/Snowfield", "Battlebacks2/Snowfield", "black"],
    ["Battlebacks1/Snow", "Battlebacks2/Snowfield", "black"],
    ["Battlebacks1/Dirt1", "Battlebacks2/Cliff", "black"],
    ["Battlebacks1/Dirt2", "Battlebacks2/Port", "black"],
    ["Battlebacks1/Grassland", "Battlebacks2/Forest1", "black"],
    ["Battlebacks1/GrassMaze", "Battlebacks2/Forest2", "white"],
    ["Battlebacks1/Cobblestones4", "Battlebacks2/Bridge", "black"]
];
const GameMainInterfaceChoosen = GameMainInterfaceTopBackground[Math.floor(Math.random() * GameMainInterfaceTopBackground.length)];
class GameMainInterface extends GameInterfaces {
    /**
     * @param {GameScope} scope
     */
    constructor(scope) {
        super({
            asOwnCanvas: true,
            zindex: ConfigConst.ZINDEX.MAIN,
            canvasGroup: "GameMainGroup",
            requiredImage: [GameMainInterfaceChoosen[0], GameMainInterfaceChoosen[1]],
            requiredAudio: ["MAIN/Adeste", "MAIN/Dramatic", "MAIN/Moon", "MAIN/Silence"],
            transitionLeave: true,
            transitionSpawn: true
        }, scope);

        this.choosen = GameMainInterfaceChoosen;
        this.menu = [
            {
                name: "",
                f: this.mainMenuFct,
                button: [
                    {
                        name: "New Game",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        f: this.startNewGame
                    }, {
                        name: "Load",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        f: this.toLoad
                    }, {
                        name: "Settings",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        f: this.toSettings
                    }, {
                        name: "Quit Game",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        f: WindowManager.closeGame
                    }
                ],
                focusedButton: 0
            }, {
                name: "Load game",
                f: this.loadMenuFct,
                button: [
                    {
                        name: "Retry",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        f: this.loadSaveFileRetry
                    },
                    {
                        name: "Back",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        f: this.toMain
                    }
                ],
                focusedButton: 0
            },
            {
                name: "Settings",
                f: this.settingsMenuFct,
                button: [
                    {
                        name: "General",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        f: this.toGeneral
                    }, {
                        name: "Audio",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        f: this.toAudio
                    }, {
                        name: "Key bind",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        f: this.toKeyBind
                    },
                    {
                        name: "Back",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        f: this.toMain
                    }
                ],
                focusedButton: 0
            },
            {
                name: "Settings: General",
                f: this.settingsGeneralMenuFct,
                button: [
                    {
                        name: "Always run:",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        f: () => { GameConfig.alwaysRun = (GameConfig.alwaysRun ? false : true); }
                    },
                    {
                        name: "   Game fps:",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        special: true,
                        f: (dir) => {
                            if (dir == 1 && GameConfig.targetFps + 10 <= 140) { GameConfig.targetFps += 10; }
                            else if (dir == 0 && GameConfig.targetFps - 10 >= 30) { GameConfig.targetFps -= 10; }
                        }
                    },
                    {
                        name: "Debug mode:",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        f: () => {
                            ConfigConst.DEBUG = (ConfigConst.DEBUG ? false : true);
                            // clear fps if debug has been disabled
                            if (!ConfigConst.DEBUG) WindowManager.data.ctx.clearRect(0, 0, scope.w, scope.h);
                        }
                    },
                    {
                        name: "Back",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        f: this.toSettings
                    }
                ],
                focusedButton: 0
            },
            {
                name: "Settings: Audio",
                f: this.settingsAudioMenuFct,
                button: [
                    {
                        name: "Musics volume:",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        special: true,
                        f: (dir) => {
                            var s = scope.soundsSettings.volumeBG;
                            if (dir == 1 && s + 5 <= 1) { s = s * 100; s += 5; s = s / 100; }
                            else if (dir == 0 && s - 5 >= 0) { s = s * 100; s -= 5; s = s / 100; }
                        }
                    },
                    {
                        name: "Sounds volume:",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        special: true,
                        f: (dir) => {
                            var s = scope.soundsSettings.volumeEFX;
                            if (dir == 1 && s + 5 <= 1) { s = s * 100; s += 5; s = s / 100; }
                            else if (dir == 0 && s - 5 >= 0) { s = s * 100; s -= 5; s = s / 100; }
                        }
                    },
                    {
                        name: "Back",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        f: this.toSettings
                    }
                ],
                focusedButton: 0
            },
            {
                name: "Settings: Key bind",
                f: this.settingsKeyBindMenuFct,
                button: [
                    {
                        name: "Back",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        f: this.toSettings
                    }
                ],
                focusedButton: 0
            }
        ];
        this.focusedMenu = 0;
    }

    /**
     * @param {GameScope} scope
     * @param {this} that 
     */
    startNewGame(scope, that) {
        //TODO save the game in an auto save if a game is currently being played

        //TODO launch a new game

        //TODO also create on start 2 auto save files

        //! remove this once all todo are done :p
        const c = that.menu[0].button[0],
            o = c.name;
        c.name = "Coming soon!";
        that.u();
        setTimeout(() => {
            c.name = o;
            that.u();
        }, 5000);
    }

    /**
     * @param {GameScope} scope
     * @param {this} that 
     */
    toMain(scope, that) {
        that.u();
        that.focusedMenu = 0;
    }

    /**
     * @param {GameScope} scope
     * @param {this} that 
     */
    toLoad(scope, that) {
        that.u();
        that.focusedMenu = 1;
    }

    /**
     * @param {GameScope} scope
     * @param {this} that 
     */
    toSettings(scope, that) {
        that.u();
        that.focusedMenu = 2;
    }
    toGeneral(scope, that) {
        that.u();
        that.focusedMenu = 3;
    }
    toAudio(scope, that) {
        that.u();
        that.focusedMenu = 4;
    }
    toKeyBind(scope, that) {
        that.u();
        that.focusedMenu = 5;
    }

    /**
     * @param {GameScope} scope 
     * @param {this} that
     */
    mainMenuFct(scope, that) {
        const ctx = scope.cache.context[that.canvasGroup],
            w = scope.w,
            h = scope.h,
            currentMenu = that.menu[that.focusedMenu];

        //TODO add social network button (git and discord)

        ctx.fillStyle = "#fff";
        ctx.font = '300% Azure';
        ctx.imageSmoothingQuality = "high";
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";

        //background title
        ctx.globalAlpha = 0.9;
        RectangleCreator.roundRect(ctx, (w - (ctx.measureText("Kyrazail Adventure").width - 20)) / 2 - 40, h / 4 - 60, ctx.measureText("Kyrazail Adventure").width + 60, 100, 50, true, false);
        ctx.globalAlpha = 1;

        //create the gradient of title
        var gradient = ctx.createLinearGradient(w / 2 - 200, h / 3, w / 2 + 200, h / 3);
        gradient.addColorStop(0, "#F3C126");
        gradient.addColorStop(0.5, "#6FE0E1");
        gradient.addColorStop(1, "#3C1EEE");
        ctx.fillStyle = gradient;

        //write title
        ctx.fillText("Kyrazail Adventure", w / 2, h / 4);
        underline(ctx, "Kyrazail Adventure", w / 2, h / 4, gradient, "40px", ctx.textAlign);

        ctx.textBaseline = "middle";
        ctx.font = '200% Azure';

        //? black gradient if colored one is not okay
        // gradient = ctx.createLinearGradient(w / 2 - 200, h / 1.8, w / 2 + 200, h / 1.8); gradient.addColorStop(0, "#00000000"); gradient.addColorStop(0.5, "#000000"); gradient.addColorStop(1, "#00000000"); ctx.fillStyle = gradient;
        //? colored gradient
        gradient = ctx.createLinearGradient(w / 2 - 200, h / 1.8, w / 2 + 200, h / 1.8); gradient.addColorStop(0, "#F3C12600"); gradient.addColorStop(0.5, "#6FE0E1"); gradient.addColorStop(1, "#3C1EEE00");
        ctx.fillStyle = gradient;
        ctx.fillRect(w / 2 - 200, h / 1.8 + 52 * currentMenu.focusedButton - 16, 400, 40);

        ctx.fillStyle = that.choosen[2];
        currentMenu.button.forEach((button, index) => {
            ctx.fillText(button.name, w / 2, h / 1.8 + 52 * index, w);
            button.x = w / 2 - 200;
            button.y = h / 1.8 + 52 * index - 16;
            button.w = 400;
            button.h = 40;
        });
    }

    drawTitle(ctx, title, that, w, h) {
        ctx.fillStyle = that.choosen[2];
        ctx.font = '200% Azure';
        ctx.imageSmoothingQuality = "high";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(title, w / 2, h / 6);
        ctx.font = '150% Azure';
    }

    /**
     * @param {GameScope} scope
     * @param {this} that 
     */
    settingsGeneralMenuFct(scope, that) {
        const ctx = scope.cache.context[that.canvasGroup],
            w = scope.w,
            h = scope.h,
            currentMenu = that.menu[that.focusedMenu];
        that.drawTitle(ctx, currentMenu.name, that, scope.w, scope.h);

        var gradient = ctx.createLinearGradient(w / 2 - 200, h / 1.8, w / 2 + 200, h / 1.8);
        gradient.addColorStop(0, "#F3C12600");
        gradient.addColorStop(0.5, "#6FE0E1");
        gradient.addColorStop(1, "#3C1EEE00");

        currentMenu.button.forEach((button, index) => {
            if (index == currentMenu.focusedButton) {
                ctx.fillStyle = gradient;
                if (index == currentMenu.button.length - 1) that.createGradient(ctx, button);
                ctx.fillRect(button.x, button.y, button.w, button.h);
            }
            ctx.fillStyle = that.choosen[2];
            //? back button will always be the first one in the array
            if (index == currentMenu.button.length - 1) {
                that.createBackButton(ctx, button, w, h);
            } else {
                //correct the position
                index--;
                // special button menu
                switch (index) {
                    case 0:
                        ctx.textAlign = "left";
                        ctx.fillText(button.name, w / 10, h / 1.8 + 52 * index, w);
                        button.x = 0;
                        button.y = h / 1.8 + 52 * index - 16;
                        button.w = w;
                        button.h = 40;
                        ctx.textAlign = "center";
                        ctx.fillText(GameConfig.alwaysRun ? "Enabled" : "Disabled", w / 2, h / 1.8 + 52 * index);
                        break;
                    case 1:
                        ctx.textAlign = "left";
                        ctx.fillText(button.name, w / 10, h / 1.8 + 52 * index, w);
                        button.x = w / 2 - w / 4;
                        button.y = h / 1.8 + 52 * index - 16;
                        button.w = w / 2;
                        button.h = 40;
                        ctx.textAlign = "center";
                        ctx.fillText(`${GameConfig.targetFps > 30 ? "-" : " "}    ${GameConfig.targetFps}    ${GameConfig.targetFps < 140 ? "+" : " "}`, w / 2, h / 1.8 + 52 * index);
                        break;
                    case 2:
                        ctx.textAlign = "left";
                        ctx.fillText(button.name, w / 10, h / 1.8 + 52 * index, w);
                        button.x = 0;
                        button.y = h / 1.8 + 52 * index - 16;
                        button.w = w;
                        button.h = 40;
                        ctx.textAlign = "center";
                        ctx.fillText(ConfigConst.DEBUG ? "Enabled" : "Disabled", w / 2, h / 1.8 + 52 * index);
                        break;
                }
            }
        });
    }

    createGradient(ctx, button) {
        var gradient = ctx.createLinearGradient(button.x, button.y, button.x + button.w, button.y);
        gradient.addColorStop(0, "#F3C126");
        gradient.addColorStop(0.5, "#6FE0E181");
        gradient.addColorStop(1, "#3C1EEE00");
        ctx.fillStyle = gradient;
    }

    createBackButton(ctx, button, w, h) {
        ctx.textAlign = "left";
        ctx.textBaseline = "bottom";
        const metrics = ctx.measureText(button.name);
        const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        ctx.fillText(button.name, 20, h - 20, w);
        // bigger hitbox, that's why it's different than the text coos
        button.x = 0;
        button.y = h - actualHeight - 40;
        button.w = metrics.width + 40;
        button.h = h - button.y;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
    }

    /**
    * @param {GameScope} scope
    * @param {this} that 
    */
    settingsAudioMenuFct(scope, that) {
        const ctx = scope.cache.context[that.canvasGroup],
            w = scope.w,
            h = scope.h,
            currentMenu = that.menu[that.focusedMenu];
        that.drawTitle(ctx, currentMenu.name, that, scope.w, scope.h);

        var gradient = ctx.createLinearGradient(w / 2 - 200, h / 1.8, w / 2 + 200, h / 1.8);
        gradient.addColorStop(0, "#F3C12600");
        gradient.addColorStop(0.5, "#6FE0E1");
        gradient.addColorStop(1, "#3C1EEE00");

        currentMenu.button.forEach((button, index) => {
            if (index == currentMenu.focusedButton) {
                ctx.fillStyle = gradient;
                if (index == currentMenu.button.length - 1) that.createGradient(ctx, button);
                ctx.fillRect(button.x, button.y, button.w, button.h);
            }
            ctx.fillStyle = that.choosen[2];
            //? back button will always be the first one in the array
            if (index == currentMenu.button.length - 1) {
                that.createBackButton(ctx, button, w, h);
            } else {
                //correct the position
                index--;
                // special button menu
                switch (index) {
                    case 0:
                        ctx.textAlign = "left";
                        ctx.fillText(button.name, w / 10, h / 1.8 + 52 * index, w);
                        button.x = w / 2 - w / 4;
                        button.y = h / 1.8 + 52 * index - 16;
                        button.w = w / 2;
                        button.h = 40;
                        ctx.textAlign = "center";
                        ctx.fillText(`${scope.soundsSettings.volumeBG > 0 ? "-" : " "}    ${scope.soundsSettings.volumeBG * 100}%    ${scope.soundsSettings.volumeBG < 1 ? "+" : " "}`, w / 2, h / 1.8 + 52 * index);
                        break;
                    case 1:
                        ctx.textAlign = "left";
                        ctx.fillText(button.name, w / 10, h / 1.8 + 52 * index, w);
                        button.x = w / 2 - w / 4;
                        button.y = h / 1.8 + 52 * index - 16;
                        button.w = w / 2;
                        button.h = 40;
                        ctx.textAlign = "center";
                        ctx.fillText(`${scope.soundsSettings.volumeEFX > 0 ? "-" : " "}    ${scope.soundsSettings.volumeEFX * 100}%    ${scope.soundsSettings.volumeEFX < 1 ? "+" : " "}`, w / 2, h / 1.8 + 52 * index);
                        break;
                }
            }
        });
    }
    /**
  * @param {GameScope} scope
  * @param {this} that 
  */
    settingsKeyBindMenuFct(scope, that) {
        const ctx = scope.cache.context[that.canvasGroup],
            w = scope.w,
            h = scope.h,
            currentMenu = that.menu[that.focusedMenu];
        that.drawTitle(ctx, currentMenu.name, that, scope.w, scope.h);

        var gradient = ctx.createLinearGradient(w / 2 - 200, h / 1.8, w / 2 + 200, h / 1.8);
        gradient.addColorStop(0, "#F3C12600");
        gradient.addColorStop(0.5, "#6FE0E1");
        gradient.addColorStop(1, "#3C1EEE00");

        currentMenu.button.forEach((button, index) => {
            if (index == currentMenu.focusedButton) {
                ctx.fillStyle = gradient;
                if (index == currentMenu.button.length - 1) that.createGradient(ctx, button);
                ctx.fillRect(button.x, button.y, button.w, button.h);
            }
            ctx.fillStyle = that.choosen[2];
            //? back button will always be the first one in the array
            if (index == currentMenu.button.length - 1) {
                that.createBackButton(ctx, button, w, h);
            } else {
                index--;
                ctx.fillText(button.name, w / 2, h / 1.8 + 52 * index, w);
                button.x = w / 2 - 200;
                button.y = h / 1.8 + 52 * index - 16;
                button.w = 400;
                button.h = 40;
            }
        });
    }

    /**
     * @param {GameScope} scope
     * @param {this} that 
     */
    settingsMenuFct(scope, that) {
        const ctx = scope.cache.context[that.canvasGroup],
            w = scope.w,
            h = scope.h,
            currentMenu = that.menu[that.focusedMenu];
        that.drawTitle(ctx, currentMenu.name, that, scope.w, scope.h);

        var gradient = ctx.createLinearGradient(w / 2 - 200, h / 1.8, w / 2 + 200, h / 1.8);
        gradient.addColorStop(0, "#F3C12600");
        gradient.addColorStop(0.5, "#6FE0E1");
        gradient.addColorStop(1, "#3C1EEE00");

        currentMenu.button.forEach((button, index) => {
            if (index == currentMenu.focusedButton) {
                ctx.fillStyle = gradient;
                if (index == currentMenu.button.length - 1) that.createGradient(ctx, button);
                ctx.fillRect(button.x, button.y, button.w, button.h);
            }
            ctx.fillStyle = that.choosen[2];
            //? back button will always be the first one in the array
            if (index == currentMenu.button.length - 1) {
                that.createBackButton(ctx, button, w, h);
            } else {
                index--;
                ctx.fillText(button.name, w / 2, h / 1.8 + 52 * index, w);
                button.x = w / 2 - 200;
                button.y = h / 1.8 + 52 * index - 16;
                button.w = 400;
                button.h = 40;
            }
        });
    }

    /**
     * @param {GameScope} scope
     * @param {this} that 
     */
    loadMenuFct(scope, that) {
        const ctx = scope.cache.context[that.canvasGroup],
            w = scope.w,
            h = scope.h,
            currentMenu = that.menu[that.focusedMenu];
        that.drawTitle(ctx, "Load Game", that, scope.w, scope.h);

        //if in app
        if (scope.constants.isNwjs) {
            const fs = require("fs"),
                path = require("path");
            that.savePath = path.resolve(path.resolve(), "save");
            that.files = [];

            if (!that.checkSaveFile) {
                fs.readdir(that.savePath, (err, f) => {
                    //handling error
                    if (err) {
                        that.files = [err];
                    }
                    that.files = f;
                });
                that.checkSaveFile = true;
            }
            if (that.files.length == 0) ctx.fillText("Loading files...", w / 2, h / 2);
        } else {
            //if online
            ctx.fillText("Choose a save file:", w / 2, h / 2);

            var gradient = ctx.createLinearGradient(w / 2 - 200, h / 1.8, w / 2 + 200, h / 1.8);
            gradient.addColorStop(0, "#F3C12600");
            gradient.addColorStop(0.5, "#6FE0E1");
            gradient.addColorStop(1, "#3C1EEE00");

            currentMenu.button.forEach((button, index) => {
                if (index == currentMenu.focusedButton) {
                    if (index == 0) {
                        gradient = ctx.createLinearGradient(button.x, button.y, button.x + button.w, button.y);
                        gradient.addColorStop(0, "#F3C126");
                        gradient.addColorStop(0.5, "#6FE0E181");
                        gradient.addColorStop(1, "#3C1EEE00");
                    }
                    ctx.fillStyle = gradient;
                    ctx.fillRect(button.x, button.y, button.w, button.h);
                }
                ctx.fillStyle = that.choosen[2];
                //? back button will always be the first one in the array
                if (index == 0) {
                    ctx.textAlign = "left";
                    ctx.textBaseline = "bottom";
                    const metrics = ctx.measureText(button.name);
                    const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
                    ctx.fillText(button.name, 20, h - 20, w);
                    // bigger hitbox, that's why it's different than the text coos
                    button.x = 0;
                    button.y = h - actualHeight - 40;
                    button.w = metrics.width + 40;
                    button.h = h - button.y;
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                } else {
                    ctx.fillText(button.name, w / 2, h / 1.8 + 52 * index, w);
                    button.x = w / 2 - 200;
                    button.y = h / 1.8 + 52 * index - 16;
                    button.w = 400;
                    button.h = 40;
                }
            });

            if (!that.checkSaveFile) {
                that.checkSaveFile = true;
                //add a input element and check it
                let inputs = document.createElement('input');
                inputs.type = 'file';
                inputs.hidden = true;
                inputs.accept = ".kyraadv,.kyraadvsave";
                inputs.id = "GameSaveInput";
                inputs.name = "GameSaveInput";
                // we want only one file
                inputs.multiple = false;

                inputs.click();
                inputs.onchange = ev => {
                    console.log(ev);
                    //file inputed
                    that.files = inputs.files[0]; //the first file inputed only
                    console.log(that.files);

                    //get the name and the ext of the file
                    const fileName = ev.target.value.split('\\').pop();
                    console.log(fileName);

                    const saveReader = new FileReader();
                    saveReader.readAsText(that.files, "UTF-8");
                    saveReader.onload = function (evt) {
                        // content of the file
                        console.log(evt.target.result);
                    };
                    saveReader.onerror = function (evt) {
                        console.log("error reading file");
                        console.log(evt);
                    };
                };
            }

            //TODO display data relative to the saved data, and change the retry name button in "Load another file"
        }
    }

    loadSaveFileRetry(scope, that) {
        //add a input element and check it
        let inputs = document.createElement('input');
        inputs.type = 'file';
        inputs.hidden = true;
        inputs.accept = ".kyraadv,.kyraadvsave";
        inputs.id = "GameSaveInput";
        inputs.name = "GameSaveInput";
        // we want only one file
        inputs.multiple = false;

        inputs.click();
        inputs.onchange = ev => {
            console.log(ev);
            //file inputed
            that.files = inputs.files[0]; //the first file inputed only
            console.log(that.files);

            //get the name and the ext of the file
            const fileName = ev.target.value.split('\\').pop();
            console.log(fileName);

            const saveReader = new FileReader();
            saveReader.readAsText(that.files, "UTF-8");
            saveReader.onload = function (evt) {
                // content of the file
                console.log(evt.target.result);
            };
            saveReader.onerror = function (evt) {
                console.log("error reading file");
                console.log(evt);
            };
        };
    }

    /**
     * @param {GameScope} scope
     * @param {this} that 
     */
    render(scope) {
        const ctx = scope.cache.context[this.canvasGroup],
            w = scope.w,
            h = scope.h;
        ctx.clearRect(0, 0, w, h);
        // render the background
        ctx.drawImage(scope.cache.image[this.choosen[0]].image, 0, 0, w, h);
        ctx.drawImage(scope.cache.image[this.choosen[1]].image, 0, 0, w, h);

        if (ConfigConst.DEBUG) {
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(MouseTrackerManager.data.lastMove.x, MouseTrackerManager.data.lastMove.y, 10, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.arc(MouseTrackerManager.data.click[MouseTrackerManager.data.click.length - 1].x, MouseTrackerManager.data.click[MouseTrackerManager.data.click.length - 1].y, 10, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();

            this.menu[this.focusedMenu].button.forEach((b, idx) => {
                ctx.fillStyle = "red";
                if (!b.special) ctx.fillRect(b.x, b.y, b.w, b.h);
                else {
                    ctx.fillStyle = "yellow";
                    ctx.fillRect(b.x, b.y, b.w / 2, b.h);
                    ctx.fillStyle = "green";
                    ctx.fillRect(b.x + b.w / 2, b.y, b.w / 2, b.h);
                }
                if (MouseTrackerManager.checkClick(b.x, b.y, b.w, b.h)) {
                    ctx.fillStyle = "blue";
                    ctx.fillRect(b.x, b.y, b.w, b.h);
                }
            });
        }

        try {
            // render the current menu
            this.menu[this.focusedMenu].f(scope, this);
        } catch (e) {
            WindowManager.fatal(e);
        }
        this.needsUpdate = false;
    }

    /**
     * @param {GameScope} scope
     * @param {this} that 
     */
    update(scope) {
        const that = this,
            k = GameConfig.keyBoard,
            currentMenu = this.menu[this.focusedMenu];

        document.onkeydown = function (ev) {
            if (k.down.includes(ev.key) && currentMenu.focusedButton < currentMenu.button.length - 1) {
                currentMenu.focusedButton++;
                that.u();
            }
            if (k.up.includes(ev.key) && currentMenu.focusedButton > 0) {
                currentMenu.focusedButton--;
                that.u();
            }
            if (k.confirm.includes(ev.key) && !currentMenu.button[currentMenu.focusedButton].special) {
                currentMenu.button[currentMenu.focusedButton].f(scope, that);
            }
            if (currentMenu.button[currentMenu.focusedButton].special) {
                if (k.right.includes(ev.key)) { currentMenu.button[currentMenu.focusedButton].f(1); that.u(); }
                if (k.left.includes(ev.key)) { currentMenu.button[currentMenu.focusedButton].f(0); that.u(); }
            }
        };

        currentMenu.button.forEach((b, idx) => {
            // time between two frame
            const time = 1000 / GameConfig.targetFps;
            if (MouseTrackerManager.checkOver(b.x, b.y, b.w, b.h)) {
                currentMenu.focusedButton = idx;
                that.u();
            }
            if (MouseTrackerManager.checkClick(b.x, b.y, b.w, b.h, time) && !b.special) {
                that.u();
                b.f(scope, that);
            }
            if (b.special) {
                if (MouseTrackerManager.checkClick(b.x, b.y, b.w / 2, b.h, time)) {
                    that.u();
                    b.f(0);
                }
                if (MouseTrackerManager.checkClick(b.x + b.w / 2, b.y, b.w / 2, b.h, time)) {
                    that.u();
                    b.f(1);
                }
            }
        });

        if (ConfigConst.DEBUG && MouseTrackerManager.data.click[MouseTrackerManager.data.click.length - 1].date + 1000 >= Date.now()) that.u();
    }

    u() { this.needsUpdate = true; }
}