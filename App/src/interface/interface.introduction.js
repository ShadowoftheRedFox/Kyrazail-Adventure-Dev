/// <reference path="../../ts/type.d.ts"/>

class GameIntroductionInterface extends GameInterfaces {
    /**
     * @param {GameScope} scope 
     */
    constructor(scope) {
        super({
            asOwnCanvas: true,
            zindex: ConfigConst.ZINDEX.INTRODUCTION,
            canvasGroup: "GameIntroductionGroup",
            requiredImage: ["Intro/Icon"],
            transitionLeave: true,
            transitionSpawns: true,
            activated: true,
            transitionLeaveDuration: 1000,
            transitionSpawnDuration: 1000,
            needsUpdate: true
        }, scope);
        this.stepDelay = [1000, 1000, 1000, 1000, scope.constants.package.changelog.length * 500, 1000];
        this.started = 0;
        this.transitionNumber = 0;
        this.transitionStart = 0;
        this.ctx = scope.cache.context[this.canvasGroup];

        // save scroll up logs data
        this.d = 0;
        // current step up
        this.logStep = 0;
    }

    /**
     * @param {GameScope} scope 
     */
    render(scope) {
        const p = scope.constants.package;
        const ctx = this.ctx,
            w = scope.w,
            h = scope.h;

        // start the transition
        if (this.started == 0) {
            this.started = Date.now();
            // add time to each steps
            let c = 0;
            this.stepDelay.forEach((e, i) => { c += e; this.stepDelay[i] = c + this.started; });
        }

        ctx.clearRect(0, 0, w, h);
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        if (this.stepDelay[2] >= Date.now()) {
            // 1st phase of the transition
            const icon = scope.cache.image[this.requiredImage[0]];
            let imgDim = (w / 4 > h / 4 ? h / 4 : w / 4);
            if (icon) ctx.drawImage(icon.image, w / 2 - (imgDim / 2), h / 4 / 2, imgDim, imgDim);

            ctx.fillStyle = "#fff";
            ctx.font = "bold 40px Azure";
            ctx.fillText("Kyrazail team presents", w / 2, h / 3 + imgDim / 2);
        }

        if (this.stepDelay[2] <= Date.now()) {
            ctx.font = "16px Azure";
            // will scroll down text if needed
            const c = p.changelog;
            // check if last log is out of screen, add 10 for a little space between the screen bottom and last log
            // also wait another 1.5s to have the time to read the first logs
            if (110 + c.length * 24 > h && this.stepDelay[2] + 1500 <= Date.now()) {
                // if out of screen, roll up the logs until last log is in screen
                // calc the distance between end of screen and last log
                if (this.d == 0) this.d = h - 110 + c.length * 24;
                // add step until last log is 10px above screen bottom
                if (110 + c.length * 24 - this.logStep > h) this.logStep +=
                    // the amount of scroll up for the amount of time of the transition, minus 1s
                    this.d / (((this.stepDelay[4] - this.started) - 1000) / (1000 / scope.constants.targetFps));
                //draw each log with the step
                c.forEach((log, idx) => { ctx.fillText(log, w / 2, (100 + idx * 24) - this.logStep, w); });
            } else {
                // last log is in screen, stay like that
                c.forEach((log, idx) => { ctx.fillText(log, w / 2, 100 + idx * 24, w); });
            }

            //hide the bottom of the changelog text if changelogs slip under
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, w, 74);
            ctx.fillStyle = "#fff";
            ctx.font = "bold 32px Azure";
            ctx.fillText("Changelog", w / 2, 52);
        }

        if (this.stepDelay[5] < Date.now()) {
            // stops introduction when all phase have been shown
            this.activated = false;
            scope.state.menu.main.activated = true;
            ctx.clearRect(0, 0, w, h);
            // remove this menu since he won't be used again
            removeElement(this.interfaceCanvas.id);
            delete scope.cache.context[this.canvasGroup];
            delete scope.state.menu.intro;
            return;
        }

        ctx.fillStyle = "#000";
        // make the transition effect
        if (this.stepDelay[1] <= Date.now() && this.stepDelay[2] >= Date.now()) {
            // transition builds up
            if (this.transitionNumber != 2) {
                this.transitionStart = Date.now();
                this.transitionNumber = 2;
            }
            ctx.globalAlpha = ((Date.now() - this.transitionStart) / 1000);
            ctx.fillRect(0, 0, w, h);
        }
        if ((this.stepDelay[2] <= Date.now() && this.stepDelay[3] >= Date.now())) {
            // transition fades away
            if (this.transitionNumber != 3) {
                this.transitionStart = Date.now();
                this.transitionNumber = 3;
            }
            ctx.globalAlpha = 1 - ((Date.now() - this.transitionStart) / 1000);
            ctx.fillRect(0, 0, w, h);
        }
        if (this.stepDelay[4] <= Date.now() && this.transitionNumber != 4) {
            this.transitionNumber = 4;
            TransitionEffectBuild(scope, this.transitionLeaveDuration);
        }

        //display version and release
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#fff";
        ctx.font = "12px Azure";
        ctx.textAlign = "left";
        ctx.textBaseline = "bottom";
        ctx.fillText(`${p.releaseType} v${p.version} Last update: ${p.lastUpdate}`, 10, h - 10, w);
        // console.log(this.interfaceCanvas.offsetWidth, this.interfaceCanvas.offsetWidth);
    }

    /**
     * @param {GameScope} scope 
     */
    update(scope) {
        if (KeyboardTrackerManager.map[" "] === true) {
            // stops introduction when all phase have been shown
            TransitionEffectCancel(scope);
            this.activated = false;
            scope.state.menu.main.activated = true;
            this.ctx.clearRect(0, 0, scope.w, scope.h);
            // remove this menu since he won't be used again
            removeElement(this.interfaceCanvas.id);
            delete scope.cache.context[this.canvasGroup];
            delete scope.state.menu.intro;
        }
        return scope.state;
    }
}