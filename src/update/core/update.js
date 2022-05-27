/** Game Update Module
 * Called by the game loop, this module will
 * perform any state calculations / updates
 * to properly render the next frame.
 * @param {scope} scope
 * @return {state}
 */
export function gameUpdate(scope) {
    return function update(tFrame) {
        var state = scope.state ? scope.state : {};

        if (state.hasOwnProperty("menu") === true) {
            var menus = state.menu;
            //Loop through menu
            for (var menu in menus) {
                // Fire off each active menus `render` method
                menus[menu].update();
            }
        }
        return state;
    };
}