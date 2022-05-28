/**
 * Create a bubble reaction on top (32px higher) of the given coordinate. Bubble time recommended: 3.6s
 * @param {scope} scope The scope.
 * @param {number} x Horyzontal position.
 * @param {number} y Vertical position.
 * @param {number} bubble The ballon you want, starting from 0 to 9.
 * @param {number} bubbleCase Case of the ballon, starting from 0 to 7.
 * @description For bubble:
 * 0 = exclamation,
 * 1 = interogation,
 * 2 = music,
 * 3 = love,
 * 4 = angry,
 * 5 = sweat,
 * 6 = bad mood,
 * 7 = silent,
 * 8 = idea,
 * 9 = sleep.
 */
function bubble(scope, x, y, bubble, bubbleCase) {
    if (!x || !scope || !y) {
        console.warn([
            `One of those has not been specified by the caller:`,
            `Scope: ${(scope !== undefined) ? "Defined" : "Undefined"}`,
            `x: ${x}`,
            `y: ${y}`
        ].join("\n"));
        return;
    }
    return scope.context.drawImage(scope.cache.image.system.Balloon.image, bubbleCase * 32, bubble * 32, 32, 32, x, y - 32, 32, 32);
}