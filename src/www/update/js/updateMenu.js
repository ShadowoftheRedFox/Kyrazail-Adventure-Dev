import { roundRect } from "./manager.js";
import { UpdateManager } from "./manager.js";
import { underline } from "./manager.js";

/** menu Module
 * Main menu entity module.
 * @param {scope} scope
 */
export function UpdateMenu(scope) {
    var updateMenu = this;
    // Create the initial state
    updateMenu.state = {
        initialised: false,
        launchedUpdate: false,
        showButton: false,
        button: {
            backToGame: true,
            test: false
        },
        test: {
            count: 0,
            max: 1000
        }
    };

    const GS = updateMenu.state,
        ctx = scope.context;

    // Draw the menu on the canvas
    updateMenu.render = function menuRender() {
        var w = scope.constants.width,
            h = scope.constants.height;


        if (GS.initialised === false || UpdateManager.progress.initialised === false) {
            GS.initialised = true;
            UpdateManager.init();
        } else if (GS.launchedUpdate === false && (UpdateManager.progress.errorFound === false || UpdateManager.test === true)) {
            GS.launchedUpdate = true;
            try {
                UpdateManager.updateGame();
            } catch (e) { console.log(e); }
        }

        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.font = "24px Azure";

        if (UpdateManager.progress.error === false || UpdateManager.test === true) {
            if (UpdateManager.progress.initialised === false) {
                ctx.fillText("Initialisation...", w / 2, h / 2);
            } else if (UpdateManager.progress.createConnexion === false) {
                ctx.fillText("Awaiting databases...", w / 2, h / 2);
            } else if (UpdateManager.progress.retrievingPath === false) {
                ctx.fillText("Getting online files...", w / 2, h / 2);
                ctx.fillText(`File found: ${UpdateManager.progress.fileFound}`, w / 2, 9 * h / 10 + 30);
            } else if (UpdateManager.progress.retrievingContentAndWriting) {
                ctx.fillText("Updating files...", w / 2, h / 2);
                //loading bar
                ctx.fillStyle = "#59BAE9";
                roundRect(ctx, w * 2 / 10, h * 9 / 10, ((UpdateManager.progress.fileChecked / UpdateManager.progress.fileFound)) * w * 6 / 10, h * 5 / 100, 10, true);
                ctx.fillStyle = "#FFF";
                ctx.fillText(`${UpdateManager.progress.fileChecked} / ${UpdateManager.progress.fileFound}`, w / 2, 9 * h / 10 + 30);
                if (GS.test.count > 1000) GS.test.count = 0;
            } else if (UpdateManager.progress.cleaningUp === false) {
                ctx.fillText("Cleaning...", w / 2, h / 2);
                //loading bar
                ctx.fillStyle = "#59BAE9";
                roundRect(ctx, w * 2 / 10, h * 9 / 10, ((UpdateManager.progress.fileChecked / UpdateManager.progress.fileFound)) * w * 6 / 10, h * 5 / 100, 10, true);
                ctx.fillStyle = "#FFF";
                ctx.fillText(`${UpdateManager.progress.localFileChecked} / ${UpdateManager.progress.localFileFound}`, w / 2, 9 * h / 10 + 30);
            } else if (UpdateManager.progress.finished === true) {
                ctx.fillText("Update finished!", w / 2, h / 2);
                ctx.fillText("Get back to the game?", w / 2, h / 2 + 30);
                GS.showButton = true;
                ctx.fillText("Yes", w / 2, h / 2 + 60);
                underline(ctx, "Yes", w / 2, h / 2 + 60, ctx.fillStyle, "24px", ctx.textAlign);
            }
        } else {
            ctx.fillText(UpdateManager.progress.error, w / 2, h / 2);
            ctx.fillText("Back to game", w / 2, h / 2 + 30);
            ctx.fillText("Test anyway", w / 2, h / 2 + 60);
            if (GS.button.backToGame === true) {
                underline(ctx, "Back to game", w / 2, h / 2 + 30, ctx.fillStyle, "24px", ctx.textAlign);
            } else if (GS.button.test === true) {
                underline(ctx, "Test anyway", w / 2, h / 2 + 60, ctx.fillStyle, "24px", ctx.textAlign);
            }
        }
    };

    // Fired via the global update method.
    // Mutates state as needed for proper rendering next state
    updateMenu.update = function menuUpdate() {
        const kb = scope.config.keyBoard;
        // Check if keys are pressed, if so, update the menus position.
        document.onkeyup = function(ev) {
            if (kb.confirm.includes(ev.key)) {
                if (GS.showButton === true) {
                    let currentLocation = window.location.href;
                    let f = currentLocation.split("/");
                    let i = f.indexOf("www") - 1;
                    f.splice(f.length - i, i);
                    window.location.href = f.join("/");
                } else if (GS.button.backToGame === true && UpdateManager.progress.errorFound === true) {
                    let currentLocation = window.location.href;
                    let f = currentLocation.split("/");
                    let i = f.indexOf("www") - 1;
                    f.splice(f.length - i, i);
                    window.location.href = f.join("/");
                } else if (GS.button.test === true && UpdateManager.progress.errorFound === true) {
                    alert("testing, could harm the game integrity");
                    UpdateManager.test = true;
                    UpdateManager.init();
                }
            } else if (kb.down.includes(ev.key)) {
                if (GS.button.backToGame === true && UpdateManager.progress.errorFound === true) {
                    GS.button.backToGame = false;
                    GS.button.test = true;
                }
            } else if (kb.up.includes(ev.key)) {
                if (GS.button.test === true && UpdateManager.progress.errorFound === true) {
                    GS.button.test = false;
                    GS.button.backToGame = true;
                }
            }
        };
    };

    return updateMenu;
}