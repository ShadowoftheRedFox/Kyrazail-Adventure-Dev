/// <reference path="../../ts/type.d.ts"/>

/**
 * @param {GameScope} scope 
 */
function GameCrashHandler(scope) {
    return function crashHandler() {
        const $ = ConfigConst.MAINCONTAINER;
        if ($.offsetHeight != scope.h || $.offsetWidth != scope.w) {
            // console.log(`\nold w: ${scope.w} \t| new w: ${$.offsetWidth}\nold h: ${scope.h} \t\t| new h: ${$.offsetHeight}`);
            scope.w = $.offsetWidth;
            scope.h = $.offsetHeight;
            regenerateAllCanvas(scope.w, scope.h);
            // since size has changed, we need to redraw every menus, so set needsUpdate to true
            for (var menu in scope.state.menu) if (scope.state.menu[menu].activated) scope.state.menu[menu].needsUpdate = true;
        }
    };
}