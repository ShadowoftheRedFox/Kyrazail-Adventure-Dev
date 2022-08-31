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
            },
            {
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
                        f: this.toMain,
                        back: true
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
                        f: this.toMain,
                        back: true
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
                        f: this.toSettings,
                        back: true
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
                            var s = scope.soundsSettings.volumeBG * 100;
                            if (dir == 1 && s + 5 <= 100) {
                                s += 5;
                            } else if (dir == 0 && s - 5 >= 0) {
                                s -= 5;
                            }
                            scope.soundsSettings.volumeBG = Math.round((s / 100 + Number.EPSILON) * 100) / 100;
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
                            var s = scope.soundsSettings.volumeEFX * 100;
                            if (dir == 1 && s + 5 <= 100) {
                                s += 5;
                            } else if (dir == 0 && s - 5 >= 0) {
                                s -= 5;
                            }
                            scope.soundsSettings.volumeEFX = Math.round((s / 100 + Number.EPSILON) * 100) / 100;
                        }
                    },
                    {
                        name: "Back",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        f: this.toSettings,
                        back: true
                    }
                ],
                focusedButton: 0
            },
            {
                name: "Settings: Key bind",
                f: this.settingsKeyBindMenuFct,
                button: [
                    {
                        name: "Up",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        keyboard: true,
                        key1: GameConfig.keyBoard.up[0],
                        key2: GameConfig.keyBoard.up[1],
                        f: (dir, b) => {
                            if (dir == 0) {
                                // custom key 1
                                GameConfig.keyBoard.up[0] = b.key1;
                            } else if (dir == 1) {
                                // custom key 2
                                GameConfig.keyBoard.up[1] = b.key2;
                            }
                        }
                    }, {
                        name: "Down",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        keyboard: true,
                        key1: GameConfig.keyBoard.down[0],
                        key2: GameConfig.keyBoard.down[1],
                        f: (dir, b) => {
                            if (dir == 0) {
                                // custom key 1
                                GameConfig.keyBoard.down[0] = b.key1;
                            } else if (dir == 1) {
                                // custom key 2
                                GameConfig.keyBoard.down[1] = b.key2;
                            }
                        }
                    }, {
                        name: "Left",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        keyboard: true,
                        key1: GameConfig.keyBoard.left[0],
                        key2: GameConfig.keyBoard.left[1],
                        f: (dir, b) => {
                            if (dir == 0) {
                                // custom key 1
                                GameConfig.keyBoard.left[0] = b.key1;
                            } else if (dir == 1) {
                                // custom key 2
                                GameConfig.keyBoard.left[1] = b.key2;
                            }
                        }
                    }, {
                        name: "Right",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        keyboard: true,
                        key1: GameConfig.keyBoard.right[0],
                        key2: GameConfig.keyBoard.right[1],
                        f: (dir, b) => {
                            if (dir == 0) {
                                // custom key 1
                                GameConfig.keyBoard.right[0] = b.key1;
                            } else if (dir == 1) {
                                // custom key 2
                                GameConfig.keyBoard.right[1] = b.key2;
                            }
                        }
                    }, {
                        name: "Run",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        keyboard: true,
                        key1: GameConfig.keyBoard.run[0],
                        key2: GameConfig.keyBoard.run[1],
                        f: (dir, b) => {
                            if (dir == 0) {
                                // custom key 1
                                GameConfig.keyBoard.run[0] = b.key1;
                            } else if (dir == 1) {
                                // custom key 2
                                GameConfig.keyBoard.run[1] = b.key2;
                            }
                        }
                    }, {
                        name: "Pause",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        keyboard: true,
                        key1: GameConfig.keyBoard.pause[0],
                        key2: GameConfig.keyBoard.pause[1],
                        f: (dir, b) => {
                            if (dir == 0) {
                                // custom key 1
                                GameConfig.keyBoard.pause[0] = b.key1;
                            } else if (dir == 1) {
                                // custom key 2
                                GameConfig.keyBoard.pause[1] = b.key2;
                            }
                        }
                    }, {
                        name: "Back",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        keyboard: true,
                        key1: GameConfig.keyBoard.back[0],
                        key2: GameConfig.keyBoard.back[1],
                        f: (dir, b) => {
                            if (dir == 0) {
                                // custom key 1
                                GameConfig.keyBoard.back[0] = b.key1;
                            } else if (dir == 1) {
                                // custom key 2
                                GameConfig.keyBoard.back[1] = b.key2;
                            }
                        }
                    }, {
                        name: "Interaction",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        keyboard: true,
                        key1: GameConfig.keyBoard.confirm[0],
                        key2: GameConfig.keyBoard.confirm[1],
                        f: (dir, b) => {
                            if (dir == 0) {
                                // custom key 1
                                GameConfig.keyBoard.confirm[0] = b.key1;
                            } else if (dir == 1) {
                                // custom key 2
                                GameConfig.keyBoard.confirm[1] = b.key2;
                            }
                        }
                    }, {
                        name: "Inventory",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        keyboard: true,
                        key1: GameConfig.keyBoard.inventory[0],
                        key2: GameConfig.keyBoard.inventory[1],
                        f: (dir, b) => {
                            if (dir == 0) {
                                // custom key 1
                                GameConfig.keyBoard.inventory[0] = b.key1;
                            } else if (dir == 1) {
                                // custom key 2
                                GameConfig.keyBoard.inventory[1] = b.key2;
                            }
                        }
                    }, {
                        name: "Back",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        f: this.toSettings,
                        back: true
                    }
                ],
                arrow: [
                    {
                        name: "",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        f: (that) => { that.arrowHeightChange += 52; },
                        draw: (w, h, c) => { return ArrowDrawer.pixel(w, h, "up", c); },
                        arrowUp: true,
                        enabled: false
                    }, {
                        name: "",
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0,
                        f: (that) => { that.arrowHeightChange -= 52; },
                        draw: (w, h, c) => { return ArrowDrawer.pixel(w, h, "down", c); },
                        arrowDown: true,
                        enabled: false
                    }
                ],
                focusedButton: 0,
                sideButton: 0,
                awaitInput: [0, 0]
            }
        ];
        this.focusedMenu = 0;

        // for keyboard customisation
        this.oldKey = { key1: "", key2: "" };
        this.awaitInput = false;
        /**
         * @type {{ id: number, key: number }}
         */
        this.buttonToChange = { id: null, key: null };
        this.arrowHeightChange = 0;
    }

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

    toMain(scope, that) { that.focusedMenu = 0; } toLoad(scope, that) { that.focusedMenu = 1; } toGeneral(scope, that) { that.focusedMenu = 3; } toAudio(scope, that) { that.focusedMenu = 4; } toKeyBind(scope, that) { that.focusedMenu = 5; }
    /**
     * 
     * @param {GameScope} scope 
     * @param {this} that 
     */
    toSettings(scope, that) {
        that.focusedMenu = 2;
        if (that.awaitInput) {
            const currentMenu = that.menu[that.focusedMenu],
                b = currentMenu.button[that.buttonToChange.id];
            // cancel input
            that.menu[that.focusedMenu].button[that.buttonToChange.id].key1 = that.oldKey.key1;
            that.menu[that.focusedMenu].button[that.buttonToChange.id].key2 = that.oldKey.key2;
            that.u();
            that.awaitInput = false;
            that.buttonToChange = { id: null, key: null };
        }
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
                        ctx.fillText(`${scope.soundsSettings.volumeBG > 0 ? "-" : " "}    ${Math.floor(scope.soundsSettings.volumeBG * 100)}%    ${scope.soundsSettings.volumeBG < 1 ? "+" : " "}`, w / 2, h / 1.8 + 52 * index);
                        break;
                    case 1:
                        ctx.textAlign = "left";
                        ctx.fillText(button.name, w / 10, h / 1.8 + 52 * index, w);
                        button.x = w / 2 - w / 4;
                        button.y = h / 1.8 + 52 * index - 16;
                        button.w = w / 2;
                        button.h = 40;
                        ctx.textAlign = "center";
                        ctx.fillText(`${scope.soundsSettings.volumeEFX > 0 ? "-" : " "}    ${Math.floor(scope.soundsSettings.volumeEFX * 100)}%    ${scope.soundsSettings.volumeEFX < 1 ? "+" : " "}`, w / 2, h / 1.8 + 52 * index);
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
        ctx.lineWidth = 3;

        var gradient = ctx.createLinearGradient(w / 2 - 200, h / 1.8, w / 2 + 200, h / 1.8);
        gradient.addColorStop(0, "#F3C12600");
        gradient.addColorStop(0.5, "#6FE0E1");
        gradient.addColorStop(1, "#3C1EEE00");

        currentMenu.button.forEach((button, index) => {
            ctx.fillStyle = that.choosen[2];
            ctx.strokeStyle = that.choosen[2];
            //? back button will always be the first one in the array
            if (index == currentMenu.button.length - 1) {
                that.createBackButton(ctx, button, w, h);
            } else {
                ctx.textAlign = "left";
                ctx.fillText(button.name, w / 6, h / 3.5 + 52 * index + that.arrowHeightChange, w);
                button.x = w / 2 - w / 8;
                button.y = h / 3.5 + 52 * index - 16 + that.arrowHeightChange;
                button.w = w / 2;
                button.h = 40;
                ctx.textAlign = "center";
                ctx.font = "bold 200% serif";
                const b1 = that.keyBindShowerCorrect(button.key1),
                    b2 = that.keyBindShowerCorrect(button.key2);
                ctx.fillText(b1, button.x + button.w / 4, button.y + 16 + that.arrowHeightChange);
                ctx.fillText(b2, button.x + 3 * button.w / 4, button.y + 16 + that.arrowHeightChange);

                // underline the current button where the mouse is on
                if (currentMenu.focusedButton == index && currentMenu.sideButton > 0) {
                    const metrics = ctx.measureText((currentMenu.sideButton == 1 ? b1 : b2));
                    ctx.beginPath();
                    // beccause sideButton is 1 or 2, we use this multiplication to only do one task, and not test the side
                    ctx.moveTo((button.x + (currentMenu.sideButton - 1) * button.w / 2) + button.w / 4 - metrics.width / 2,
                        button.y + button.h);
                    ctx.lineTo((button.x + (currentMenu.sideButton - 1) * button.w / 2) + button.w / 4 + metrics.width / 2,
                        button.y + button.h);
                    ctx.stroke();
                }
                ctx.font = "200% Azure";
            }
        });

        //TODO add arrow button
        // get the size of the title
        ctx.font = '200% Azure';
        const metrics = ctx.measureText(currentMenu.name);
        ctx.font = '150% Azure';

        // check if first button is out of screen
        if (currentMenu.button[0].y < h / 6 + metrics.actualBoundingBoxDescent + 10) {
            // button is out of screen, enable arrow down
            currentMenu.arrow[0].enabled = true;
        } else if (currentMenu.arrow[0].enabled) {
            // disable the arrow
            currentMenu.arrow[0].enabled = false;
            currentMenu.arrow[0].x = 0;
            currentMenu.arrow[0].y = 0;
            currentMenu.arrow[0].w = 0;
            currentMenu.arrow[0].h = 0;
        }

        // check if last button is out of screen
        if (currentMenu.button.last(1).y + currentMenu.button.last(1).h > h - 10) {
            // button is out of screen, enable arrow down
            currentMenu.arrow[1].enabled = true;
        } else if (currentMenu.arrow[1].enabled) {
            // disable the arrow
            currentMenu.arrow[1].enabled = false;
            currentMenu.arrow[1].x = 0;
            currentMenu.arrow[1].y = 0;
            currentMenu.arrow[1].w = 0;
            currentMenu.arrow[1].h = 0;
        }

        const arrowSize = 20,
            arrowOffset = 50;
        currentMenu.arrow.forEach((a, i) => {
            if (i == 0 && (a.enabled || ConfigConst.DEBUG)) {
                a.w = arrowSize + arrowOffset;
                a.h = arrowSize + arrowOffset;
                a.x = w - 10 - arrowOffset - arrowOffset / 2;
                a.y = h / 6 + metrics.actualBoundingBoxDescent + arrowOffset - arrowOffset / 2;
                if (ConfigConst.DEBUG) {
                    ctx.fillStyle = "red";
                    ctx.fillRect(a.x, a.y, a.w, a.h);
                }
                ctx.drawImage(a.draw(arrowSize, arrowSize, that.choosen[2]), w - 10 - arrowOffset, h / 6 + metrics.actualBoundingBoxDescent + arrowOffset);
            } else if (i == 1 && (a.enabled || ConfigConst.DEBUG)) {
                a.w = arrowSize + arrowOffset;
                a.h = arrowSize + arrowOffset;
                a.x = w - 10 - arrowOffset - arrowOffset / 2;
                a.y = h - 10 - arrowOffset - arrowOffset / 2;
                if (ConfigConst.DEBUG) {
                    ctx.fillStyle = "red";
                    ctx.fillRect(a.x, a.y, a.w, a.h);
                }
                ctx.drawImage(a.draw(arrowSize, arrowSize, that.choosen[2]), w - 10 - arrowOffset, h - 10 - arrowOffset);
            }
        });
    }

    /**
     * Correct key bing name for better visibility.
     * @param {string} str 
     * @returns {string}
     */
    keyBindShowerCorrect(str) {
        var r = "";
        switch (str) {
            case " ":
                r = "Space";
                break;
            case undefined:
                r = "Undefined";
                break;
            default:
                r = str.CapitalizeFirstLetterWord();
                break;
        }
        return r;
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
                    if (index == currentMenu.button.length - 1) {
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
                if (index == currentMenu.button.length - 1) {
                    that.createBackButton(ctx, button, w, h);
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
            if (!that.awaitInput) {
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
                if (k.back.includes(ev.key) && currentMenu.button[currentMenu.button.length - 1].back) {
                    currentMenu.button[currentMenu.button.length - 1].f(scope, that);
                }
            }
        };


        currentMenu.button.forEach((b, idx) => {
            // time between two frame
            const time = 1000 / GameConfig.targetFps;
            if (MouseTrackerManager.checkOver(b.x, b.y, b.w, b.h)) {
                currentMenu.focusedButton = idx;
                // underline the button
                if (currentMenu.button[idx].keyboard) {
                    if (MouseTrackerManager.checkOver(b.x, b.y, b.w / 2, b.h)) {
                        currentMenu.sideButton = 1;
                    } else if (MouseTrackerManager.checkOver(b.x + b.w / 2, b.y, b.w / 2, b.h)) {
                        currentMenu.sideButton = 2;
                    } else {
                        currentMenu.sideButton = 0;
                    }
                }
                that.u();
            }
            if (MouseTrackerManager.checkClick(b.x, b.y, b.w, b.h, time) && !b.special) {
                b.f(scope, that);
                that.u();
            }
            if (b.special) {
                if (MouseTrackerManager.checkClick(b.x, b.y, b.w / 2, b.h, time)) {
                    b.f(0);
                    that.u();
                }
                if (MouseTrackerManager.checkClick(b.x + b.w / 2, b.y, b.w / 2, b.h, time)) {
                    b.f(1);
                    that.u();
                }
            }
            if (b.keyboard) {
                if (!that.awaitInput) {
                    // create input
                    if (MouseTrackerManager.checkClick(b.x, b.y, b.w / 2, b.h, time)) {
                        that.oldKey = { key1: b.key1, key2: b.key2 };
                        b.key1 = "Press a key...";
                        that.awaitInput = true;
                        that.buttonToChange = { id: idx, key: 1 };
                        that.u();
                    } else if (MouseTrackerManager.checkClick(b.x + b.w / 2, b.y, b.w / 2, b.h, time)) {
                        that.oldKey = { key1: b.key1, key2: b.key2 };
                        b.key2 = "Press a key...";
                        that.awaitInput = true;
                        that.buttonToChange = { id: idx, key: 2 };
                        that.u();
                    }
                } else {
                    // cancel input
                    // check if it's the same button
                    if (idx == that.buttonToChange.id &&
                        ((MouseTrackerManager.checkClick(b.x, b.y, b.w / 2, b.h, time) && that.buttonToChange.key == 1) ||
                            (MouseTrackerManager.checkClick(b.x + b.w / 2, b.y, b.w / 2, b.h, time) && that.buttonToChange.key == 2))) {
                        if (MouseTrackerManager.checkClick(b.x, b.y, b.w / 2, b.h, time)) {
                            b.key1 = that.oldKey.key1;
                            that.awaitInput = false;
                            that.buttonToChange = { id: null, key: null };
                            that.u();
                        } else if (MouseTrackerManager.checkClick(b.x + b.w / 2, b.y, b.w / 2, b.h, time)) {
                            b.key2 = that.oldKey.key2;
                            that.awaitInput = false;
                            that.buttonToChange = { id: null, key: null };
                            that.u();
                        }
                    } else if (that.awaitInput) {
                        // if not, cancel last button and prepare that one
                        // create input for this current button
                        if (MouseTrackerManager.checkClick(b.x, b.y, b.w / 2, b.h, time)) {
                            currentMenu.button[that.buttonToChange.id].key1 = that.oldKey.key1;
                            currentMenu.button[that.buttonToChange.id].key2 = that.oldKey.key2;
                            that.oldKey = { key1: b.key1, key2: b.key2 };
                            b.key1 = "Press a key...";
                            that.awaitInput = true;
                            that.buttonToChange = { id: idx, key: 1 };
                            that.u();
                        } else if (MouseTrackerManager.checkClick(b.x + b.w / 2, b.y, b.w / 2, b.h, time)) {
                            currentMenu.button[that.buttonToChange.id].key1 = that.oldKey.key1;
                            currentMenu.button[that.buttonToChange.id].key2 = that.oldKey.key2;
                            that.oldKey = { key1: b.key1, key2: b.key2 };
                            b.key2 = "Press a key...";
                            that.awaitInput = true;
                            that.buttonToChange = { id: idx, key: 2 };
                            that.u();
                        }
                    }
                }

                //TODO also add a go down method to show all key
                //TODO add arrow that do that on click or on keyboard, also add if go down on keyboard, go down like arrow
                /*
                ? So what's going on since last time:
                - Arrow have been added, but no click limit
                - Button menu disappear after a click
                - Didn't add keyboard navigation up and down scroll
                - Also need to add a keyboard navigation left right method to switch between keys (that will aslo reach the arrows)
                - Also, cancel on back button click doesn't works
                */
                currentMenu.arrow.forEach(a => {
                    if (MouseTrackerManager.checkClick(a.x, a.y, a.w, a.h) && a.enabled) {
                        a.f(that);
                        that.u();
                    }
                });
            }

            if (this.awaitInput) {
                onkeydown = (ev) => {
                    if (that.buttonToChange.key == 1) {
                        that.menu[5].button[that.buttonToChange.id].key1 = ev.key;
                        // change the correct data in the config
                        that.menu[5].button[that.buttonToChange.id].f(0, that.menu[5].button[that.buttonToChange.id]);
                    }
                    if (that.buttonToChange.key == 2) {
                        that.menu[5].button[that.buttonToChange.id].key2 = ev.key;
                        // change the correct data in the config
                        that.menu[5].button[that.buttonToChange.id].f(1, that.menu[5].button[that.buttonToChange.id]);
                    }
                    that.awaitInput = false;
                    that.buttonToChange = { id: null, key: null };
                    that.oldKey = { key1: "", key2: "" };
                    that.u();
                };
            }
        });

        if (ConfigConst.DEBUG && MouseTrackerManager.data.click[MouseTrackerManager.data.click.length - 1].date + 1000 >= Date.now()) that.u();
    }

    u() { this.needsUpdate = true; }
}