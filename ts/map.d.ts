export { }

declare global {

    type GameMapPattern = {
        compressionlevel: number,
        height: number,
        infinite: true,
        layers: GameMapLayer[],
        nextlayerid: number,
        nextobjectid: number,
        orientation: "orthogonal",
        renderorder: "left-up",
        tiledversion: "1.8.4",
        tileheight: number,
        tilesets: GameMapTileSet[],
        tilewidth: number,
        type: "map",
        version: "1.8",
        width: number
    }

    type GameMapLayer = {
        chunks: GameMapChunk[],
        height: number,
        id: number,
        name: "Ground" | "Over" | "Collision",
        opacity: number,
        startx: number,
        starty: number,
        type: "tilelayer",
        visible: boolean,
        width: number,
        x: number,
        y: number
    }

    type GameMapChunk = {
        data: number[],
        height: number,
        width: number,
        x: number,
        y: number
    }

    type GameMapTileSet = {
        firstgid: number,
        /**String pattern: ../.../Name.tsx*/
        source: string
    }

    type GameMapEvent = {
        x: number,
        y: number,
        o: OrientationType,
        /**Event name. */
        e: string,
        /**Arguments for the event */
        a: any[]
        /**Type of the event for the animated tile */
        t: number
        //TODO conditions to enable the event
    }

    type MapData = {
        [number: string]: {
            /** Player spawn possibilities. */
            player: { x: number, y: number, o: GameOrientation }[],
            entities: GameEntitiesOptions[],
            events: GameMapEvent[]
        }
    }

    type MapUIPopup = {
        string: string,
        // TODO find a way to keep the right coos even after a resize
        x: number,
        y: number,
        fade: number,
        time: number
    }
}