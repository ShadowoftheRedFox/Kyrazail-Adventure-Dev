// import { roundRect } from "../function/roundedRectangle.js";
/** menu Module
 * Main menu entity module.
 * @param {scope} scope
 */
class Menu {
    /** menu Module
     * Main menu entity module.
     * @param {scope} scope
     */
    constructor(scope) {
        var menu = this;
        // Setup globals
        //dimension partent de haut gauche a bas droite
        var w = scope.constants.width, // largeur
            h = scope.constants.height; // hauteur


        // Create the initial state
        menu.state = {
            position: {
                x: 0,
                y: 0
            },
            data: {
                img: {
                    image: null
                }
            }
        };

        // Draw the menu on the canvas
        menu.render = function menuRender() {
            w = scope.constants.width; // largeur
            h = scope.constants.height; // hauteur
            //set up some constant
            const lineThickness = scope.context.lineWidth,
                ctx = scope.context;

            //! will be used to display dialogs when needed, stats will be displayed in teh pause menu.
        };

        // Fired via the global update method.
        // Mutates state as needed for proper rendering next state
        menu.update = function menuUpdate() {
            const kb = scope.settings.config.keyBoard;
            // Check if keys are pressed, if so, update the menus position.
            //nothing right now
        };

        return menu;
    }
}