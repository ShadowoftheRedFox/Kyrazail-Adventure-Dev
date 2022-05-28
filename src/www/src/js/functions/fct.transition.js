/**
 * Reduce or increase little by little the alpha.
 * @param {number} speed the bigger is the number, the slower it goes.
 * @param {scope} scope to get the dimendion of the canvas 
 */
function transition(speed, scope) {
    if (scope.constants.transition.transition === false) {
        scope.constants.transition.start = true;
        scope.constants.transition.transition = true;
    }
    if (scope.constants.transition.speed !== speed) {
        scope.constants.transition.speed = speed;
    }
}