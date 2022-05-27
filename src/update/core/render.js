/** Game Render Module
 * Called by the game loop, this module will
 * perform use the global state to re-render
 * the canvas using new data. It is only 
 * for menues that are rendered here.
 * @see https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutorial/Basic_animations for more
 * @param {scope} scope
 */
export function gameRender(scope) {

    return function render() {
        // Setup globals
        const w = scope.constants.width,
            h = scope.constants.height;

        const state = scope.state;
        if (!state) {
            alert("Missing state of the game.");
            throw new Error("Missing state of the game. Can't render the game.");
        }

        scope.context.clearRect(0, 0, w, h);

        if (state.hasOwnProperty("menu") === true) {
            var menus = state.menu;
            //Loop through menu
            for (var menu in menus) {
                // Fire off each active menus `render` method
                menus[menu].render();
            }
        }
    };
}