import { Z_INDEX } from "./event.config";

export const GAME_CONFIG = {
    willUpdate: false,
    targetFps: 60,
    alwaysRun: false,
    keyBoard: {
        up: ["arrowup", "z"],
        down: ["arrowdown", "s"],
        right: ["arrowright", "d"],
        left: ["arrowleft", "q"],
        run: ["shift"],
        pause: ["p", "escape"],
        back: ["backspace", "x"],
        confirm: ["e", "enter"],
        inventory: ["i", "a"]
    }
};

export const CONFIG_CONSTANTS = {
    KEY: "cn40'9@W+9)S&7§:e9+.{&y&uÙtA!h[3R-31:l'5]]:h$0>@ui!0z$FIiU£lb9H6BFST+*§[TwSdjm7.6)26N§=>)068geSUeY£!R%[£0!£%+8.IQ&(N/&Ipi%)Lm;.B3}D/1hvnSNlZJA]G[,2}v(9[<}-73z=/pJ$kQ0UQhp<n<]--x!=S.O;.§§*tBPwE§£CmgiXK",
    DISCORD: "https://discord.gg/5mF5AHnRCr",
    GITHUB: "https://github.com/ShadowoftheRedFox/Kyrazail-Adventure-Dev.git",
    LANGUAGE: "en",
    ZINDEX: Z_INDEX,
    TIP: [
        "Why is mana blue?",
        "Don't forget to save often!",
        "Bosses can give you special items!",
        "Use potions if the fight is too tough.",
        "Stronger monsters give you better loots!",
        "Found a bug? Check out our Discord to report it!",
        "Monsters respawn after a certain amount of time...",
        "The most expensive equipement is not always the best...",
        "You can try to escape any fight, but you better be lucky.",
        "Search around the map, maybe you will find something interesting...",
        "There is a land were God left something... It's a myth of course, right?",
        "You can find Dinarks everywhere. You can even make them if you know how!",
    ],
    TITLE: [
        "e^(iπ)+1=0",
        "Touch grass.",
        "erutnevdA liazaryK",
        "The forbidden name...",
        "Don't drink pure mana!",
        "Maybe gold is useless...",
        "Violence is not a solution, it's THE solution.",
    ],
    CONTAINER: (function () { return document.getElementById("container"); })(),
    MAINCONTAINER: (function () { return document.body; })(),
    DEBUG: false
};
//TODO add constants for animation speed, click, frame time etc