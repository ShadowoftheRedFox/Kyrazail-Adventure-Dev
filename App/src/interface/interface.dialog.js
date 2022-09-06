/// <reference path="../../ts/type.d.ts"/>

class GameDialogInterface extends GameInterfaces {
    /**
     * @param {GameScope} scope
     */
    constructor(scope) {
        super({
            asOwnCanvas: true,
            zindex: ConfigConst.ZINDEX.DIALOG,
            canvasGroup: "GameDialogGroup"
        }, scope);
        /**
         * @type {{id: number, text: string, image: string}[]}
         */
        this.textList = [];
        this.callback = null;
    }

    render(scope) {
        this.needsUpdate = false;
    }
    update(scope) {
        if (this.textList.length > 0) {
            console.log("got");
        }
    }
}