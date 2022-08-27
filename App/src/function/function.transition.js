/// <reference path="../../ts/type.d.ts"/>

/**
 * @param {GameScope} scope 
 * @param {number} duration 
 */
function TransitionEffectBuild(scope, duration) {
    scope.state.menu.transition.duration = duration;
    scope.state.menu.transition.started = Date.now();
    scope.state.menu.transition.transitionTypeMult = 1;
    scope.state.menu.transition.transitionType = 0;
    scope.state.menu.transition.run = true;
}
/**
 * @param {GameScope} scope 
 * @param {number} duration 
 */
function TransitionEffectFade(scope, duration) {
    scope.state.menu.transition.duration = duration;
    scope.state.menu.transition.started = Date.now();
    scope.state.menu.transition.transitionTypeMult = -1;
    scope.state.menu.transition.transitionType = 1;
    scope.state.menu.transition.run = true;
}

/**
 * @param {GameScope} scope 
 */
function TransitionEffectCancel(scope) {
    scope.state.menu.transition.run = false;
    scope.cache.context[scope.state.menu.transition.canvasGroup].clearRect(0, 0, scope.w, scope.h);
    scope.state.menu.transition.transitionTypeMult = scope.state.menu.transition.duration = scope.state.menu.transition.started = scope.state.menu.transition.transitionType = 0;
}

class GameTransitionInterface extends GameInterfaces {
    constructor(scope) {
        super({
            asOwnCanvas: true,
            zindex: ConfigConst.ZINDEX.TRANSITION,
            canvasGroup: "GameTransition"
        }, scope);
        this.duration = 0;
        this.started = 0;
        this.transitionType = 0;
        this.transitionTypeMult = 0;
        this.spawned = false; // to prevent to launch the transition event when he himself spawn
        this.activated = true;
        this.run = false;
    }

    /**
     * @param {GameScope} scope 
     */
    render(scope) {
        if (this.run == true) {
            const ctx = scope.cache.context[this.canvasGroup],
                w = scope.w,
                h = scope.h;
            ctx.fillStyle = "#000000";
            ctx.clearRect(0, 0, w, h);
            const ga = ((this.transitionType + this.transitionTypeMult * ((Date.now() - this.started) / this.duration)));
            ctx.globalAlpha = ga;
            ctx.fillRect(0, 0, w, h);
            if (ga > 1 || ga < 0) {
                ctx.clearRect(0, 0, w, h);
                this.run = false;
                this.transitionTypeMult = this.duration = this.started = this.transitionType = 0;
            }
        }
    }

    /**
     * @param {GameScope} scope 
     */
    update(scope) { return scope.state; }
}