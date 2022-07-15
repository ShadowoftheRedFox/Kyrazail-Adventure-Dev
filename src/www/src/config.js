/****************************************************************************
 *                                                                          *
 *                                 BE AWARE                                 *
 *                     MANUALLY CHANGING THOSE SETTINGS                     *
 *                           MAY BRAKE THE GAMES                            *
 *                 DO NOT TOUCH UNLESS YOU KNOW WHAT TO DO                  *
 *                                                                          *
 *                                                                          *
 *                 THOSE PARAMETERS CAN BE EDITED IN GAMES                  *
 *                                                                          *
 ****************************************************************************/
const defaultConfig = {
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
        interaction: ["e", "Enter"], //in game, with the player
        debug: ["k"],
        pause: ["p"],
        back: ["Backspace", "x"],
        confirm: ["Enter"], //in menu
        inventory: ["c", "a"]
    }
};