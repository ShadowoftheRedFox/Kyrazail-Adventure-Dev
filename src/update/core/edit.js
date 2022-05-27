import { regenerateCanvas } from "../build/canvas.js";
/** Game Update Module
 * Called by the game loop, this module will
 * perform any state calculations / updates
 * to properly render the next frame.
 * @param {scope} scope
 * @return {scope}
 */
export function gameEdit(scope) {
    return async function edit() {
        const container = document.getElementById("mainContainer");
        if (container.offsetWidth !== scope.constants.width || container.offsetHeight !== scope.constants.height) {
            scope.constants.width = container.offsetWidth;
            scope.constants.height = container.offsetHeight;
            regenerateCanvas(scope.viewport, scope.context, scope.constants.width, scope.constants.height);
        }
    };
}