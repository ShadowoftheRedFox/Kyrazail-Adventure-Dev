class GameEntityPlayer extends GameEntitiesClass {
    /**
     * @param {GameScope} scope
     * @param {number} x spawn position x
     * @param {number} y spawn position y
     * @param {GameOrientation} o spawn orientation
     */
    constructor(scope, x, y, o) {
        super({
            name: scope.global.player.firstName,
            type: "player",
            pattern: "player",
            movementSpeed: 1,
            x: x,
            y: y,
            orientation: o,
            character: {
                invisible: scope.global.player.character.invisible,
                src: scope.global.player.character.src,
                col: scope.global.player.character.col,
                row: scope.global.player.character.row
            },
            speakImage: scope.global.player.face.src,
            speakRow: scope.global.player.face.row,
            speakCol: scope.global.player.face.col
        });
    }
}