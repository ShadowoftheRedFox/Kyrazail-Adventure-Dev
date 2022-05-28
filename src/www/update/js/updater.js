import { generateCanvas } from "../build/canvas.js";
import { gameUpdate } from "../core/update.js";
import { gameRender } from "../core/render.js";
import { gameEdit } from "../core/edit.js";
import { gameLoop } from "../core/loop.js";
import { UpdateMenu } from "./updateMenu.js";

export function Updater(w, h, tfps) {
    // Instantiate an empty state object
    this.state = {};

    // Setup some constants, that aren't to save
    this.constants = {
        targetFps: 60
    };

    this.config = {
        //if the game will update at the next start
        willUpdate: false,
        //the fps the game will be running
        targetFps: 60,
        //quality of the game, add or removes details
        quality: 3,
        //adjusting color if needed
        filter: {
            red: 0,
            green: 0,
            blue: 0
        },
        //always run enabled or disabled
        alwaysRun: false,
        //language of the game
        lang: "en",
        //key input
        keyBoard: {
            //? See all KEY NAME here: https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/#a-full-list-of-key-event-values
            //! It is not recommended to put same keys at two different functionnality
            up: ["ArrowUp", "z"],
            down: ["ArrowDown", "s"],
            right: ["ArrowRight", "d"],
            left: ["ArrowLeft", "q"],
            run: ["Shift"],
            interaction: ["e", "Enter"],
            debug: ["k"],
            pause: ["p"],
            back: ["Backspace", "x"],
            confirm: ["Enter"],
            inventory: ["c", "a"]
        }
    };

    // Generate a canvas and store it as our viewport
    this.viewport = generateCanvas(w, h);
    this.viewport.id = "gameViewport";

    // Get and store the canvas context as a global
    this.context = this.viewport.getContext('2d');
    this.context.textAlign = 'middle';
    this.constants.defaultFilter = this.context.filter;

    // Instantiate core modules with the current scope
    this.update = gameUpdate(this);
    this.render = gameRender(this);
    this.edit = gameEdit(this);
    this.loop = gameLoop(this);

    var that = this;
    // Append viewport into our container within the dom
    var $container = document.getElementById('container');
    $container.insertBefore(this.viewport, $container.firstChild);

    var createMenu = function createMenu() {
        that.state.menu = that.state.menu || {};
        that.state.menu.main = new UpdateMenu(that);
    }();
    console.log("Running");
}