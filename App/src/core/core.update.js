/// <reference path="../../ts/type.d.ts"/>

/**
 * 
 * @param {GameScope} scope 
 * @returns {Function}
 */
function GameStateUpdate(scope) {
    return function update(tFrame) {
        var menus = scope.state.menu;
        //Loop through menu
        for (var menu in menus) {
            // Fire off each active menus `render` method
            const m = menus[menu];
            if (m.activated == true) m.update(scope);
        }
        return scope.state;
    };
}