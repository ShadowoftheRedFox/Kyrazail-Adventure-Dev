import { GameInterfaces } from "../class/class.interface";
import { CONFIG_CONSTANTS } from "../config/game.config";
import { Game } from "../game";


/**
 * @param {GameScope} scope 
 * @param {number} duration 
 */
export function TransitionEffectBuild(scope: Game, duration: number) {
    if (!scope.state.menu.transition) return;
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
export function TransitionEffectFade(scope: Game, duration: number) {
    if (!scope.state.menu.transition) return;
    scope.state.menu.transition.duration = duration;
    scope.state.menu.transition.started = Date.now();
    scope.state.menu.transition.transitionTypeMult = -1;
    scope.state.menu.transition.transitionType = 1;
    scope.state.menu.transition.run = true;
}

/**
 * @param {GameScope} scope 
 */
export function TransitionEffectCancel(scope) {
    scope.state.menu.transition.run = false;
    scope.cache.context[scope.state.menu.transition.canvasGroup].clearRect(0, 0, scope.w, scope.h);
    scope.state.menu.transition.transitionTypeMult = scope.state.menu.transition.duration = scope.state.menu.transition.started = scope.state.menu.transition.transitionType = 0;
}

export class GameTransitionInterface extends GameInterfaces {
    duration = 0;
    started = 0;
    transitionType = 0;
    transitionTypeMult = 0;
    spawned = false; // to prevent to launch the transition event when he himself spawn
    activated = true;
    run = false;
    constructor(scope: Game) {
        super({
            asOwnCanvas: true,
            zindex: CONFIG_CONSTANTS.ZINDEX.TRANSITION,
            canvasGroup: "GameTransition"
        }, scope);
    }

    /**
     * @param {GameScope} scope 
     */
    render(scope: Game) {
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