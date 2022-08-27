/// <reference path="../../ts/type.d.ts"/>
function LoadingScreenManager() {
    throw new Error("LoadingScreenmanager is a static class.");
}

LoadingScreenManager.w = 0;
LoadingScreenManager.h = 0;

LoadingScreenManager.progress = 0;
LoadingScreenManager.interval = 0;
LoadingScreenManager.progressMax = 10;
LoadingScreenManager.progressLast = 0;
LoadingScreenManager.refreshSpeed = 20;
LoadingScreenManager.progressSmooth = 20;
LoadingScreenManager.progressAnimation = 0;
LoadingScreenManager.message = "Initialisation";

/**
 * @type {CanvasRenderingContext2D | null}
 */
LoadingScreenManager.ctx = null;
/**
 * @type {HTMLCanvasElement | null}
 */
LoadingScreenManager.viewport = null;

LoadingScreenManager.trailingStep = 0;
LoadingScreenManager.trailingCount = 0;
LoadingScreenManager.trailingSpeed = 1000;

LoadingScreenManager.tipIndex = 0;
LoadingScreenManager.tipCount = 0;
LoadingScreenManager.tipSpeed = 15;

LoadingScreenManager.stripeStep = 0;
LoadingScreenManager.stripeSpeed = 0.6;
LoadingScreenManager.stripeAlpha = 0.3;
LoadingScreenManager.stripeColor = "#9c9c9c";

LoadingScreenManager.animationW = (function (a) { return a[Math.floor(Math.random() * a.length)]; })([0, 3, 9]);
LoadingScreenManager.animationH = (function (a) { return a[Math.floor(Math.random() * a.length)]; })([2, 6]);
LoadingScreenManager.animationStep = 0;
LoadingScreenManager.animationImage = null;
LoadingScreenManager.animationMargin = 100;
LoadingScreenManager.animationLastStep = 0;
LoadingScreenManager.animationStepCount = 0;
LoadingScreenManager.animationStepSpeed = 250;
LoadingScreenManager.animationStepSpeedDistance = 16;
LoadingScreenManager.animationPositionSpeed = function (w) {
    return (w + LoadingScreenManager.animationMargin * 2) / ((LoadingScreenManager.tipSpeed * 1000) / LoadingScreenManager.refreshSpeed);
};
LoadingScreenManager.animationPosition = -LoadingScreenManager.animationMargin;

LoadingScreenManager.calledEqual = false;
LoadingScreenManager.e = 0;

LoadingScreenManager.init = function (callOnEqual) {
    if (callOnEqual && typeof callOnEqual !== "function") throw new TypeError("callOnEqual is not a function.");
    if (LoadingScreenManager.viewport) return console.warn("LoadingScreenManager has already been started.");

    const $ = ConfigConst.MAINCONTAINER,
        $c = ConfigConst.CONTAINER;

    var w = $.offsetWidth;
    var h = $.offsetHeight;

    LoadingScreenManager.viewport = generateCanvas(w, h, ConfigConst.ZINDEX.LOADING);
    LoadingScreenManager.viewport.id = "LoadingScreenViewport";
    LoadingScreenManager.ctx = LoadingScreenManager.viewport.getContext("2d");
    LoadingScreenManager.w = w;
    LoadingScreenManager.h = h;

    $c.insertBefore(LoadingScreenManager.viewport, $c.firstChild);
    const i = new Image();
    i.onload = () => LoadingScreenManager.animationImage = i;
    i.onerror = () => WindowManager.fatal(new MediaError(`${i.src} failed`));
    i.src = document.getElementById("LoadingScreenAnimationImage").src;

    LoadingScreenManager.interval = setInterval(() => {
        if ($.offsetWidth !== LoadingScreenManager.w || $.offsetHeight !== LoadingScreenManager.h) {
            regenerateCanvas(LoadingScreenManager.viewport, $.offsetWidth, $.offsetHeight);
            LoadingScreenManager.w = $.offsetWidth;
            LoadingScreenManager.h = $.offsetHeight;
        }

        if (LoadingScreenManager.progress == LoadingScreenManager.progressMax && LoadingScreenManager.calledEqual === false) {
            if (callOnEqual && typeof callOnEqual == "function") {
                callOnEqual();
                GameGlobalEvent.emit("LoadingScreenFinishProgress");
                console.log("called");
            }
            LoadingScreenManager.calledEqual = true;
        }

        LoadingScreenManager.stripeStep += LoadingScreenManager.stripeSpeed;
        if (LoadingScreenManager.stripeStep > LoadingScreenManager.h / 20) LoadingScreenManager.stripeStep = 0;

        LoadingScreenManager.edit();
    }, LoadingScreenManager.refreshSpeed);
};

