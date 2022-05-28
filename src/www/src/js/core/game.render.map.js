/** Game Render Module
 * Called by the game loop, this module will
 * perform use the global state to re-render
 * the canvas using new data. It is only 
 * for entities that are rendered here.
 * @see https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutorial/Basic_animations for more
 * @param {scope} scope
 */
const gameMapRender = function gameMapRender(scope) {

    return async function maprender() {
        // Setup globals
        const w = scope.constants.width,
            h = scope.constants.height,
            s = scope.menu;
        const state = scope.state;
        if (!state) {
            alert("Missing state of the game.");
            throw new Error("Missing state of the game. Can't render the game.");
        }

        //wait end of loading then start to do once things
        if (s.loadingGame === true || s.loadingMap === true || s.intro === true || s.welcome === true || s.gameOver === true || s.paused === true || s.update === true || s.doUpdate === true) {
            return;
        }

        if (mapRenderManager.checkStateChange(scope) === false) return;

        //clear the canavs and redraw
        scope.contextMap.clearRect(0, 0, w, h);

        /* TODO
        render when needed
        render layer for animated tiles
        render layer for ground, entities, roof
        render light effects?
        */

        mapRenderManager.ground(scope);

        // If there are entities, iterate through them and call their `render` methods
        if (state.hasOwnProperty('entities') === true) {
            var entities = state.entities;
            // Loop through entities
            for (var entity in entities) {
                // Fire off each active entities `render` method
                entities[entity].render();
            }
        }

        //! map.roof.render()
    };
};