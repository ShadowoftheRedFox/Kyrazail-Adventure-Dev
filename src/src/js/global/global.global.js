/**
 * Create the global state that will be used in save.
 * @class
 * @param {scope} scope 
 * @returns {{ global: globalObject, preloadImage: string[] }}
 * @version since v1.0.0.1
 */
function globalGame() {

    // const preloadImage = [];

    const a = {
        progress: 0,
        player: {
            level: 1,
            mana: 40,
            pv: 100,
            sp: 0,
            def: 100,
            atk: 10,
            agility: 50,
            perception: 10,
            int: 10,
            luck: 10,
            username: "Kyra",
            xp: 1,
            equipement: {
                head: "Nothing",
                body: "Nothing",
                feet: "Nothing",
                weapon: "Nothing",
                shield: "Nothing",
                ring1: "Nothing",
                ring2: "Nothing"
            },
            clas: ""
        },
        inv: {
            gold: 2408
        },
        difficulty: {
            difficultyLevel: "normal"
        },
        character: {
            /**
             * Line of the player on the image, 0 or 1.
             */
            playerRow: 0,
            /**
             * Row of the player on the image 0 to 3.
             */
            playerLine: 0
        },
        face: {
            /**
             * Row of the face on the image 0 to 3.
             */
            playerLine: 0,
            /**
             * Line of the face on the image, 0 or 1.
             */
            playerRow: 0,
            playerImage: "fSpiritual"
        },
        quest: {
            active: {
                main: {},
                secondary: {}
            },
            solved: {
                main: {},
                secondary: {}
            },
            failed: {
                main: {},
                secondary: {}
            }
        },
        party: [{
            pause: {
                level: 50,
                def: 12,
                atk: 5,
                agility: 40,
                perception: 16,
                int: 18,
                luck: 3,
                xp: 45,
                pv: 1850,
                mana: 48,
                username: "Test NPC :p",
                face: {
                    image: "fSpiritual",
                    line: 1,
                    row: 1
                },
                class: ""
            }
        }],
        map: {
            current: "begin",
            cornerX: null,
            cornerY: null
        }
    };

    // preloadImage.push(a.face.playerImage);
    // a.party.forEach(member => {
    //     if (preloadImage.indexOf(member.pause.face.image) === -1) { preloadImage.push(member.pause.face.image); }
    // });
    // return { global: a, preloadImage: preloadImage };
    return { global: a };
}