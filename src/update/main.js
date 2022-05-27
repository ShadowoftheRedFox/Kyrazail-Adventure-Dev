//we need to work with module because we need to import octokit
import { Updater } from "./js/updater.js";

// wait for the HTML to load
window.onload = function() {
    console.log("Html domain is fully loaded, starting game.");
    // Instantiate a new game in the global scope at good proportions
    const container = document.getElementById("mainContainer");
    window.game = new Updater(container.offsetWidth, container.offsetHeight, 60);
    document.getElementById('gameViewport').ondragstart = function() {
        return false;
    };
};