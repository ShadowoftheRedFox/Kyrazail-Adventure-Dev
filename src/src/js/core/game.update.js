/** Game Update Module
 * Called by the game loop, this module will
 * perform any state calculations / updates
 * to properly render the next frame.
 * @param {scope} scope
 * @return {state}
 */
const gameUpdate = function gameUpdate(scope) {
    return function update(tFrame) {
        if (scope.menu.loading === true) return scope.state;
        var state = scope.state ? scope.state : {};

        if (scope.menu.loadingGame === true || scope.menu.loadingMap === true) {
            return state;
        } else if (scope.menu.update === true) {
            if (scope.state.once) {
                scope.state.once.checkUpdate.update();
                return state;
            }
        } else if (scope.menu.intro === true) {
            if (scope.state.once) {
                scope.state.once.intro.update();
                return state;
            }
        } else if (scope.menu.doUpdate === true) {
            scope.state.menu.doUpdate.update();
            return state;
        }

        //render main menu
        if (scope.menu.welcome === true) {
            if (state.hasOwnProperty("welcome") === true) {
                var welcomes = state.welcome;
                for (var welcome in welcomes) {
                    // Fire off each active menus `render` method
                    welcomes[welcome].update();
                }
                return state;
            }
        }

        // If there are entities, iterate through them and call their `update` methods
        if (state.hasOwnProperty('entities') === true) {
            var entities = state.entities;
            // Loop through entities
            for (var entity in entities) {
                // Fire off each active entities `render` method
                entities[entity].update();
            }
        }

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
};