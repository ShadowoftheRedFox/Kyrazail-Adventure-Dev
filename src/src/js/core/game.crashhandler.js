/** Game crash handler Module
 * Called by the game loop, this module will
 * perform any checkup to prevent crash or data
 * loss, and send errors or try to correct them.
 * @param {scope} scope
 * @return {void | Error}
 */
class crashHandler {
    /** Game crash handler Module
     * Called by the game loop, this module will
     * perform any checkup to prevent crash or data
     * loss, and send errors or try to correct them.
     * @param {scope} scope
     * @return {void | Error}
     */
    constructor(scope) {
        const crash = this;
        crash.state = {
            config: false
        };

        return async function handler() {
            if (!scope) {
                throw new Error("Scope isn't defined.");
            }

            if (!scope.context) {
                let e = new Error("CanvasRenderingContext2D has not been found. Please reload the game.");
                WindowManager.fatal(e, scope.constants.width, scope.constants.height);
            }

            if (scope.menu.loadingGame === true || scope.menu.loadingMap === true) return;

            //check the integrity of config
            const conf = scope.settings.config;

            if (!conf.targetFps && crash.state.config === false) {
                crash.state.config = true;
                scope.settings.config = {
                    willUpdate: false,
                    targetFps: 60,
                    quality: 3,
                    filter: {
                        red: 0,
                        green: 0,
                        blue: 0
                    },
                    alwaysRun: false,
                    lang: "en",
                    keyBoard: {
                        up: ["ArrowUp", "z"],
                        down: ["ArrowDown", "s"],
                        right: ["ArrowRight", "d"],
                        left: ["ArrowLeft", "q"],
                        run: ["Shift"],
                        interaction: ["e", "Enter"],
                        debug: ["k"],
                        pause: ["p"],
                        back: ["Backspace", "x"],
                        confirm: ["Enter"],
                        inventory: ["c", "a"]
                    }
                };
                return alert(`You must have deleted the config file! This file is one of the core of the game, so don\'t delete it. Running on default settings.`);
            }

            //don't check fps, we're doing it in game.loop
            if (conf.targetFps > 180) {
                console.warn("Fps are higher than 180. It may cause some disfunctionnality and performance fall.");
            }
            if (isNaN(conf.quality) === true || conf.quality > 3) {
                conf.quality = 3;
                console.warn("Quality problem. Max quality is 3. Setting to 3.");
            }
            if (conf.quality < 1) {
                conf.quality = 1;
                console.warn("Quality problem. Min quality is 1. Setting to 1.");
            }
            if (!conf.filter) {
                conf.filter = {
                    red: 0,
                    blue: 0,
                    green: 0
                };
                console.warn("There is no filter. Setting filter to default.");
            }
            if (isNaN(conf.filter.red) === true || conf.filter.red < 0 || conf.filter.red > 1) {
                conf.filter.red = 0;
                console.warn("Red filter is not valid. Setting to default 0.");
            }
            if (isNaN(conf.filter.blue) === true || conf.filter.blue < 0 || conf.filter.blue > 1) {
                conf.filter.blue = 0;
                console.warn("Blue filter is not valid. Setting to default 0.");
            }
            if (isNaN(conf.filter.green) === true || conf.filter.green < 0 || conf.filter.green > 1) {
                conf.filter.green = 0;
                console.warn("Green filter is not valid. Setting to default 0.");
            }
            if (typeof conf.alwaysRun != "boolean") {
                conf.alwaysRun = false;
                console.warn("alwaysRun is not a boolean (true / false). Setting to default false.");
            }
            if (typeof conf.lang != "string") {
                conf.lang = "en";
                console.warn("Language problems, setting back on english. You can edit that on the main menu.");
            }
            if (!conf.keyBoard) {
                conf.keyBoard = {
                    up: ["ArrowUp", "z"],
                    down: ["ArrowDown", "s"],
                    right: ["ArrowRight", "d"],
                    left: ["ArrowLeft", "q"],
                    run: ["Shift"],
                    interaction: ["e", "Enter"],
                    debug: ["k"],
                    pause: ["p"],
                    back: ["Backspace", "x"],
                    confirm: ["Enter"],
                    inventory: ["c", "a"]
                };
                console.warn("Keyboard settings has not been found. Setting to default.");
            }
            const kb = conf.keyBoard;
            if (!kb.up || !kb.up.length || kb.up.length < 1 || typeof kb.up[0] != "string") {
                kb.up = ["ArrowUp", "z"];
                console.warn("Problem detected at key settings 'up'. Setting back to default.");
            }
            if (!kb.down || !kb.down.length || kb.down.length < 1 || typeof kb.down[0] != "string") {
                kb.down = ["ArrowDown", "s"];
                console.warn("Problem detected at key settings 'down'. Setting back to default.");
            }
            if (!kb.left || !kb.left.length || kb.left.length < 1 || typeof kb.left[0] != "string") {
                kb.left = ["ArrowLeft", "q"];
                console.warn("Problem detected at key settings 'left'. Setting back to default.");
            }
            if (!kb.right || !kb.right.length || kb.right.length < 1 || typeof kb.right[0] != "string") {
                kb.right = ["ArrowRight", "d"];
                console.warn("Problem detected at key settings 'right'. Setting back to default.");
            }
            if (!kb.interaction || !kb.interaction.length || kb.interaction.length < 1 || typeof kb.interaction[0] != "string") {
                kb.interaction = ["e", "Enter"];
                console.warn("Problem detected at key settings 'interaction'. Setting back to default.");
            }
            if (!kb.run || !kb.run.length || kb.run.length < 1 || typeof kb.run[0] != "string") {
                kb.run = ["Shift"];
                console.warn("Problem detected at key settings 'run'. Setting back to default.");
            }
            if (!kb.back || !kb.back.length || kb.back.length < 1 || typeof kb.back[0] != "string") {
                kb.back = ["Backspace", "x"];
                console.warn("Problem detected at key settings 'back'. Setting back to default.");
            }
            if (!kb.confirm || !kb.confirm.length || kb.confirm.length < 1 || typeof kb.confirm[0] != "string") {
                kb.confirm = ["Enter"];
                console.warn("Problem detected at key settings 'confirm'. Setting back to default.");
            }
            if (!kb.pause || !kb.pause.length || kb.pause.length < 1 || typeof kb.pause[0] != "string") {
                kb.pause = ["p"];
                console.warn("Problem detected at key settings 'pause'. Setting back to default.");
            }
            if (!kb.debug || !kb.debug.length || kb.debug.length < 1 || typeof kb.debug[0] != "string") {
                kb.debug = ["k"];
                console.warn("Problem detected at key settings 'debug'. Setting back to default.");
            }
            if (!kb.inventory || !kb.inventory.length || kb.inventory.length < 1 || typeof kb.inventory[0] != "string") {
                kb.inventory = ["c", "a"];
                console.warn("Problem detected at key settings 'inventory'. Setting back to default.");
            }

            if (!scope.constants) {
                WindowManager.fatal(scope.ctx, new Error("Constants object can't be found."));
            }

            if (!scope.constants.tilesMap && scope.menu.loadingTiles === false) {
                console.log(scope.constants);
                WindowManager.fatal(new Error("Tiles maps objects can't be found."));
            }
            if (!scope.constants.tilesNames && scope.menu.loadingTiles === false) {
                console.log(scope.constants);
                WindowManager.fatal(new Error("Tiles names object can't be found."), scope.constants.width, scope.constants.height);
            }

            //make sure cache data are present
            if (!scope.cache.data) {
                scope.cache.data = {};
            }

            //check update existence
            if (!scope.cache.data.Update) {
                scope.cache.data.Update = {
                    lastCheck: "18/05/2022",
                    updateFound: false,
                    versionFound: null
                };
            }

            if (!scope.cache.map) {
                //we can't work without the map
                let e = new Error("cache.map is not present. Can't display maps.");
                WindowManager.fatal(e, scope.constants.width, scope.constants.height);
                throw e;
            }

            if (!scope.update || !scope.render || !scope.loop || !scope.edit || !scope.crashHandler || !scope.maprender) {
                //we can't run game without core modules
                let e = new EvalError("Can't find one of the main core component of the game.");
                WindowManager.fatal(e, scope.constants.width, scope.constants.height);
                throw e;
            }
        };
    }
}