/// <reference path="../../ts/type.d.ts"/>

class GameEntityPlayer extends GameEntitiesClass {
    /**
     * @param {number} x spawn position x
     * @param {number} y spawn position y
     * @param {GameOrientation} o spawn orientation
     * @param {string} i character image
     * @param {number} c character image colon
     * @param {number} r character image row
     * @param {string} si speak image
     * @param {number} sc speak image colon
     * @param {number} sr speak image row
     * @param  {...any} args arguments
     */
    constructor(x, y, o, i, c, r, si, sc, sr, ...args) {
        super({
            name: { fr: "Joueur", en: "Player" },
            type: "player",
            pattern: "player",
            movementSpeed: 1,
            spawnX: x,
            spawnY: y,
            spawnOrientation: o,
            character: {
                invisible: false,
                image: i,
                col: c,
                row: r
            },
            speakImage: si,
            speakCol: sc,
            speakRow: sr
        });
    }

    render() {}

    update() {}
}