LoadingScreenManager.end = function () {
    if (LoadingScreenManager.viewport) removeElement(LoadingScreenManager.viewport.id);
    clearInterval(LoadingScreenManager.interval);
    LoadingScreenManager.animationImage = LoadingScreenManager.viewport = LoadingScreenManager.stripePattern = LoadingScreenManager.ctx = null;
};

LoadingScreenManager.edit = function () {
    if (!LoadingScreenManager.ctx) return console.log("no ctx");
    LoadingScreenManager.ctx.clearRect(0, 0, LoadingScreenManager.w, LoadingScreenManager.h);

    try {
        LoadingScreenManager.title();
        LoadingScreenManager.bar();
        LoadingScreenManager.tip();
        LoadingScreenManager.animate();
    } catch (e) {
        WindowManager.fatal(e);
        LoadingScreenManager.end();
    }
};

LoadingScreenManager.bar = function () {
    const ctx = LoadingScreenManager.ctx,
        w = LoadingScreenManager.w,
        h = LoadingScreenManager.h;

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
    LoadingScreenManager.progressFunction();

    // progress bar progress %
    let b = (LoadingScreenManager.progressAnimation / LoadingScreenManager.progressMax);
    let p = Math.floor(b * 100);
    if (Math.random() * 100000 <= 1) LoadingScreenManager.e = Date.now();
    if (LoadingScreenManager.e + 1000 >= Date.now()) { p = "666"; b = 1; }

    ctx.fillStyle = grd;
    RectangleCreator.roundRect(ctx, w / 5, h * 9 / 10, b * w * 6 / 10, h / 20, 30, true);
    ctx.fillStyle = LoadingScreenManager.createPattern(LoadingScreenManager.stripeColor, LoadingScreenManager.stripeAlpha);
    RectangleCreator.roundRect(ctx, w / 5, h * 9 / 10, b * w * 6 / 10, h / 20, 30, true);

    ctx.fillStyle = "#fff";
    // true progress %
    // let p = Math.floor((LoadingScreenManager.progress / LoadingScreenManager.progressMax) * 1000) / 10;


    // animated %
    // ctx.fillText(`${p}%`, (LoadingScreenManager.progressAnimation) * w * 6 / 10 / 2 + w / 5, h * 9 / 10);

    // static %
    ctx.fillText(`${p}%`, w / 2, h * 9 / 10 + h / 40);
};

LoadingScreenManager.animate = function () {
    const ctx = LoadingScreenManager.ctx,
        w = LoadingScreenManager.w,
        h = LoadingScreenManager.h;

    if (!LoadingScreenManager.animationImage) return;

    // step with time delay
    if (LoadingScreenManager.animationStepCount + LoadingScreenManager.animationStepSpeed < Date.now()) {
        // LoadingScreenManager.animationStepCount = Date.now();
        // LoadingScreenManager.animationStep = (LoadingScreenManager.animationStep == 0) ? 2 : 0;
    }

    // step with distance walked delay
    if (LoadingScreenManager.animationPosition > LoadingScreenManager.animationLastStep + LoadingScreenManager.animationStepSpeedDistance) {
        LoadingScreenManager.animationLastStep = LoadingScreenManager.animationPosition;
        LoadingScreenManager.animationStep = (LoadingScreenManager.animationStep == 0) ? 2 : 0;
    }

    LoadingScreenManager.animationPosition += LoadingScreenManager.animationPositionSpeed(w);
    if (LoadingScreenManager.animationPosition > LoadingScreenManager.animationMargin + LoadingScreenManager.w) {
        LoadingScreenManager.animationPosition = -LoadingScreenManager.animationMargin;
        //also randomise the new character
        LoadingScreenManager.animationH = [2, 6].random();
        LoadingScreenManager.animationW = [0, 3, 9].random();
        LoadingScreenManager.animationLastStep = 0;
    }

    // console.log(LoadingScreenManager.animationW , LoadingScreenManager.animationStep)

    ctx.drawImage(LoadingScreenManager.animationImage,
        (LoadingScreenManager.animationW + LoadingScreenManager.animationStep) * 32,
        LoadingScreenManager.animationH * 32,
        32, 32,
        LoadingScreenManager.animationPosition, h * 7 / 10,
        32, 32
    );
};

