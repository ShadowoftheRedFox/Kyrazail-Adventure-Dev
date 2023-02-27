

class GameEntityPlayer extends GameEntitiesClass {
    /**
     * @param {GameScope} scope
     * @param {number} x spawn position x
     * @param {number} y spawn position y
     * @param {GameOrientation} o spawn orientation
     */
    constructor(scope, x, y, o) {
        super({
            // TODO change by the name of the player
            name: "GamePlayer",
            type: "player",
            pattern: "player",
            movementSpeed: 1,
            x: x,
            y: y,
            orientation: o,
            character: {
                invisible: false,
                // TODO change below to be in accord to the character choosen
                src: "Characters/Spiritual",
                col: 0,
                row: 0
            },
            speakImage: "Faces/Spiritual",
            speakCol: 0,
            speakRow: 0
        });
    }
    /*
    ! This class is only used to render the player on the map
    */
}