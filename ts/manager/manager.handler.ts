import { CONFIG_CONSTANTS } from "../config/game.config";
import { GameTranslate } from "../language/language.translate";
import { Utils } from "../util/utils"

declare global {
    class ErrorHandler {
        data: {
            viewport: HTMLCanvasElement | null;
            ctx: CanvasRenderingContext2D | null;
            created: boolean;
        }
        init(): void;
        beforeUnloadSetup(): void;
        closeGame(): boolean;
        reloadGame(): void;
        fatal(err: Error | EvalError | EvalError | MediaError | any): void;
    }
    const ErrorHandlerInstance: ErrorHandler;
}

class ErrorHandler {
    data = {
        viewport: null,
        /**
         * @type {CanvasRenderingContext2D}
         */
        ctx: null,
        created: false
    };

    init = function () {
        this.data.created = true;
        const w = CONFIG_CONSTANTS.MAINCONTAINER.offsetWidth;
        const h = CONFIG_CONSTANTS.MAINCONTAINER.offsetHeight;

        this.data.viewport = Utils.Canvas.generateCanvas(w, h, CONFIG_CONSTANTS.ZINDEX.ERROR);
        this.data.viewport.id = "errorViewPort";
        this.data.ctx = this.data.viewport.getContext('2d');
        CONFIG_CONSTANTS.CONTAINER?.insertBefore(this.data.viewport, CONFIG_CONSTANTS.CONTAINER.firstChild);
    };

    beforeUnloadSetup = function () {
        window.addEventListener("beforeunload", function (e) {
            var confirmationMessage = GameTranslate("EventBeforeUnload");

            e.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
            return confirmationMessage; // Gecko, WebKit, Chrome <34
        });
    };

    closeGame = function () {
        if (confirm("Are you sure?")) {
            close();
        }
        return false;
    };

    reloadGame = function () {
        //true for firefox
        location.reload();
    };

    /**
     * Show error on canvas, for fatal one that block and stops the game.
     * @param {Error} e The error.
     */
    fatal = function (e) {
        //stop the loading screen if there is one
        // LoadingScreenManager.end();

        //clear all canvas
        const ac = document.getElementsByTagName("canvas");
        for (var c of ac) c.getContext('2d')?.clearRect(0, 0, c.width, c.height);

        const w = this.data.viewport.offsetWidth,
            h = this.data.viewport.offsetHeight;
        console.error(e);
        try {
            //stop the game loops
            // window.cancelAnimationFrame(window.game.GameLoop.stopLoop);
        } catch (err) {
            console.log(err);
        }

        const ctx = this.data.ctx;
        //show error
        ctx.fillStyle = "#ffe388";
        ctx.font = "bold 16px serif";
        ctx.textAlign = "left";
        ctx.clearRect(0, 0, w, h);
        const report = e.stack.split("\n");
        for (let i = 0; i < report.length; i++) {
            const reportWidth = ctx.measureText(report[i]).width;
            if (reportWidth >= w) report.push(GameTranslate("WindowManagerLongLog"));
            ctx.fillText(report[i], 40, 100 + 16 * i, w);
        }
        ctx.fillStyle = "#ff0000";
        ctx.font = "bold 32px serif";
        ctx.textBaseline = 'top';
        ctx.fillText(GameTranslate("WindowManagerFatalError"), 40, 40);
    };
}

export const ErrorHandlerInstance = new ErrorHandler(); 