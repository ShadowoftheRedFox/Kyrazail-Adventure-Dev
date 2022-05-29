// import { regenerateCanvas } from "../utils/utils.canvas.js";

/** Game Update Module
 * Called by the game loop, this module will
 * perform any state calculations / updates
 * to properly render the next frame.
 * @param {scope} scope
 * @return {scope}
 */
const gameEdit = function gameEdit(scope) {
    return async function edit() {
        const container = document.getElementById("mainContainer");
        if (container.offsetWidth !== scope.constants.width || container.offsetHeight !== scope.constants.height) {
            scope.constants.width = container.offsetWidth;
            scope.constants.height = container.offsetHeight;
            regenerateCanvas(scope.viewport, scope.context, scope.constants.width, scope.constants.height);
            regenerateCanvas(scope.viewportMap, scope.contextMap, scope.constants.width, scope.constants.height);
            if (WindowManager.data.created === true) regenerateCanvas(WindowManager.data.viewport, WindowManager.data.ctx, scope.constants.width, scope.constants.height);
        }

        if (scope.constants.loading === false) {
            const volumeMain = scope.constants.volumeMain,
                volumeOther = scope.constants.volumeOther;

            //update sound volume
            if (isNaN(volumeOther) == false) {
                if (scope.audio.ambiant && scope.audio.ambiant.volume != volumeOther) {
                    scope.audio.ambiant = volumeOther;
                    console.log("Changed ambiant audio volume.");
                } else if (scope.audio.system && scope.audio.system.volume != volumeOther) {
                    scope.audio.system = volumeOther;
                    console.log("Changed system audio volume.");
                } else if (scope.audio.battle && scope.audio.battle.volume != volumeOther) {
                    scope.audio.battle = volumeOther;
                    console.log("Changed battle audio volume.");
                }
            }
            if (scope.audio.background && isNaN(volumeMain) == false && scope.audio.background.volume != volumeMain) {
                console.log("Changed main audio volume.");
                scope.audio.background.volume = volumeMain;
            }
        }
    };
};