class GameMapUIInterface extends GameInterfaces {
    /**
     * @param {GameScope} scope
     */
    constructor(scope) {
        super({
            asOwnCanvas: true,
            zindex: ConfigConst.ZINDEX.MAPEFFECT,
            canvasGroup: "GameMapUIGroup",
            requiredImage: [],
            requiredAudio: [],
            activated: true,
            needsUpdate: true
        }, scope);

        /**@type {MapUIPopup[]} */
        this.popup = [];
    }

    /**@param {GameScope} scope */
    render(scope) {
        const ctx = scope.cache.context[this.canvasGroup];
        const Width = scope.w;
        const Height = scope.h;

        ctx.clearRect(0, 0, Width, Height);

        ctx.font = "12px Senior";
        ctx.fillStyle = "white";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        this.popup.forEach(pop => {
            ctx.globalAlpha = pop.fade;
            ctx.fillText(pop.string.CapitalizeFirstLetterSentence(), pop.x, pop.y);
            //BUG not centered?
        });
        this.needsUpdate = false;
    }

    /**@param {GameScope} scope */
    update(scope) {
        const Player = scope.state.entities.player;
        this.popup.forEach((pop, id) => {
            // TODO update the pos if player has moved

            // delete the popup after 2s
            if (pop.time + 2000 < Date.now()) {
                this.popup.splice(id, 1);
            }
            // start the fading after 1s, fade for 1s
            // create the fading effect
            if (pop.time + 1000 < Date.now()) {
                pop.fade = (((pop.time + 1000) - (Date.now() - 1000)) / 2000) * 2;
            }
            // to make the text go up
            pop.y -= 0.2;
        });

        if (this.popup.length == 0) {
            this.activated = false;
            this.interfaceCanvas.hidden = true;
        } else {
            this.needsUpdate = true;
        }
    }

    /**
     * @param {GameScope} scope
     * @param {string} string 
     */
    newPopup(scope, string) {
        this.popup.push({
            string: string,
            x: scope.w / 2 + 16,
            y: scope.h / 2 - 8,
            fade: 1,
            time: Date.now()
        });
        this.activated = true;
        this.interfaceCanvas.hidden = false;
    }
}