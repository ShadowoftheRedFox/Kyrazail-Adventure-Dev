
function LoadingScreenManager() {
    throw new Error("LoadingScreenmanager is a static class.");
}

const LSM = LoadingScreenManager;

LSM.w = 0;
LSM.h = 0;

LSM.progress = 0;
LSM.interval = 0;
LSM.progressMax = 10;
LSM.progressLast = 0;
LSM.refreshSpeed = 20;
LSM.progressSmooth = 20;
LSM.progressAnimation = 0;
LSM.message = "Initialisation";

/**
 * @type {CanvasRenderingContext2D | null}
 */
LSM.ctx = null;
/**
 * @type {HTMLCanvasElement | null}
 */
LSM.viewport = null;

LSM.trailingStep = 0;
LSM.trailingCount = 0;
LSM.trailingSpeed = 1000;

LSM.tipIndex = 0;
LSM.tipCount = 0;
LSM.tipSpeed = 15;

LSM.stripeStep = 0;
LSM.stripeSpeed = 0.6;
LSM.stripeAlpha = 0.3;
LSM.stripeColor = "#9c9c9c";

LSM.animationW = (function (a) { return a[Math.floor(Math.random() * a.length)]; })([0, 3, 9]);
LSM.animationH = (function (a) { return a[Math.floor(Math.random() * a.length)]; })([2, 6]);
LSM.animationStep = 0;
LSM.animationImage = null;
LSM.animationMargin = 100;
LSM.animationLastStep = 0;
LSM.animationStepCount = 0;
LSM.animationStepSpeed = 250;
LSM.animationStepSpeedDistance = 16;
LSM.animationPositionSpeed = function (w) {
    return (w + LSM.animationMargin * 2) / ((LSM.tipSpeed * 1000) / LSM.refreshSpeed);
};
LSM.animationPosition = -LSM.animationMargin;

LSM.calledEqual = false;
LSM.e = 0;

LSM.init = function (callOnEqual) {
    if (callOnEqual && typeof callOnEqual !== "function") throw new TypeError("callOnEqual is not a function.");
    if (LSM.viewport) return console.warn("LSM has already been started.");

    document.getElementById("textPreLoading").hidden = true;

    const $ = ConfigConst.MAINCONTAINER,
        $c = ConfigConst.CONTAINER;

    var w = $.offsetWidth;
    var h = $.offsetHeight;

    LSM.viewport = generateCanvas(w, h, ConfigConst.ZINDEX.LOADING);
    LSM.viewport.id = "LoadingScreenViewport";
    LSM.ctx = LSM.viewport.getContext("2d");
    LSM.w = w;
    LSM.h = h;

    $c.insertBefore(LSM.viewport, $c.firstChild);
    const i = new Image();
    i.onload = () => LSM.animationImage = i;
    i.onerror = () => WindowManager.fatal(new MediaError(`${i.src} failed`));
    i.src = document.getElementById("LoadingScreenAnimationImage").src;

    LSM.interval = setInterval(() => {
        if ($.offsetWidth !== LSM.w || $.offsetHeight !== LSM.h) {
            regenerateCanvas(LSM.viewport, $.offsetWidth, $.offsetHeight);
            LSM.w = $.offsetWidth;
            LSM.h = $.offsetHeight;
        }

        if (LSM.progress == LSM.progressMax && LSM.calledEqual === false) {
            if (callOnEqual && typeof callOnEqual == "function") {
                callOnEqual();
                console.log("called");
            }
            LSM.calledEqual = true;
        }

        LSM.stripeStep += LSM.stripeSpeed;
        if (LSM.stripeStep > LSM.h / 20) LSM.stripeStep = 0;

        LSM.edit();
    }, LSM.refreshSpeed);
};

LSM.end = function () {
    if (LSM.viewport) removeElement(LSM.viewport.id);
    clearInterval(LSM.interval);
    LSM.animationImage = LSM.viewport = LSM.stripePattern = LSM.ctx = null;
};

LSM.edit = function () {
    if (!LSM.ctx) return console.log("no ctx");
    // to hide anything behind the loading screen
    LSM.ctx.fillStyle = "#000";
    LSM.ctx.fillRect(0, 0, LSM.w, LSM.h);

    try {
        LSM.title();
        LSM.bar();
        LSM.tip();
        LSM.animate();
    } catch (e) {
        WindowManager.fatal(e);
        LSM.end();
    }
};

