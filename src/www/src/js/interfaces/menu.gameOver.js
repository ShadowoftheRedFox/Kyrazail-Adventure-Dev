// import { roundRect } from "../function/roundedRectangle.js";
/** menu Module
 * Main menu entity module.
 * @param {scope} scope
 */
class GameOver {
    /** menu Module
     * Main menu entity module.
     * @param {scope} scope
     */
    constructor(scope) {
        var gameOver = this;
        // Setup globals
        //dimension partent de haut gauche a bas droite
        var w = scope.constants.width, // largeur
            h = scope.constants.height; // hauteur


        // Create the initial state
        gameOver.state = {
            position: {
                x: 0,
                y: 0
            },
            data: {
                justSpawned: true,
                fading: false,
                fade: 0,
                focused: {
                    backLastSave: true,
                    mainMenu: false
                }
            }
        };

        const GS = gameOver.state;

        // Draw the menu on the canvas
        gameOver.render = function menuRender(deathType) {
            w = scope.constants.width; // largeur
            h = scope.constants.height; // hauteur
            //set up some constant
            const lineThickness = scope.context.lineWidth,
                ctx = scope.context;

            if (GS.data.justSpawned === true) {
                GS.data.justSpawned = false;
                GS.data.fading = true;
            }
            if (GS.data.fading === true) {
                GS.data.fade += 0.05;
                ctx.globalAlpha = GS.data.fade;
                if (GS.data.fade >= 1) {
                    GS.data.fading = false;
                    ctx.globalAlpha = 1;
                }
            }
        };

        // Fired via the global update method.
        // Mutates state as needed for proper rendering next state
        gameOver.update = function menuUpdate() {
            const kb = scope.settings.config.keyBoard;
            // Check if keys are pressed, if so, update the menus position.
            //nothing right now
        };

        return gameOver;
    }
}