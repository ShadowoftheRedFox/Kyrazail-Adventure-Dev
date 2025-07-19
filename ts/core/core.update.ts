import { Game } from "../game";

/**
 * 
 * @param {GameScope} scope 
 * @returns {Function}
 */
export function GameStateUpdate(scope: Game) {
    return function update(tFrame: number) {
        var menus = scope.state.menu;
        //Loop through menu
        for (var menu in menus) {
            // Fire off each active menus `render` method
            const m = menus[menu];
            if (m && m.activated === true) m.update(scope);
        }
        return scope.state;
    };
}