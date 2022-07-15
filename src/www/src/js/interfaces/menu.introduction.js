/** Intro Module
 * Introduction after the game load.
 * @param {scope} scope
 */
class Intro {
    /** Intro Module
     * Introduction after the game load.
     * @param {scope} scope
     */
    constructor(scope) {
        // Setup globals
        var intro = this;
        const container = document.getElementById("container");
        const ctx = scope.context,
            //if it's writing from left to right, right to left, centered etc
            defaultTextAlign = ctx.textAlign,
            //the thickness of line, for stroke form
            defaultLineThickness = ctx.lineWidth,
            //when you write text, the heigth given is the line. you can write above, under, in the middle etc
            defaultBaseLine = ctx.textBaseline;

        // Create the initial state
        intro.state = {
            position: {
                x: 0, //largeur: de tout à gauche
                y: 0 //hauteur: de tout en haut
            },
            data: {
                old: {
                    countUp: 0,
                    countDown: 1,
                    shadeOne: null,
                    presentation: null,
                    shadeTwo: null
                },
                started: false,
                count: 1,
                //timestamp
                shadeIntro: 3000,
                team: 6000,
                shadeTransitionDarker: 9000,
                shadeTransitionBrighter: 12000,
                changelog: 18000,
                shadeEnd: 21000
            }
        };

        const i = intro.state.data,
            changelog = scope.cache.data.package.changelog,
            l = changelog.length;

        // Draw the menu on the canvas
        intro.render = function menuRender() {
            //dimension partent de haut gauche a bas droite
            var w = scope.constants.width, // largeur
                h = scope.constants.height; // hauteur

            //black
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, w, h);

            if (i.started === false) {
                i.shadeIntro += Date.now();
                i.team += Date.now();
                i.shadeTransitionDarker += Date.now();
                i.shadeTransitionBrighter += Date.now();
                i.changelog += Date.now();
                i.shadeEnd += Date.now();
                i.started = true;
            }
            var timeLeft = i.changelog - Date.now(); //6s duration max, counting up

            //since the beginning till the end of the first darker transition
            if (i.shadeTransitionDarker >= Date.now()) {
                const icon = scope.cache.image.intro.icon;
                //getting the bigger dim
                let imgDim = w / 4;
                if (imgDim > h / 4) imgDim = h / 4;
                ctx.drawImage(icon.image, w / 2 - (imgDim / 2), h / 4 / 2, imgDim, imgDim);

                ctx.fillStyle = "#fff";
                ctx.font = "bold 40px Azure";
                ctx.textAlign = "center";
                ctx.fillText("Kyrazail team presents", w / 2, h / 3 + imgDim / 2);
                //until the end
            } else if (i.shadeEnd >= Date.now() + 1000) {
                ctx.fillStyle = "#fff";
                ctx.textAlign = "center";
                ctx.font = "24px Azure";
                if (i.shadeTransitionBrighter <= Date.now()) {
                    //will scroll down text if needed
                    if (200 + 24 * l >= h) {
                        //scrolling down
                        changelog.forEach(log => {
                            ctx.fillText(log, w / 2, 100 + changelog.indexOf(log) * 34 - Math.trunc(((6000 - timeLeft) * l * 17) / 6000));
                        });
                    } else {
                        //static
                        changelog.forEach(log => {
                            ctx.fillText(log, w / 2, 100 + changelog.indexOf(log) * 34);
                        });
                    }
                    ctx.fillStyle = "#000";
                    ctx.fillRect(0, 0, w, 64);
                    ctx.fillStyle = "#fff";
                    ctx.font = "bold 32px Azure";
                    ctx.fillText("Changelog", w / 2, 52);
                } else {
                    //until transition end
                    changelog.forEach(log => {
                        ctx.fillText(log, w / 2, 100 + changelog.indexOf(log) * 34);
                    });
                    ctx.fillStyle = "#000";
                    ctx.fillRect(0, 0, w, 64);
                    ctx.fillStyle = "#fff";
                    ctx.font = "bold 32px Azure";
                    ctx.fillText("Changelog", w / 2, 52);
                }
            }

            //transition over already existing text
            if (Date.now() <= i.shadeIntro) {
                //first transition, from dark to bright, display team
                i.count = i.count - 0.01;
                if (i.count < 0) i.count = 0;
                ctx.globalAlpha = i.count;
                //black
                ctx.fillStyle = "#000";
                ctx.fillRect(0, 0, w, h);
                ctx.globalAlpha = 1;
            } else if (Date.now() >= i.team && Date.now() <= i.shadeTransitionDarker) {
                //second transition, from bright to dark, end of team
                i.count = i.count + 0.01;
                if (i.count > 1) i.count = 1;
                ctx.globalAlpha = i.count;
                //black
                ctx.fillStyle = "#000";
                ctx.fillRect(0, 0, w, h);
                ctx.globalAlpha = 1;
            } else if (Date.now() >= i.shadeTransitionDarker && Date.now() <= i.shadeTransitionBrighter) {
                //third transition, from dark to bright, display changelog
                i.count = i.count - 0.01;
                if (i.count < 0) i.count = 0;
                ctx.globalAlpha = i.count;
                //black
                ctx.fillStyle = "#000";
                ctx.fillRect(0, 0, w, h);
                ctx.globalAlpha = 1;
            } else if (Date.now() >= i.changelog && Date.now() <= i.shadeEnd) {
                //last transition, display welcome menu after
                i.count = i.count + 0.01;
                if (i.count > 1) {
                    i.count = 1;
                    scope.menu.intro = false;
                    console.log("End of intro.");
                }
                ctx.globalAlpha = i.count;
                //black
                ctx.fillStyle = "#000";
                ctx.fillRect(0, 0, w, h);
                ctx.globalAlpha = 1;
            } else if (Date.now() >= i.shadeEnd) {
                scope.menu.intro = false;
                console.log("End of intro. Unstuck.");
            }

            //display version and release
            ctx.fillStyle = "#fff";
            ctx.font = "bold 16px Azure";
            ctx.textAlign = "left";
            ctx.fillText(`${scope.cache.data.package.releaseType} v${scope.cache.data.package.version} Last update: ${scope.cache.data.package.lastUpdate}`, 10, h - 26);
        };

        // Fired via the global update method.
        // Mutates state as needed for proper rendering next state
        intro.update = function menuUpdate() {
            // Check if keys are pressed, if so, update the menus position.
            // Set up `onkeydown` event handler.
            document.onkeyup = function(ev) {
                //skip intro if space is pressed
                if (ev.key === " ") {
                    scope.menu.intro = false;
                }
            };
        };

        return intro;
    }

}