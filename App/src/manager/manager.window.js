/// <reference path="../../ts/type.d.ts"/>
function WindowManager() {
    throw new Error("WindowManager is a static class.");
}

WindowManager.data = {
    viewport: null,
    /**
     * @type {CanvasRenderingContext2D}
     */
    ctx: null,
    created: false
};

WindowManager.init = function () {
    WindowManager.data.created = true;
    const w = ConfigConst.MAINCONTAINER.offsetWidth;
    const h = ConfigConst.MAINCONTAINER.offsetHeight;

    WindowManager.data.viewport = generateCanvas(w, h, ConfigConst.ZINDEX.ERROR);
    WindowManager.data.viewport.id = "errorViewPort";
    WindowManager.data.ctx = WindowManager.data.viewport.getContext('2d');
    ConfigConst.CONTAINER.insertBefore(WindowManager.data.viewport, ConfigConst.CONTAINER.firstChild);
};

WindowManager.beforeUnloadSetup = function () {
    window.addEventListener("beforeunload", function (e) {
        var confirmationMessage = GameTranslate("EventBeforeUnload");

        e.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
        return confirmationMessage; // Gecko, WebKit, Chrome <34
    });
};

WindowManager.closeGame = function () {
    if (confirm("Are you sure?")) {
        close();
    }
    return false;
};

WindowManager.reloadGame = function () {
    //true for firefox
    location.reload(true);
};

/**
 * Show error on canvas, for fatal one that block and stops the game.
 * @param {Error} e The error.
 */
WindowManager.fatal = function (e) {
    //stop the loading screen if there is one
    LoadingScreenManager.end();

    //clear all canvas
    const ac = document.getElementsByTagName("canvas");
    for (var c of ac) c.getContext('2d').clearRect(0, 0, c.width, c.height);

    const w = WindowManager.data.viewport.offsetWidth,
        h = WindowManager.data.viewport.offsetHeight;
    console.error(e);
    try {
        //stop the game loops
        window.cancelAnimationFrame(window.game.GameLoop.stopLoop);
    } catch (err) {
        console.log(err);
    }

    const ctx = WindowManager.data.ctx;
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