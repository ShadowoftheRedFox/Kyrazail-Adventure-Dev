import { CONFIG_CONSTANTS } from "../config/game.config";
import { RectangleCreator } from "../function/function.rectangle";
import { generateCanvas, regenerateCanvas, removeElement } from "../util/util.canvas";

declare global {
    class LoadingScreenManager {
        w: number;
        h: number;
        progress: number;
        interval: NodeJS.Timeout;
        progressMax: number;
        progressLast: number;
        refreshSpeed: number;
        progressSmooth: number;
        progressAnimation: number;
        message: string;
        ctx: CanvasRenderingContext2D | null;
        viewport: HTMLCanvasElement | null;

        trailingStep: number;
        trailingCount: number;
        trailingSpeed: number;

        tipIndex: number;
        tipCount: number;
        tipSpeed: number;

        stripeStep: number;
        stripeSpeed: number;
        stripeAlpha: number;
        stripeColor: string;

        animationW: number;
        animationH: number;
        animationStep: number;
        animationImage: HTMLImageElement | null;
        animationMargin: number;
        animationLastStep: number;
        animationStepCount: number;
        animationStepSpeed: number;
        animationStepSpeedDistance: number
        animationPositionSpeed: (w: number) => number;
        animationPosition: number;

        calledEqual: boolean
        e: number;

        init(callOnEqual: Function): void;
        end(): void
        edit(): void
        bar(): void
        animate(): void
        tip(): void
        title(): void;
        addProgress(n: number): void;
        setMaxProgress(n: number): void;
        createPattern(color: string, alpha: number): CanvasPattern | null;
        progressFunction(): void;
    }
    const LoadingScreenManagerInstance: LoadingScreenManager
}
class LoadingScreenManager {
    w: number;
    h: number;
    progress: number;
    interval: NodeJS.Timeout;
    progressMax: number;
    progressLast: number;
    refreshSpeed: number;
    progressSmooth: number;
    progressAnimation: number;
    message: string;
    ctx: CanvasRenderingContext2D | null;
    viewport: HTMLCanvasElement | null;

    trailingStep: number;
    trailingCount: number;
    trailingSpeed: number;

    tipIndex: number;
    tipCount: number;
    tipSpeed: number;

    stripeStep: number;
    stripeSpeed: number;
    stripeAlpha: number;
    stripeColor: string;

    animationW: number;
    animationH: number;
    animationStep: number;
    animationImage: HTMLImageElement | null;
    animationMargin: number;
    animationLastStep: number;
    animationStepCount: number;
    animationStepSpeed: number;
    animationStepSpeedDistance: number
    animationPositionSpeed: (w: number) => number;
    animationPosition: number;

    calledEqual: boolean
    e: number;

    init(callOnEqual: Function): void {
        if (callOnEqual && typeof callOnEqual !== "function") throw new TypeError("callOnEqual is not a function.");
        if (this.viewport) return console.warn("this has already been started.");

        ((e) => { if (e) e.hidden = true; })(document.getElementById("textPreLoading"));

        const $ = CONFIG_CONSTANTS.MAINCONTAINER,
            $c = CONFIG_CONSTANTS.CONTAINER;

        var w = $.offsetWidth;
        var h = $.offsetHeight;

        this.viewport = generateCanvas(w, h, CONFIG_CONSTANTS.ZINDEX.LOADING);
        this.viewport.id = "LoadingScreenViewport";
        this.ctx = this.viewport.getContext("2d");
        this.w = w;
        this.h = h;

        $c?.insertBefore(this.viewport, $c.firstChild);
        const i = new Image();
        i.onload = () => this.animationImage = i;
        i.onerror = () => ErrorHandlerInstance.fatal(new Error(`${i.src} failed`));
        i.src = document.getElementsByTagName("img").item(0)?.src || "./resources/Image/Characters/Spiritual.png"; // document.getElementById("LoadingScreenAnimationImage")?.src;

        this.interval = setInterval(() => {
            if ($.offsetWidth !== this.w || $.offsetHeight !== this.h) {
                regenerateCanvas(this.viewport, $.offsetWidth, $.offsetHeight);
                this.w = $.offsetWidth;
                this.h = $.offsetHeight;
            }

            if (this.progress == this.progressMax && this.calledEqual === false) {
                if (callOnEqual && typeof callOnEqual == "function") {
                    callOnEqual();
                    console.log("called");
                }
                this.calledEqual = true;
            }

            this.stripeStep += this.stripeSpeed;
            if (this.stripeStep > this.h / 20) this.stripeStep = 0;

            this.edit();
        }, this.refreshSpeed);

    };
    end(): void {
        if (this.viewport) removeElement(this.viewport.id);
        clearInterval(this.interval);
        this.animationImage = this.viewport = this.ctx = null;
    };

