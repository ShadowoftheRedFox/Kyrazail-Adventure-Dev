/** menu Module
 * Main menu entity module.
 * @param {scope} scope
 */
class updateMenu {
    /** menu Module
     * Main menu entity module.
     * @param {scope} scope
     */
    constructor(scope) {
        var doUpdate = this;

        // Create the initial state
        doUpdate.state = {
            later: true,
            onRestart: false,
            updateError: false,
            checkingUpdate: false,
            newVersionAvailable: false,
            versiondFound: null,
            confirmDoUpdate: false,
            updating: false,
            focused: {
                now: true,
                later: false,
                yes: true,
                no: false
            }
        };

        var s = doUpdate.state;

        // Draw the menu on the canvas
        doUpdate.render = async function menuRender() {
            //! we need to try with nw-webkit-updater, the built in methods do not works with all compressed files
            scope.menu.update = false;
            return;

            //TODO uncomment when pushing on github
            if (scope.constants.isNodejs === false || navigator.onLine === false) {
                scope.menu.update = false;
                if (navigator.onLine === false) {
                    console.warn("Couldn't update the game. User is not online.");
                } else {
                    console.warn("Game running on cloud. Can not update. Contact your server administrator to update.");
                }
                return;
            }
            var w = scope.constants.width, // largeur
                h = scope.constants.height; // hauteur
            //set up some constant
            const ctx = scope.context;

            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = "#fff";
            ctx.textAlign = "center";
            ctx.font = "24px Azure";

            ctx.fillText("Checking updates...", w / 2, h / 2);
            if (s.checkingUpdate === false) {
                s.checkingUpdate = true;
                //if json was not loaded
                if (!scope.cache.data.Update) scope.menu.update = false;
                if (scope.cache.data.Update.updateFound === false) {
                    //check how many time passed since the last check
                    const date = getDate().split("/");
                    const lastCheckDate = scope.cache.data.Update.lastCheck.split("/");

                    if (date[0] > lastCheckDate[0] || date[1] > lastCheckDate[1] || date[2] > lastCheckDate[2]) {
                        //TODO uncomment when pushing on github

                        UpdateManager.checkVersion(scope.cache.data.package.version, res => {
                            if (res.same === false) {
                                console.log("update available");
                                s.versiondFound = `${res.version}`;
                                s.newVersionAvailable = true;
                            } else {
                                //exit update menu
                                console.log("No update available.");
                                scope.menu.update = false;
                            }
                        });

                        //TODO comment when pushing on github
                        /*console.log("update available");
                        s.versiondFound = `1.0.13.1`;
                        s.newVersionAvailable = true;*/
                    } else {
                        //exit update menu
                        console.log("Already checked today, no update.");
                        scope.menu.update = false;
                    }
                } else {
                    //already found a new version, don't need to send a new request
                    s.versiondFound = `${scope.cache.data.Update.versionFound}`;
                    s.newVersionAvailable = true;
                }
            }

            ctx.clearRect(0, 0, w, h);
            if (s.newVersionAvailable === true) {
                ctx.fillText("New version found:", w / 2, 1 * h / 10);
                ctx.fillText(`Current version: ${scope.cache.data.package.version}, version found: ${s.versiondFound}`, w / 2, 2 * h / 10, w - 40);
                ctx.fillText("Do you want to:", w / 2, 3 * h / 10);

                if (s.focused.now === true) {
                    underline(ctx, "Update now", w / 2, 5 * h / 10, ctx.fillStyle, "24px", ctx.textAlign);
                } else {
                    underline(ctx, "Update later", w / 2, 6 * h / 10, ctx.fillStyle, "24px", ctx.textAlign);
                }

                ctx.fillText("Update now", w / 2, 5 * h / 10);
                ctx.fillText("Update later", w / 2, 6 * h / 10);
            }

            if (s.confirmDoUpdate === true) {
                ctx.fillText("Are you sure?", w / 2, 3 * h / 10);

                if (s.focused.yes === true) {
                    underline(ctx, "Yes", w / 2, 5 * h / 10, ctx.fillStyle, "24px", ctx.textAlign);
                } else {
                    underline(ctx, "No", w / 2, 6 * h / 10, ctx.fillStyle, "24px", ctx.textAlign);
                }

                ctx.fillText("Yes", w / 2, 5 * h / 10);
                ctx.fillText("No", w / 2, 6 * h / 10);
            }
        };

        //load another page : window.location.href = "https://google.com"

        // Fired via the global update method.
        // Mutates state as needed for proper rendering next state
        doUpdate.update = async function menuUpdate() {
            const kb = scope.settings.config.keyBoard;
            // Check if keys are pressed, if so, update the menus position.
            document.onkeyup = function(ev) {
                if (kb.confirm.includes(ev.key)) {
                    if (s.focused.later === true && s.newVersionAvailable === true) {
                        scope.menu.update = false;
                        UpdateManager.laterSave(s.versiondFound);
                    } else if (s.focused.now === true && s.newVersionAvailable === true) {
                        s.newVersionAvailable = false;
                        s.confirmDoUpdate = true;
                    } else if (s.focused.yes === true && s.confirmDoUpdate === true) {
                        s.updating = true;
                        s.confirmDoUpdate = false;

                        //launching the update.html
                        window.location.href = scope.constants.href + "update/update.html";
                    } else if (s.focused.no === true && s.confirmDoUpdate === true) {
                        scope.menu.update = false;
                    }
                } else if (kb.down.includes(ev.key)) {
                    if (s.focused.now === true && s.newVersionAvailable === true) {
                        s.focused.now = false;
                        s.focused.later = true;
                    } else if (s.focused.yes === true && s.confirmDoUpdate === true) {
                        s.focused.no = true;
                        s.focused.yes = false;
                    }
                } else if (kb.up.includes(ev.key)) {
                    if (s.focused.later === true && s.newVersionAvailable === true) {
                        s.focused.later = false;
                        s.focused.now = true;
                    } else if (s.focused.no === true && s.confirmDoUpdate === true) {
                        s.focused.yes = true;
                        s.focused.no = false;
                    }
                }
            };
        };
        return doUpdate;
    }
}