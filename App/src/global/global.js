function GameGlobalObject() {
    throw new Error("This is a static class.");
}

/**
 * Instantiate the global object in the game datas.
 * @param {GameScope} scope 
 */
GameGlobalObject.newGame = function (scope = window.game) {
    //TODO save the game in an auto save if a game is currently being played

    // check if global object is empty, if not, save those data
    // if (scope.global && scope.global?.player) {
    //     GameSaveManager.save(scope.global);
    //     return;
    // }

    // create the object
    scope.global = {
        player: {
            firstName: "Player",
            lastName: "Name",

            lvl: 1,
            xp: 0,
            species: "Monstruosity",
            class: "Miscellaneous",
            advancedSpecies: false,
            description: "You should know yourself! You are the main character of this game, the great hero that will bring peace a properity. Or you could succomb to your greed and take control of this world.",

            face: {
                invisible: false,
                row: 0,
                col: 0,
                src: "Faces/Actorf1"
            },
            character: {
                invisible: false,
                row: 0,
                col: 0,
                src: "Characters/Actor1"
            },

            stats: {
                hp: 100,
                maxhp: 100,
                mp: 10,
                maxmp: 10,
                sp: 10,
                maxsp: 10,

                def: 0,
                magicdef: 0,
                atk: 1,
                magicatk: 0,
                agi: 1,
                luck: 1,

                special: [],

                /** Regenerate by himself.*/
                regeneration: 0,

                /** Reduce by 2 the damage taken.*/
                resistance: [],
                /** Increase by 2 the damage taken.*/
                weakness: [],

                status: []
            },
            equipment: {
                head: "none",
                torso: "none",
                foot: "none",
                weapon1: "none",
                weapon2: "none",
                jewel1: "none",
                jewel2: "none"
            }
        },
        party: {},
        inventory: {},
        map: {},
        quest: {
            active: null,
            finished: [],
            ongoing: [],
            failed: []
        },
        knowledge: {
            totalSkillPoint: 0,
            availableSkillPoint: 0,
            skillTree: [],
        },
        adventure: {}
    };

    //TODO also create on start 2 auto save files
};

/**
 * Export an object that contain all data needed to save the adventure.
 * @param {GameScope} scope 
 * @returns {GameGlobalObject}
 */
GameGlobalObject.export = function (scope) {
    return { test: "damn boi, it worked!" };
};

GameGlobalObject.loadGame = function (data) { };