LoadingScreenManager.tip = function () {
    const ctx = LoadingScreenManager.ctx,
        w = LoadingScreenManager.w,
        h = LoadingScreenManager.h;

    ctx.fillStyle = "#fff";
    ctx.font = "16px Azure";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (LoadingScreenManager.tipCount + LoadingScreenManager.tipSpeed * 1000 < Date.now()) {
        LoadingScreenManager.tipCount = Date.now();
        LoadingScreenManager.tipIndex = Math.floor(ConfigConst.TIP.length * Math.random());
    }

    ctx.fillText(ConfigConst.TIP[LoadingScreenManager.tipIndex], w / 2, h * 9 / 10 - 20);
};

LoadingScreenManager.title = function () {
    if (Date.now() >= LoadingScreenManager.trailingSpeed + LoadingScreenManager.trailingStep) {
        LoadingScreenManager.trailingCount++;
        LoadingScreenManager.trailingStep = Date.now();
    }

    let trailing = "";
    switch (LoadingScreenManager.trailingCount % 4) {
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

    const ctx = LoadingScreenManager.ctx,
        w = LoadingScreenManager.w,
        h = LoadingScreenManager.h;

    ctx.fillStyle = "#ffffff";
    ctx.font = "32px Azure";
    ctx.textAlign = "center";
    ctx.fillText(`${LoadingScreenManager.message}${trailing}`, w / 2, h / 2);
    ctx.font = "1px Unreadable";
    ctx.fillText(".", 0, 0); // pre load unreadble font
};

LoadingScreenManager.addProgress = function (n) {
    if (!n || n <= 0) throw new TypeError("n must be a positiv integer");
    LoadingScreenManager.progress += n;
    LoadingScreenManager.progressLast = n;
    if (LoadingScreenManager.progress > LoadingScreenManager.progressMax) LoadingScreenManager.progress = LoadingScreenManager.progressMax;

};

LoadingScreenManager.setMaxProgress = function (n) {
    if (!n || n <= 0) throw new TypeError("n must be a positiv integer");
    LoadingScreenManager.progress = 0;
    LoadingScreenManager.progressLast = 0;
    LoadingScreenManager.progressAnimation = 0;
    LoadingScreenManager.progressMax = n;
    LoadingScreenManager.calledEqual = false;
};

LoadingScreenManager.createPattern = function (color = "grey", alpha = 1) {
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    let h = LoadingScreenManager.h / 10,
        w = LoadingScreenManager.h / 10,
        offset = 4,
        step = LoadingScreenManager.stripeStep;

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
LoadingScreenManager.progressFunction = function () {
    /** The amount of frame for progressAnimation to reach progress. */
    var g = LoadingScreenManager.progressMax / (LoadingScreenManager.progress - LoadingScreenManager.progressAnimation), //LoadingScreenManager.progressSmooth,
        /** The max amount of progress. */
        m = LoadingScreenManager.progressMax,
        /** The current progress. equal 0 <= x <= maxProgress */
        p = LoadingScreenManager.progress,
        /** The last amount of progress added. */
        l = LoadingScreenManager.progressLast,
        /** The smoothing effect, equal 0 < x <= progress <= 100 */
        c = LoadingScreenManager.progressAnimation;

    // get the current pourcentage filled with the animation smoothing
    let $ = c;

    // to finish the loading bar, because g leads towards infinity, we need to cut him down at one point
    if (g > m / LoadingScreenManager.progressSmooth) {
        g = LoadingScreenManager.progressSmooth;
    }

    // add the travel part in one frame
    $ += l / g;

    // check if we reached the current progress
    if ($ > p) {
        $ = p;
    }
    // in case something went wrong
    if (!ConfigConst.DEBUG && $ <= 0) $ = p;

    //update result
    LoadingScreenManager.progressAnimation = $;
};