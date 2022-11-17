/// <reference path="../../ts/type.d.ts"/>
/** Game Loop Module
 * This module contains the game loop, which handles
 * updating the game state and re-rendering the canvas
 * (using the updated state) at the configured FPS.
 * @doom
 * @param {GameScope} scope 
 * @returns {GameScope}
 */
class GameLoop {
    /**
     * Constructor
     * @param {GameScope} scope 
     * @returns {GameScope}
     */
    constructor(scope) {
        var loop = this;
        // Initialize timer variables so we can calculate FPS
        // minus one because better for the screen and the game
        var fps = GameConfig.targetFps - 1,
            fpsInterval = 1000 / fps,
            before = window.performance.now(),
            // Set up an object to contain our alternating FPS calculations
            cycles = {
                new: {
                    frameCount: 0,
                    startTime: before,
                    sinceStart: 0
                },
                old: {
                    frameCount: 0,
                    startTime: before,
                    sinceStart: 0
                }
            },
            // Alternating Frame Rate vars
            resetInterval = 5,
            resetState = 'new';

        loop.fps = fps;

        //prevent crash before the start of crashHandler 
        if (isNaN(fps) === true || fps < 30) {
            console.warn("targetFps in the config file is not valid, setting to default 60.");
            fps = 60;
        }

        /**
         * Main game rendering loop
         * @param {number} tframe 
         */
        loop.main = function mainLoop(tframe) {
            if (fps != GameConfig.targetFps - 1) {
                fps = GameConfig.targetFps - 1;
                fpsInterval = 1000 / fps;
                loop.fps = fps;
            }
            // Request a new Animation Frame
            // setting to `stopLoop` so animation can be stopped via
            // `window.cancelAnimationFrame( loop.stopLoop )`
            loop.stopLoop = window.requestAnimationFrame(loop.main);

            // How long ago since last loop?
            var now = tframe,
                elapsed = now - before,
                activeCycle, targetResetInterval;

            // If it's been at least our desired interval, render
            if (elapsed > fpsInterval) {
                // Set before = now for next frame, also adjust for 
                // specified fpsInterval not being a multiple of rAF's interval (16.7ms)
                // ( http://stackoverflow.com/a/19772220 )
                before = now - (elapsed % fpsInterval);

                // Increment the vals for both the active and the alternate FPS calculations
                for (var calc in cycles) {
                    ++cycles[calc].frameCount;
                    cycles[calc].sinceStart = now - cycles[calc].startTime;
                }

                // Choose the correct FPS calculation, then update the exposed fps value
                activeCycle = cycles[resetState];
                loop.fps = Math.round(1000 / (activeCycle.sinceStart / activeCycle.frameCount) * 100) / 100;

                // If our frame counts are equal....
                targetResetInterval = (cycles.new.frameCount === cycles.old.frameCount ?
                    resetInterval * fps // Wait our interval
                    :
                    (resetInterval * 2) * fps); // Wait double our interval

                // If the active calculation goes over our specified interval,
                // reset it to 0 and flag our alternate calculation to be active
                // for the next series of animations.
                if (activeCycle.frameCount > targetResetInterval) {
                    cycles[resetState].frameCount = 0;
                    cycles[resetState].startTime = now;
                    cycles[resetState].sinceStart = 0;

                    resetState = (resetState === 'new' ? 'old' : 'new');
                }

                try {
                    // check for errors
                    scope.GameCrashHandler();
                    // Update the game state
                    scope.state = scope.GameStateUpdate(now);
                    // Render the next frame
                    scope.GameRender();
                } catch (e) {
                    WindowManager.fatal(e);
                }
            }
        };
        return loop;
    }
}