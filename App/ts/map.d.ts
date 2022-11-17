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

}