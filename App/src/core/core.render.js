/// <reference path="../../ts/type.d.ts"/>

/**
 * @param {GameScope} scope 
 * @returns {object}
 */
function GameRender(scope) {
    return function render() {
        if (ConfigConst.DEBUG && WindowManager.data.ctx) {
            const ctx = WindowManager.data.ctx,
                m = ctx.measureText(`${scope.GameLoop.fps} fps`);
            ctx.clearRect(0, 0, scope.w, scope.h);
            ctx.fillStyle = "yellow";
            ctx.font = "100% Azure";
            ctx.textAlign = "end";
            ctx.textBaseline = "hanging";
            ctx.fillText(`${scope.GameLoop.fps} fps`, scope.w - 10, 10);
        }

        var menus = scope.state.menu;
        //Loop through menu
        for (var menu in menus) {
            // Fire off each active menus `render` method
            const m = menus[menu];
            if (m.activated == true) {
                if (m.spawned === true && m.transitionSpawn) {
                    m.spawned = false;
                    TransitionEffectFade(scope, m.transitionSpawnDuration);
                    scope.cache.context[m.canvasGroup].fillStyle = "black";
                    scope.cache.context[m.canvasGroup].fillRect(0, 0, m.interfaceCanvas.width, m.interfaceCanvas.height);
                } else if (m.needsUpdate === true) m.render(scope);
            }
        }
    };
}