    edit(): void {
        if (!this.ctx) return console.log("no ctx");
        // to hide anything behind the loading screen
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.w, this.h);

        try {
            this.title();
            this.bar();
            this.tip();
            this.animate();
        } catch (e) {
            ErrorHandlerInstance.fatal(e);
            this.end();
        }
    };

    bar(): void {
        const ctx = this.ctx,
            w = this.w,
            h = this.h;
        if (!ctx) return;

        var grd = ctx.createLinearGradient(w / 5, h * 9 / 10, w * 8 / 10, h * 9 / 10);
        grd.addColorStop(0, "rgba(255, 0, 0, 1)");
        grd.addColorStop(0.1, "rgba(255, 154, 0, 1)");
        grd.addColorStop(0.2, "rgba(208, 222, 33, 1)");
        grd.addColorStop(0.3, "rgba(79, 220, 74, 1)");
        grd.addColorStop(0.4, "rgba(63, 218, 216, 1)");
        grd.addColorStop(0.5, "rgba(47, 201, 226, 1)");
        grd.addColorStop(0.6, "rgba(28, 127, 238, 1)");
        grd.addColorStop(0.7, "rgba(95, 21, 242, 1)");
        grd.addColorStop(0.8, "rgba(186, 12, 248, 1)");
        grd.addColorStop(0.9, "rgba(251, 7, 217, 1)");
        grd.addColorStop(1, "rgba(255, 0, 0, 1)");

        ctx.fillStyle = "#fff";
        ctx.font = "bold 16px Azure";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        this.progressFunction();

        // progress bar progress %
        let b = (this.progressAnimation / this.progressMax);
        let p = Math.floor(b * 100);
        if (Math.random() * 100000 <= 1) this.e = Date.now();
        if (this.e + 1000 >= Date.now()) { p = 666; b = 1; }

        ctx.fillStyle = grd;
        RectangleCreator.roundRect(ctx, w / 5, h * 9 / 10, b * w * 6 / 10, h / 20, 30, true);
        ctx.fillStyle = this.createPattern(this.stripeColor, this.stripeAlpha) || "";
        RectangleCreator.roundRect(ctx, w / 5, h * 9 / 10, b * w * 6 / 10, h / 20, 30, true);

        ctx.fillStyle = "#fff";
        // true progress %
        // let p = Math.floor((this.progress / this.progressMax) * 1000) / 10;


        // animated %
        // ctx.fillText(`${p}%`, (this.progressAnimation) * w * 6 / 10 / 2 + w / 5, h * 9 / 10);

        // static %
        ctx.fillText(`${p}%`, w / 2, h * 9 / 10 + h / 40);
    };

    animate(): void {
        const ctx = this.ctx,
            w = this.w,
            h = this.h;
        if (!ctx) return;

        if (!this.animationImage) return;

        // step with time delay
        if (this.animationStepCount + this.animationStepSpeed < Date.now()) {
            // this.animationStepCount = Date.now();
            // this.animationStep = (this.animationStep == 0) ? 2 : 0;
        }

        // step with distance walked delay
        if (this.animationPosition > this.animationLastStep + this.animationStepSpeedDistance) {
            this.animationLastStep = this.animationPosition;
            this.animationStep = (this.animationStep == 0) ? 2 : 0;
        }

        this.animationPosition += this.animationPositionSpeed(w);
        if (this.animationPosition > this.animationMargin + this.w) {
            this.animationPosition = -this.animationMargin;
            //also randomise the new character
            this.animationH = [2, 6].random();
            this.animationW = [0, 3, 9].random();
            this.animationLastStep = 0;
        }

        // console.log(this.animationW , this.animationStep)

        ctx.drawImage(this.animationImage,
            (this.animationW + this.animationStep) * 32,
            this.animationH * 32,
            32, 32,
            this.animationPosition, h * 7 / 10,
            32, 32
        );
    };

    tip(): void {
        const ctx = this.ctx,
            w = this.w,
            h = this.h;
        if (!ctx) return;

        ctx.fillStyle = "#fff";
        ctx.font = "16px Azure";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (this.tipCount + this.tipSpeed * 1000 < Date.now()) {
            this.tipCount = Date.now();
            this.tipIndex = Math.floor(CONFIG_CONSTANTS.TIP.length * Math.random());
        }

        ctx.fillText(CONFIG_CONSTANTS.TIP[this.tipIndex], w / 2, h * 9 / 10 - 20, w);
    };
    title(): void {
        if (Date.now() >= this.trailingSpeed + this.trailingStep) {
            this.trailingCount++;
            this.trailingStep = Date.now();
        }

        let trailing = "";
        switch (this.trailingCount % 4) {
            case 0:
                trailing = "";
                break;
            case 1:
                trailing = ".";
                break;
            case 2:
                trailing = "..";
                break;
            case 3:
                trailing = "...";
                break;
            default:
                trailing = "";
                console.warn("default fall back.");
                break;
        }

        const ctx = this.ctx,
            w = this.w,
            h = this.h;
        if (!ctx) return;

        ctx.fillStyle = "#ffffff";
        ctx.font = "32px Azure";
        ctx.textAlign = "center";
        ctx.fillText(`${this.message}${trailing}`, w / 2, h / 2);
        ctx.font = "1px Unreadable";
        ctx.fillText(".", 0, 0); // pre load Unreadble font
        ctx.font = "1px Takhi";
        ctx.fillText(".", 0, 0); // pre load Takhi font, for places names
        ctx.font = "1px Senior";
        ctx.fillText(".", 0, 0); // pre load Senior font, for text
    };

    addProgress(n: number): void {
        if (!n || n <= 0) throw new TypeError("n must be a positiv integer");
        this.progress += n;
        this.progressLast = n;
        if (this.progress > this.progressMax) this.progress = this.progressMax;

    };

    setMaxProgress(n: number): void {
        if (!n || n <= 0) throw new TypeError("n must be a positiv integer");
        this.progress = 0;
        this.progressLast = 0;
        this.progressAnimation = 0;
        this.progressMax = n;
        this.calledEqual = false;
    };

    createPattern(color = "grey", alpha = 1): CanvasPattern | null {
        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');
        if (!ctx) return null;

        let h = this.h / 10,
            w = this.h / 10,
            offset = 4,
            step = this.stripeStep;

        canvas.width = w;
        canvas.height = h;
        ctx.lineWidth = h / 3;

        ctx.strokeStyle = color;
        ctx.globalAlpha = alpha;

        ctx.beginPath();

        ctx.moveTo(step, step + h);
        ctx.lineTo(step + w, step);

        ctx.moveTo(step, step - h);
        ctx.lineTo(step - w, step);

        ctx.moveTo(step - (w / 2), step + (h / 2));
        ctx.lineTo(step + (w / 2), step - (h / 2));

        ctx.moveTo(step + (w / 2), step - (h / 2));
        ctx.lineTo(step - (w / 2), step + (h / 2));

        ctx.stroke();
        ctx.closePath();

        return ctx.createPattern(canvas, "repeat");
    };

    /**
     * Return a number between 0 and one, the next smoothing animation.
     * 
     * Goal: Smooth the effect when progress is added.
     * 
     * Requirement:
     * We want to fill in g frame the difference between a and p.
     * We also want the animation to go slower at the end.
     */
    progressFunction(): void {
        /** The amount of frame for progressAnimation to reach progress. */
        var g = this.progressMax / (this.progress - this.progressAnimation), //this.progressSmooth,
            /** The max amount of progress. */
            m = this.progressMax,
            /** The current progress. equal 0 <= x <= maxProgress */
            p = this.progress,
            /** The last amount of progress added. */
            l = this.progressLast,
            /** The smoothing effect, equal 0 < x <= progress <= 100 */
            c = this.progressAnimation;

        // get the current pourcentage filled with the animation smoothing
        let $ = c;

        // to finish the loading bar, because g leads towards infinity, we need to cut him down at one point
        if (g > m / this.progressSmooth) {
            g = this.progressSmooth;
        }

        // add the travel part in one frame
        $ += l / g;

        // check if we reached the current progress
        if ($ > p) {
            $ = p;
        }
        // in case something went wrong
        if (!CONFIG_CONSTANTS.DEBUG && $ <= 0) $ = p;

        //update result
        this.progressAnimation = $;
    };
}

export const LoadingScreenManagerInstance = new LoadingScreenManager(); 