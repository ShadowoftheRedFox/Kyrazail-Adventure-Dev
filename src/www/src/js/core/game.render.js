/**
 * Show fps, add it at function to render on any menu, even if they return.
 * @param {import("../../game").scope} scope Canvas
 */
function fps(scope) {
    // If we want to show the FPS, then render it in the top right corner.
    //in a function to render above any menu
    if (scope.debug.showFps === true) {
        const defaultFillStyle = scope.context.fillStyle;
        scope.context.fillStyle = '#ff0';
        scope.context.font = "32px serif";
        scope.context.fillText(Math.ceil(scope.loop.fps), scope.constants.width - 50, 50);
        scope.context.fillStyle = defaultFillStyle;
    }
}
/**
 * Add a transition effect when needed.
 * @param {import("../../game").scope} scope Canvas
 */
async function doTransition(scope) {
    const trs = scope.constants.transition,
        ctx = scope.context;
    if (trs.transition === true) {
        if (trs.start === true) {
            //if we start the transition
            const preGlob = ctx.globalAlpha;
            const preFont = ctx.fillStyle;
            trs.count++;
            //fill the rect
            ctx.fillStyle = "#000";
            ctx.globalAlpha = 5 / trs.speed;
            ctx.fillRect(0, 0, scope.constants.width, scope.constants.height);
            //get back to last alpha
            ctx.globalAlpha = preGlob;
            ctx.fillStyle = preFont;
            //check if it's the end of the start
            if (trs.count >= trs.speed) {
                trs.start = false;
                trs.end = true;
            }
        } else if (trs.end === true) {
            //if we start the transition
            const preGlob = ctx.globalAlpha;
            const preFont = ctx.fillStyle;
            trs.count--;
            ctx.globalAlpha = ((1 / trs.speed) * trs.count).toFixed(2);
            //fill the rect
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, scope.constants.width, scope.constants.height);
            //get back to last alpha
            ctx.globalAlpha = preGlob;
            ctx.fillStyle = preFont;
            //check if it's the end of the end
            if (trs.count === 0) {
                trs.end = false;
                trs.transition = false;
            }
        }
    }
}
/** Game Render Module
 * Called by the game loop, this module will
 * perform use the global state to re-render
 * the canvas using new data. It is only 
 * for menues that are rendered here.
 * @see https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutorial/Basic_animations for more
 * @param {scope} scope
 */
const gameRender = function gameRender(scope) {

    return function render() {
        // Setup globals
        const w = scope.constants.width,
            h = scope.constants.height;
        const state = scope.state;
        if (!state) {
            alert("Missing state of the game.");
            throw new Error("Missing state of the game. Can't render the game.");
        }

        //wait end of loading then start to do once things
        if (scope.menu.loadingGame === true || scope.menu.loadingMap === true) {
            return;
        } else if (scope.menu.update === true) {
            if (scope.state.once) {
                scope.state.once.checkUpdate.render();
                return;
            }
        } else if (scope.menu.intro === true) {
            if (scope.state.once) {
                scope.context.clearRect(0, 0, w, h);
                scope.state.once.intro.render();
                return;
            }
        } else if (scope.menu.doUpdate === true) {
            scope.context.clearRect(0, 0, w, h);
            scope.state.menu.doUpdate.render();
            return;
        }

        // Clear out the canvas or not
        if (scope.constants.transition.transition === true && scope.constants.transition.start === true) {
            doTransition(scope);
            fps(scope);
            return;
        }
        if (scope.constants.transition.transition === false || scope.constants.transition.end === true) {
            doTransition(scope);
            fps(scope);
            scope.context.clearRect(0, 0, w, h);
        }

        //show the main menu
        if (scope.menu.welcome === true) {
            if (state.hasOwnProperty("welcome") === true) {
                var welcomes = state.welcome;
                for (var welcome in welcomes) {
                    // Fire off each active menus `render` method
                    welcomes[welcome].render();
                }
                if (scope.constants.transition.transition === false || scope.constants.transition.end === true) {
                    doTransition(scope);
                }
                fps(scope);
                return;
            }
        }

        //blur the background if paused
        const defaultBlur = scope.context.filter;
        if (scope.menu.paused === true) {
            // scope.context.filter = 'blur(5px)';
        }

        if (state.hasOwnProperty("menu") === true) {
            var menus = state.menu;
            //Loop through menu
            for (var menu in menus) {
                // Fire off each active menus `render` method
                menus[menu].render({ blur: defaultBlur });
            }
        }

        scope.context.filter = defaultBlur;
        if (scope.constants.transition.transition === false || scope.constants.transition.end === true) {
            doTransition(scope);
        }
        fps(scope);
    };
};