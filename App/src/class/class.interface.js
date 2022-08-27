/// <reference path="../../ts/type.d.ts"/>

class GameInterfaces {
    /**
     * @param {GameInterfacesOptions} options
     * @param {GameScope} scope 
     */
    constructor(options, scope) {
        this.asOwnCanvas = options.asOwnCanvas || false;
        this.canvasGroup = options.canvasGroup || "MainGameGroup";
        this.zindex = options.zindex || ConfigConst.ZINDEX.UNKNOWN;
        this.requiredImage = options.requiredImage || [];
        this.requiredAudio = options.requiredAudio || [];

        this.transitionSpawn = options.transitionSpawn || false;
        this.transitionSpawnDuration = options.transitionSpawnDuration || 1000;
        this.transitionLeave = options.transitionLeave || false;
        this.transitionLeaveDuration = options.transitionLeave || 1000;


        this.activated = options.activated || false;
        this.needsUpdate = options.needsUpdate || true;
        this.spawned = true;
        this.validateOptions(options, scope);
    }
    /**
     * @param {GameInterfacesOptions} options 
     * @param {GameScope} scope 
     */
    validateOptions(options, scope) {
        if (!options) throw new ReferenceError("You must pass options for the interface.");
        if (!this.render || typeof this.render != "function") throw new ReferenceError("You must pass a render method to the interface.");
        if (!this.update || typeof this.update != "function") throw new ReferenceError("You must pass a update method to the interface.");
        if (options.requiredAudio && options.requiredAudio.length > 0) GameAudiosToLoad = GameAudiosToLoad.concat(options.requiredAudio);
        if (options.requiredImage && options.requiredImage.length > 0) GameImagesToLoad = GameImagesToLoad.concat(options.requiredImage);

        // create or get context depending of the parameters
        if (options.asOwnCanvas === true) {
            this.interfaceCanvas = generateCanvas(ConfigConst.MAINCONTAINER.offsetWidth, ConfigConst.MAINCONTAINER.offsetHeight, this.zindex);
            this.interfaceCanvas.id = this.canvasGroup;
            scope.cache.context[this.canvasGroup] = this.interfaceCanvas.getContext("2d");
            ConfigConst.CONTAINER.insertBefore(this.interfaceCanvas, ConfigConst.CONTAINER.firstChild);
        } else {
            if (!scope.cache.context[this.canvasGroup]) throw new ReferenceError(`${this.canvasGroup} has not yet been created.`);
            this.interfaceCanvas = document.getElementById(this.canvasGroup);
        }
    }
}