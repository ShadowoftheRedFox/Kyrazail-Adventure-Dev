import { CONFIG_CONSTANTS } from "../config/game.config";
import { Game } from "../game";
import { generateCanvas } from "../util/util.canvas";

export type GameInterfacesOptions = {
    asOwnCanvas?: boolean;
    canvasGroup?: string;
    zindex?: number;
    requiredImage?: string[];
    requiredAudio?: string[];
    transitionSpawn?: boolean;
    transitionSpawnDuration?: number;
    transitionLeave?: boolean;
    transitionLeaveDuration?: number;
    activated?: boolean;
    needsUpdate?: boolean;
}

export class GameInterfaces {
    asOwnCanvas: boolean;
    canvasGroup: string;
    zindex: number;
    requiredImage: string[];
    requiredAudio: string[];
    transitionSpawn: boolean;
    transitionSpawnDuration: number;
    transitionLeave: boolean;
    transitionLeaveDuration: number;
    activated: boolean;
    needsUpdate: boolean;
    resized: boolean;
    spawned: boolean;

    render(scope: Game): void { };
    update(scope: Game): Game { return scope };
    interfaceCanvas: HTMLCanvasElement;

    validateOptions(options: GameInterfacesOptions, scope: Game): void {
        if (!options) throw new ReferenceError("You must pass options for the interface.");
        if (!this.render || typeof this.render != "function") throw new ReferenceError("You must pass a render method to the interface.");
        if (!this.update || typeof this.update != "function") throw new ReferenceError("You must pass a update method to the interface.");
        if (options.requiredAudio && options.requiredAudio.length > 0) GameAudiosToLoad = GameAudiosToLoad.concat(options.requiredAudio);
        if (options.requiredImage && options.requiredImage.length > 0) GameImagesToLoad = GameImagesToLoad.concat(options.requiredImage);

        // create or get context depending of the parameters
        if (options.asOwnCanvas === true) {
            this.interfaceCanvas = generateCanvas(CONFIG_CONSTANTS.MAINCONTAINER.offsetWidth, CONFIG_CONSTANTS.MAINCONTAINER.offsetHeight, this.zindex);
            this.interfaceCanvas.id = this.canvasGroup;
            scope.cache.context[this.canvasGroup] = this.interfaceCanvas.getContext("2d");
            CONFIG_CONSTANTS.CONTAINER?.insertBefore(this.interfaceCanvas, CONFIG_CONSTANTS.CONTAINER.firstChild);
        } else {
            if (!scope.cache.context[this.canvasGroup]) throw new ReferenceError(`${this.canvasGroup} has not yet been created.`);
            Array.from(document.getElementsByTagName("canvas")).forEach((el) => {
                if (el.id == this.canvasGroup) {
                    this.interfaceCanvas = el;
                    return;
                }
            })
        }

        // push the entity to the cache
    };

    constructor(options: GameInterfacesOptions, scope: Game) {
        this.asOwnCanvas = options.asOwnCanvas || false;
        this.canvasGroup = options.canvasGroup || "MainGameGroup";
        this.zindex = options.zindex || CONFIG_CONSTANTS.ZINDEX.UNKNOWN;
        this.requiredImage = options.requiredImage || [];
        this.requiredAudio = options.requiredAudio || [];

        this.transitionSpawn = options.transitionSpawn || false;
        this.transitionSpawnDuration = options.transitionSpawnDuration || 1000;
        this.transitionLeave = options.transitionLeave || false;
        this.transitionLeaveDuration = options.transitionLeaveDuration || 1000;


        this.activated = options.activated || false;
        this.needsUpdate = options.needsUpdate || true;
        this.resized = true;
        this.spawned = true;
        this.validateOptions(options, scope);
    }

    /**Remove the interface from the document */
    remove() {
        this.interfaceCanvas.remove();
    }
}