LSM.bar = function () {
    const ctx = LSM.ctx,
        w = LSM.w,
        h = LSM.h;

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
    LSM.progressFunction();

    // progress bar progress %
    let b = (LSM.progressAnimation / LSM.progressMax);
    let p = Math.floor(b * 100);
    if (Math.random() * 100000 <= 1) LSM.e = Date.now();
    if (LSM.e + 1000 >= Date.now()) { p = "666"; b = 1; }

    ctx.fillStyle = grd;
    RectangleCreator.roundRect(ctx, w / 5, h * 9 / 10, b * w * 6 / 10, h / 20, 30, true);
    ctx.fillStyle = LSM.createPattern(LSM.stripeColor, LSM.stripeAlpha);
    RectangleCreator.roundRect(ctx, w / 5, h * 9 / 10, b * w * 6 / 10, h / 20, 30, true);

    ctx.fillStyle = "#fff";
    // true progress %
    // let p = Math.floor((LSM.progress / LSM.progressMax) * 1000) / 10;


    // animated %
    // ctx.fillText(`${p}%`, (LSM.progressAnimation) * w * 6 / 10 / 2 + w / 5, h * 9 / 10);

    // static %
    ctx.fillText(`${p}%`, w / 2, h * 9 / 10 + h / 40);
};

LSM.animate = function () {
    const ctx = LSM.ctx,
        w = LSM.w,
        h = LSM.h;

    if (!LSM.animationImage) return;

    // step with time delay
    if (LSM.animationStepCount + LSM.animationStepSpeed < Date.now()) {
        // LSM.animationStepCount = Date.now();
        // LSM.animationStep = (LSM.animationStep == 0) ? 2 : 0;
    }

    // step with distance walked delay
    if (LSM.animationPosition > LSM.animationLastStep + LSM.animationStepSpeedDistance) {
        LSM.animationLastStep = LSM.animationPosition;
        LSM.animationStep = (LSM.animationStep == 0) ? 2 : 0;
    }

    LSM.animationPosition += LSM.animationPositionSpeed(w);
    if (LSM.animationPosition > LSM.animationMargin + LSM.w) {
        LSM.animationPosition = -LSM.animationMargin;
        //also randomise the new character
        LSM.animationH = [2, 6].random();
        LSM.animationW = [0, 3, 9].random();
        LSM.animationLastStep = 0;
    }

    // console.log(LSM.animationW , LSM.animationStep)

    ctx.drawImage(LSM.animationImage,
        (LSM.animationW + LSM.animationStep) * 32,
        LSM.animationH * 32,
        32, 32,
        LSM.animationPosition, h * 7 / 10,
        32, 32
    );
};

LSM.tip = function () {
    const ctx = LSM.ctx,
        w = LSM.w,
        h = LSM.h;

    ctx.fillStyle = "#fff";
    ctx.font = "16px Azure";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (LSM.tipCount + LSM.tipSpeed * 1000 < Date.now()) {
        LSM.tipCount = Date.now();
        LSM.tipIndex = Math.floor(ConfigConst.TIP.length * Math.random());
    }

    ctx.fillText(ConfigConst.TIP[LSM.tipIndex], w / 2, h * 9 / 10 - 20, w);
};

LSM.title = function () {
    if (Date.now() >= LSM.trailingSpeed + LSM.trailingStep) {
        LSM.trailingCount++;
        LSM.trailingStep = Date.now();
    }

    let trailing = "";
    switch (LSM.trailingCount % 4) {
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

    const ctx = LSM.ctx,
        w = LSM.w,
        h = LSM.h;

    ctx.fillStyle = "#ffffff";
    ctx.font = "32px Azure";
    ctx.textAlign = "center";
    ctx.fillText(`${LSM.message}${trailing}`, w / 2, h / 2);
    ctx.font = "1px Unreadable";
    ctx.fillText(".", 0, 0); // pre load Unreadble font
    ctx.font = "1px Takhi";
    ctx.fillText(".", 0, 0); // pre load Takhi font, for places names
};

LSM.addProgress = function (n) {
    if (!n || n <= 0) throw new TypeError("n must be a positiv integer");
    LSM.progress += n;
    LSM.progressLast = n;
    if (LSM.progress > LSM.progressMax) LSM.progress = LSM.progressMax;

};

LSM.setMaxProgress = function (n) {
    if (!n || n <= 0) throw new TypeError("n must be a positiv integer");
    LSM.progress = 0;
    LSM.progressLast = 0;
    LSM.progressAnimation = 0;
    LSM.progressMax = n;
    LSM.calledEqual = false;
};

LSM.createPattern = function (color = "grey", alpha = 1) {
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    let h = LSM.h / 10,
        w = LSM.h / 10,
        offset = 4,
        step = LSM.stripeStep;

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
LSM.progressFunction = function () {
    /** The amount of frame for progressAnimation to reach progress. */
    var g = LSM.progressMax / (LSM.progress - LSM.progressAnimation), //LSM.progressSmooth,
        /** The max amount of progress. */
        m = LSM.progressMax,
        /** The current progress. equal 0 <= x <= maxProgress */
        p = LSM.progress,
        /** The last amount of progress added. */
        l = LSM.progressLast,
        /** The smoothing effect, equal 0 < x <= progress <= 100 */
        c = LSM.progressAnimation;

    // get the current pourcentage filled with the animation smoothing
    let $ = c;

    // to finish the loading bar, because g leads towards infinity, we need to cut him down at one point
    if (g > m / LSM.progressSmooth) {
        g = LSM.progressSmooth;
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
    LSM.progressAnimation = $;
};