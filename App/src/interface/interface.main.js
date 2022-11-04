/// <reference path="../../ts/type.d.ts"/>

const GameMainInterfaceTopBackground = [
    ["Battlebacks1/Ship", "Battlebacks2/Ship", "white"],
    ["Battlebacks1/Clouds", "Battlebacks2/Clouds", "black"],
    ["Battlebacks1/Sky", "Battlebacks2/Sky", "black"],
    ["Battlebacks1/Snowfield", "Battlebacks2/Snowfield", "black"],
    ["Battlebacks1/Snow", "Battlebacks2/Snowfield", "black"],
    ["Battlebacks1/Dirt1", "Battlebacks2/Cliff", "black"],
    ["Battlebacks1/Dirt2", "Battlebacks2/Port", "black"],
    ["Battlebacks1/Grassland", "Battlebacks2/Forest1", "black"],
    ["Battlebacks1/GrassMaze", "Battlebacks2/Forest2", "white"],
    ["Battlebacks1/Cobblestones4", "Battlebacks2/Bridge", "black"]
];
const GameMainInterfaceChoosen = GameMainInterfaceTopBackground[Math.floor(Math.random() * GameMainInterfaceTopBackground.length)];
class GameMainInterface extends GameInterfaces {
    /**
     * @param {GameScope} scope
     */
    constructor(scope) {
        super({
            asOwnCanvas: true,
            zindex: ConfigConst.ZINDEX.MAIN,
            canvasGroup: "GameMainGroup",
            requiredImage: [
                "System/Window",
                GameMainInterfaceChoosen[0], GameMainInterfaceChoosen[1],
                "Icon/Account", "Icon/Discord", "Icon/Github", "Icon/Website",
                "Faces/Spiritual"
            ],
            requiredAudio: ["MAIN/Adeste", "MAIN/Dramatic", "MAIN/Moon", "MAIN/Silence"],
            transitionLeave: true,
            transitionSpawn: true
        }, scope);

        this.menu = new GameMenuBuilder(scope, document.getElementById(this.canvasGroup), {
            background: [GameMainInterfaceChoosen[0], GameMainInterfaceChoosen[1]]
        });
    }

    /**
     * @param {GameScope} scope
     * @param {this} that 
     */
    render(scope) {
        this.needsUpdate = this.menu.menuRender(scope);
    }

    /**
     * @param {GameScope} scope
     * @param {this} that 
     */
    update(scope) { this.menu.menuUpdate(scope); }
}