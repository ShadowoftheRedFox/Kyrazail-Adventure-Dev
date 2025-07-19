import { Game } from "./game";

declare global {
    var GameAudiosToLoad: string[]
    var GameImagesToLoad: string[]
}

window.onload = () => {
    const KyrazailAdventure = new Game();
};