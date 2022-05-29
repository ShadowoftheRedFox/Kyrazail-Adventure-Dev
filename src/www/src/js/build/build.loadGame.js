// import { roundRect } from "../../function/roundedRectangle.js";
const intro = ["icon", "blueForest", "separator1"];
const faces = [
    'Actorf1', 'Actorf2', 'Actorf3', 'Actorf4', 'Actorf5', 'fEvil', 'Monsterf1', 'Peoplef1', 'Peoplef2', 'Peoplef3', 'Peoplef4', 'fSpiritual'
];
const animations = [
    'Attack1', 'Attack10', 'Attack11', 'Attack12', 'Attack2', 'Attack3', 'Attack4', 'Attack5', 'Attack6', 'Attack7', 'Attack8', 'Attack9', 'Blow1', 'Blow2', 'Blow3', 'Darkness1', 'Darkness2', 'Darkness3', 'Death1', 'Earth1', 'Earth2', 'Earth3', 'Fire1', 'Fire2', 'Fire3', 'Fire4', 'Gun1', 'Gun2', 'Heal1', 'Heal2', 'Heal3', 'Heal4', 'Heal5', 'Heal6', 'Ice1', 'Ice2', 'Ice3', 'Ice4', 'Ice5', 'Light1', 'Light2', 'Light3', 'Light4', 'Light5', 'Light6', 'Light7', 'Meteor', 'Spear1', 'Spear2', 'Spear3', 'Special1', 'Special10', 'Special11', 'Special12', 'Special13', 'Special14', 'Special15', 'Special16', 'Special17', 'Special2', 'Special3', 'Special4', 'Special5', 'Special6', 'Special7', 'Special8', 'Special9', 'State1', 'State2', 'State3', 'State4', 'State5', 'State6', 'Sword1', 'Sword10', 'Sword2', 'Sword3', 'Sword4', 'Sword5', 'Sword6', 'Sword7', 'Sword8', 'Sword9', 'Thunder1', 'Thunder2', 'Thunder3', 'Thunder4', 'Water1', 'Water2', 'Water3', 'Wind1', 'Wind2', 'Wind3'
];
const battlebacks1 = [
    'Castle', 'Clouds', 'Cobblestones1', 'Cobblestones2', 'Cobblestones3', 'Cobblestones4', 'Crystal1', 'Crystal2', 'DarkSpace', 'DecorativeTile', 'DemonCastle', 'DemonicWorld1', 'DemonicWorld2', 'Desert', 'Dirt1', 'Dirt2', 'DirtCave', 'DirtField', 'Factory1', 'Factory2', 'Fort', 'Grassland', 'GrassMaze', 'IceCave', 'IceMaze', 'InBody', 'Lava1', 'Lava2', 'LavaCave', 'Meadow', 'Paved', 'PoisonSwamp', 'Road1', 'Road2', 'Road3', 'RockCave1', 'RockCave2', 'Ruins1', 'Ruins2', 'Ruins3', 'Sand', 'Ship', 'Sky', 'Snow', 'Snowfield', 'Stone1', 'Stone2', 'Stone3', 'Tent', 'Translucent', 'Wasteland', 'WireMesh', 'Wood1', 'Wood2'
];
const battlebacks2 = [
    'Brick', 'Bridge', 'Castle1', 'Castle2', 'Castle3', 'Cliff', 'Clouds', 'Crystal', 'DarkSpace', 'DemonCastle1', 'DemonCastle2', 'DemonCastle3', 'DemonicWorld', 'Desert', 'DirtCave', 'Factory', 'Forest1', 'Forest2', 'Fort1', 'Fort2', 'Grassland', 'GrassMaze', 'IceCave', 'IceMaze', 'InBody', 'Lava', 'LavaCave', 'Mine', 'PoisonSwamp', 'Port', 'RockCave', 'Room1', 'Room2', 'Room3', 'Room4', 'Ruins', 'Sea', 'Ship', 'Sky', 'Snowfield', 'Stone1', 'Stone2', 'Stone3', 'Stone4', 'Stone5', 'Temple', 'Tent', 'Tower', 'Town1', 'Town2', 'Town3', 'Town4', 'Town5', 'Wasteland'
];
const battlers = [
    'Angel', 'Assassin', 'Asura', 'Bandit', 'Bat', 'Behemoth', 'Captain', 'Chimera', 'Cleric_f', 'Cleric_m', 'Cockatrice', 'Darklord', 'Death', 'Delf_f', 'Delf_m', 'Demon', 'Dragon', 'Earthspirit', 'Evilgod', 'Evilking', 'Fairy', 'Fanatic', 'Firespirit', 'Gargoyle', 'Garuda', 'Gayzer', 'General', 'Ghost', 'God', 'Goddess', 'Grappler_f', 'Grappler_m', 'Hero_f', 'Hero_m', 'Hornet', 'Icelady', 'Ifrit', 'Imp', 'Jellyfish', 'Kerberos', 'Lamia', 'Mage', 'Mimic', 'Minotaur', 'Ogre', 'Orc', 'Paladin_f', 'Paladin_m', 'Plant', 'Priest', 'Puppet', 'Rat', 'Rogue', 'Sahagin', 'Scorpion', 'Skeleton', 'Slime', 'Snake', 'Soldier', 'Spider', 'Succubus', 'Swordman', 'Thief_f', 'Thief_m', 'Vampire', 'Warrior_f', 'Warrior_m', 'Waterspirit', 'Werewolf', 'Willowisp', 'Windspirit', 'Wizard_f', 'Wizard_m', 'Zombie'
];
const characters = [
    '!$Gate1', '!$Gate2', '!Chest', '!Crystal', '!Door1', '!Door2', '!Door3', '!Flame', '!Hexagram', '!Other1', '!Other2', '!Other3', '!Switch1', '!Switch2', '$BigMonster1', '$BigMonster2', '$Coffin', 'Actor1', 'Actor2', 'Actor3', 'Actor4', 'Actor5', 'Animal', 'Behavior1', 'Behavior2', 'Behavior3', 'Behavior4', 'Damage1', 'Damage2', 'Damage3', 'Damage4', 'Evil', 'Insane1', 'Insane2', 'Monster1', 'Monster2', 'Monster3', 'People1', 'People2', 'People3', 'People4', 'People5', 'People6', 'People7', 'People8', 'Riding', 'Spiritual', 'Vehicle'
];
const parallaxes = [
    'BlueSky', 'CloudySky1', 'CloudySky2', 'DarkSpace1', 'DarkSpace2', 'Mountains1', 'Mountains2', 'Mountains3', 'Mountains4', 'Mountains5', 'Ocean1', 'Ocean2', 'SeaofClouds', 'StarlitSky', 'Sunset'
];
const system = [
    'Balloon', 'BattleStart', 'GameOver', 'IconSet', 'Shadow', 'Window'
];
const tilesets = [
    'Dungeon_A1', 'Dungeon_A2', 'Dungeon_A4', 'Dungeon_A5', 'Dungeon_B', 'Dungeon_C', 'Inside_A1', 'Inside_A2', 'Inside_A4', 'Inside_A5', 'Inside_B', 'Inside_C', 'Outside_A1', 'Outside_A2', 'Outside_A3', 'Outside_A4', 'Outside_A5', 'Outside_B', 'Outside_C', 'World_A1', 'World_A2', 'World_B'
];
const tilesetsImageData = {
    Dungeon_A1: { "columns": 32, "imageheight": 384, "imagewidth": 512, "margin": 0, "name": "Dungeon_A1", "spacing": 0, "tilecount": 768, "tileheight": 16, "tilewidth": 16 },
    Dungeon_A2: { "columns": 32, "imageheight": 384, "imagewidth": 512, "margin": 0, "name": "Dungeon_A2", "spacing": 0, "tilecount": 768, "tileheight": 16, "tilewidth": 16 },
    Dungeon_A4: { "columns": 32, "imageheight": 480, "imagewidth": 512, "margin": 0, "name": "Dungeon_A4", "spacing": 0, "tilecount": 960, "tileheight": 16, "tilewidth": 16 },
    Dungeon_A5: { "columns": 16, "imageheight": 512, "imagewidth": 256, "margin": 0, "name": "Dungeon_A5", "spacing": 0, "tilecount": 512, "tileheight": 16, "tilewidth": 16 },
    Dungeon_B: { "columns": 32, "imageheight": 512, "imagewidth": 512, "margin": 0, "name": "Dungeon_B", "spacing": 0, "tilecount": 1024, "tileheight": 16, "tilewidth": 16 },
    Dungeon_C: { "columns": 32, "imageheight": 512, "imagewidth": 512, "margin": 0, "name": "Dungeon_C", "spacing": 0, "tilecount": 1024, "tileheight": 16, "tilewidth": 16 },
    Inside_A1: { "columns": 32, "imageheight": 384, "imagewidth": 512, "margin": 0, "name": "Inside_A1", "spacing": 0, "tilecount": 768, "tileheight": 16, "tilewidth": 16 },
    Inside_A2: { "columns": 32, "imageheight": 384, "imagewidth": 512, "margin": 0, "name": "Inside_A2", "spacing": 0, "tilecount": 768, "tileheight": 16, "tilewidth": 16 },
    Inside_A4: { "columns": 32, "imageheight": 480, "imagewidth": 512, "margin": 0, "name": "Inside_A4", "spacing": 0, "tilecount": 960, "tileheight": 16, "tilewidth": 16 },
    Inside_A5: { "columns": 16, "imageheight": 512, "imagewidth": 256, "margin": 0, "name": "Inside_A5", "spacing": 0, "tilecount": 512, "tileheight": 16, "tilewidth": 16 },
    Inside_B: { "columns": 32, "imageheight": 512, "imagewidth": 512, "margin": 0, "name": "Inside_B", "spacing": 0, "tilecount": 1024, "tileheight": 16, "tilewidth": 16 },
    Inside_C: { "columns": 32, "imageheight": 512, "imagewidth": 512, "margin": 0, "name": "Inside_C", "spacing": 0, "tilecount": 1024, "tileheight": 16, "tilewidth": 16 },
    Outside_A1: { "columns": 32, "imageheight": 384, "imagewidth": 512, "margin": 0, "name": "Outside_A1", "spacing": 0, "tilecount": 768, "tileheight": 16, "tilewidth": 16 },
    Outside_A2: { "columns": 32, "imageheight": 384, "imagewidth": 512, "margin": 0, "name": "Outside_A2", "spacing": 0, "tilecount": 768, "tileheight": 16, "tilewidth": 16 },
    Outside_A3: { "columns": 32, "imageheight": 256, "imagewidth": 512, "margin": 0, "name": "Outside_A3", "spacing": 0, "tilecount": 512, "tileheight": 16, "tilewidth": 16 },
    Outside_A4: { "columns": 32, "imageheight": 480, "imagewidth": 512, "margin": 0, "name": "Outside_A4", "spacing": 0, "tilecount": 960, "tileheight": 16, "tilewidth": 16 },
    Outside_A5: { "columns": 16, "imageheight": 512, "imagewidth": 256, "margin": 0, "name": "Outside_A5", "spacing": 0, "tilecount": 512, "tileheight": 16, "tilewidth": 16 },
    Outside_B: { "columns": 32, "imageheight": 512, "imagewidth": 512, "margin": 0, "name": "Outside_B", "spacing": 0, "tilecount": 1024, "tileheight": 16, "tilewidth": 16 },
    Outside_C: { "columns": 32, "imageheight": 512, "imagewidth": 512, "margin": 0, "name": "Outside_C", "spacing": 0, "tilecount": 1024, "tileheight": 16, "tilewidth": 16 },
    World_A1: { "columns": 32, "imageheight": 384, "imagewidth": 512, "margin": 0, "name": "World_A1", "spacing": 0, "tilecount": 768, "tileheight": 16, "tilewidth": 16 },
    World_A2: { "columns": 32, "imageheight": 384, "imagewidth": 512, "margin": 0, "name": "World_A2", "spacing": 0, "tilecount": 768, "tileheight": 16, "tilewidth": 16 },
    World_B: { "columns": 32, "imageheight": 512, "imagewidth": 512, "margin": 0, "name": "World_B", "spacing": 0, "tilecount": 1024, "tileheight": 16, "tilewidth": 16 }
};
const titles1 = [
    'Book', 'Castle', 'CrossedSwords', 'Crystal', 'DemonCastle', 'Devil', 'Dragon', 'Fountain', 'Gates', 'Hexagram', 'Landscape', 'Island', 'Night', 'Plain', 'Sword', 'Tower1', 'Tower2', 'Universe', 'Volcano', 'World', 'WorldMap'
];
const titles2 = [
    'Dragons', 'Fire', 'Forest', 'Gargoyles', 'Heroes', 'Leaves', 'Metal', 'Mist', 'Mountains'
];
/**
 *! @warn Huge
 */
const BGM = [
    "Airship.ogg", "Alonon.ogg", "Aram Dungeon.ogg", "Aram Town.ogg", "Ardford.ogg", "Battle for Yhilin.ogg", "Battle1.ogg", "Battle2 RTP.ogg", "Battle2.ogg", "Battle3.ogg", "Battle4.ogg", "Battle5.ogg", "Battle6.ogg", "Battle7.ogg", "Battle8.ogg", "Battle9.ogg", "Camp.ogg", "Cee'Kan.ogg", "Deepwilds.ogg", "Delgar Forest Camp.ogg", "Delgar Forest.ogg", "Dungeon1.ogg", "Dungeon2 RTP.ogg", "Dungeon2.ogg", "Dungeon3.ogg", "Dungeon4.ogg", "Dungeon5.ogg", "Dungeon6.ogg", "Dungeon7.ogg", "Dungeon8 RTP.ogg", "Dungeon8.ogg", "Dungeon9 RTP.ogg", "Dungeon9.ogg", "Elven Dungeons.ogg", "Elven Royalty.ogg", "Erosian Dungeon.ogg", "Erosian Town.ogg", "Event Theme.ogg", "Feroholm II.ogg", "Feroholm.ogg", "Field1.ogg", "Field2.ogg", "Field3.ogg", "Field4.ogg", "Gardens of Steam.ogg", "Gathering2.ogg", "Gawnfall Council.ogg", "Gawnfall.ogg", "Ghenalon.ogg", "Ginasta theme.ogg", "Givini.ogg", "IW Airships.ogg", "IW Intense.ogg", "IW Mithyn Dungeon.ogg", "IW Tanurak.ogg", "Manipulation.ogg", "Melancholy Battle.ogg", "Merchant Camp.ogg", "Mountaintop.ogg", "Orgasmic Empire.ogg", "Orgasmic Palace.ogg", "Prologue battles.ogg", "Reunion.ogg", "Scene1.ogg", "Scene2 RTP.ogg", "Scene2.ogg", "Scene3.ogg", "Scene4.ogg", "Scene5.ogg", "Scene6.ogg", "Ship.ogg", "Stenai.ogg", "Stineford Farm II.ogg", "Stineford.ogg", "Strings and Things (calm).ogg", "Succubus City.ogg", "Succubus Region.ogg", "Tarran'Kan.ogg", "Tatseni.ogg", "Templar Order (holy).ogg", "Theme.ogg", "Theme1.ogg", "Theme2.ogg", "Theme3.ogg", "Theme4.ogg", "Theme5.ogg", "Theme_-_Seasons_Change (town).ogg", "Tower Somber.ogg", "Tower.ogg", "Town1.ogg", "Town2.ogg", "Town3.ogg", "Town4.ogg", "Town5.ogg", "Town6.ogg", "Town7.ogg", "Traveling.ogg", "Unforge.ogg", "Withered Mountain.ogg", "Wynn.ogg", "Zirantia.ogg", "Zirantian Dungeon.ogg"
];
const BGS = [
    "Clock.ogg", "Darkness.ogg", "Drips.ogg", "Fire.ogg", "Quake.ogg", "Rain.ogg", "River.ogg", "Sea.ogg", "Storm.ogg", "Wind.ogg"
];
const MAIN = [
    "Adeste.mp3", "Dramatic.mp3", "moon.mp3", "Silence.mp3"
];
const ME = [
    "Fanfare1.ogg", "Fanfare2.ogg", "Fanfare3.ogg", "Gag.ogg", "Gameover1.ogg", "Gameover2.ogg", "Inn.ogg", "Item.ogg", "Mystery.ogg", "Organ.ogg", "Shock.ogg", "Victory1.ogg", "Victory2.ogg"
];
/**
 *! @warn Huge
 */
const SE = [
    "Absorb1.ogg", "Absorb2.ogg", "Applause1.ogg", "Applause2.ogg", "Attack1.ogg", "Attack2.ogg", "Attack3.ogg", "Autodoor.ogg", "Barrier.ogg", "Battle1.ogg", "Battle2.ogg", "Battle3.ogg", "Bell1.ogg", "Bell2.ogg", "Bell3.ogg", "Bite.ogg", "Blind.ogg", "Blow1.ogg", "Blow2.ogg", "Blow3.ogg", "Blow4.ogg", "Blow5.ogg", "Blow6.ogg", "Blow7.ogg", "Blow8.ogg", "Book1.ogg", "Book2.ogg", "Bow1.ogg", "Bow2.ogg", "Bow3.ogg", "Bow4.ogg", "Break.ogg", "Breath.ogg", "Buzzer1.ogg", "Buzzer2.ogg", "Cancel1.ogg", "Cancel2.ogg", "Cat.ogg", "Chest.ogg", "Chicken.ogg", "Chime1.ogg", "Chime2.ogg", "Close1.ogg", "Close2.ogg", "Close3.ogg", "Coin.ogg", "Collapse1.ogg", "Collapse2.ogg", "Collapse3.ogg", "Collapse4.ogg", "Confuse.ogg", "Cow.ogg", "Crash.ogg", "Crossbow.ogg", "Crow.ogg", "Cry1.ogg", "Cry2.ogg", "Cursor1.ogg", "Cursor2.ogg", "Damage1.ogg", "Damage2.ogg", "Damage3.ogg", "Damage4.ogg", "Damage5.ogg", "Darkness1.ogg", "Darkness2.ogg", "Darkness3.ogg", "Darkness4.ogg", "Darkness5.ogg", "Darkness6.ogg", "Darkness7.ogg", "Darkness8.ogg", "Decision1.ogg", "Decision2.ogg", "Decision3.ogg", "Devil1.ogg", "Devil2.ogg", "Devil3.ogg", "Disappointment.ogg", "Dive.ogg", "Dog.ogg", "Down1.ogg", "Down2.ogg", "Down3.ogg", "Down4.ogg", "Earth1.ogg", "Earth2.ogg", "Earth3.ogg", "Earth4.ogg", "Earth5.ogg", "Earth6.ogg", "Earth7.ogg", "Earth8.ogg", "Earth9.ogg", "Equip1.ogg", "Equip2.ogg", "Equip3.ogg", "Evasion1.ogg", "Evasion2.ogg", "Explosion1.ogg", "Explosion2.ogg", "Explosion3.ogg", "Explosion4.ogg", "Explosion5.ogg", "Explosion6.ogg", "Explosion7.ogg", "Fall.ogg", "Fire1.ogg", "Fire2.ogg", "Fire3.ogg", "Fire4.ogg", "Fire5.ogg", "Fire6.ogg", "Fire7.ogg", "Fire8.ogg", "Fire9.ogg", "Flash1.ogg", "Flash2.ogg", "Flash3.ogg", "Fog1.ogg", "Fog2.ogg", "Frog.ogg", "Gun1.ogg", "Gun2.ogg", "Hammer.ogg", "Heal1.ogg", "Heal2.ogg", "Heal3.ogg", "Heal4.ogg", "Heal5.ogg", "Heal6.ogg", "Heal7.ogg", "Horse.ogg", "Ice1.ogg", "Ice10.ogg", "Ice11.ogg", "Ice2.ogg", "Ice3.ogg", "Ice4.ogg", "Ice5.ogg", "Ice6.ogg", "Ice7.ogg", "Ice8.ogg", "Ice9.ogg", "Item1.ogg", "Item2.ogg", "Item3.ogg", "Jump1.ogg", "Jump2.ogg", "Key.ogg", "Knock.ogg", "Laser.ogg", "Load.ogg", "Machine.ogg", "Magic1.ogg", "Magic2.ogg", "Magic3.ogg", "Magic4.ogg", "Magic5.ogg", "Magic6.ogg", "Magic7.ogg", "Miss.ogg", "Monster1.ogg", "Monster2.ogg", "Monster3.ogg", "Monster4.ogg", "Monster5.ogg", "Monster6.ogg", "Monster7.ogg", "Move.ogg", "Noise.ogg", "Open1.ogg", "Open2.ogg", "Open3.ogg", "Open4.ogg", "Open5.ogg", "Paralyze1.ogg", "Paralyze2.ogg", "Paralyze3.ogg", "Parry.ogg", "Phone.ogg", "Poison.ogg", "Pollen.ogg", "Powerup.ogg", "Push.ogg", "Raise1.ogg", "Raise2.ogg", "Raise3.ogg", "Recovery.ogg", "Reflection.ogg", "Resonance.ogg", "Run.ogg", "Saint1.ogg", "Saint2.ogg", "Saint3.ogg", "Saint4.ogg", "Saint5.ogg", "Saint6.ogg", "Saint7.ogg", "Saint8.ogg", "Saint9.ogg", "Sand.ogg", "Save.ogg", "Scream.ogg", "Sheep.ogg", "Shop.ogg", "Shot1.ogg", "Shot2.ogg", "Shot3.ogg", "Silence.ogg", "Skill1.ogg", "Skill2.ogg", "Skill3.ogg", "Slash1.ogg", "Slash10.ogg", "Slash11.ogg", "Slash12.ogg", "Slash2.ogg", "Slash3.ogg", "Slash4.ogg", "Slash5.ogg", "Slash6.ogg", "Slash7.ogg", "Slash8.ogg", "Slash9.ogg", "Sleep.ogg", "Sound1.ogg", "Sound2.ogg", "Sound3.ogg", "Stare.ogg", "Starlight.ogg", "Switch1.ogg", "Switch2.ogg", "Switch3.ogg", "Sword1.ogg", "Sword2.ogg", "Sword3.ogg", "Sword4.ogg", "Sword5.ogg", "Teleport.ogg", "Thunder1.ogg", "Thunder10.ogg", "Thunder11.ogg", "Thunder12.ogg", "Thunder2.ogg", "Thunder3.ogg", "Thunder4.ogg", "Thunder5.ogg", "Thunder6.ogg", "Thunder7.ogg", "Thunder8.ogg", "Thunder9.ogg", "Twine.ogg", "unsuccubi.ogg", "Up1.ogg", "Up2.ogg", "Up3.ogg", "Up4.ogg", "Water1.ogg", "Water2.ogg", "Water3.ogg", "Water4.ogg", "Water5.ogg", "Water6.ogg", "Wind1.ogg", "Wind10.ogg", "Wind11.ogg", "Wind2.ogg", "Wind3.ogg", "Wind4.ogg", "Wind5.ogg", "Wind6.ogg", "Wind7.ogg", "Wind8.ogg", "Wind9.ogg", "Wolf.ogg"
];

/**
 * Load wanted image and sounds.
 * @param {scope} scope The scope of the game
 * @param {boolean} [battle = false] Return battle ressources.
 * @param {boolean} [map = false] Return map ressources.
 * @param {boolean} [animations = false] Return animations ressources.
 * @param {boolean} [background = false] Return background ressources.
 * @param {boolean} [introduction = true] Return default ressources, to start the game.
 * @returns {Promise<{ image: { intro: {}, faces: {}, battlebacks1: {}, battlebacks2: {}, battlers: {}, animations: {}, tilesets: {}, titles1: {}, titles2: {}, system: {}, parallaxes: {}, characters: {} }, audio: { BGM: {}, BGS: {}, MAIN: {}, ME: {}, SE: {} } }>}
 */
const loadGame = async(scope, battle, map, animations, background, introduction) => new Promise((resolve, reject) => {
    //render a loading text
    const ctx = scope.context;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, scope.constants.width, scope.constants.height);
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = '16px Arial';
    ctx.fillText("Loading game...", scope.constants.width / 2, scope.constants.height / 2);

    const that = {
        image: {
            intro: {},
            faces: {},
            battlebacks1: {},
            battlebacks2: {},
            battlers: {},
            animations: {},
            tilesets: {},
            titles1: {},
            titles2: {},
            system: {},
            parallaxes: {},
            characters: {}
        },
        audio: {
            BGM: {},
            BGS: {},
            MAIN: {},
            ME: {},
            SE: {}
        }
    };

    /**
     * Will turn true if other are loaded, and will load intro ressources if intro is not defined.
     */
    let other = false;
    /**
     * Will turn true if animations have been loaded.
     */
    let loadedAnimations = false;
    let imgCount = 0;
    let audioCount = 0;
    var totImg = 0;
    var totAudio = 0;

    if (battle && battle == true) {
        other = true;
        loadedAnimations = true;
        totAudio += SE.length;
        audioCount += SE.length;
        totImg += animations.length + battlers.length + battlebacks1.length + battlebacks2.length;
        imgCount += animations.length + battlers.length + battlebacks1.length + battlebacks2.length;
        SE.forEach(async(sound) => {
            const thisSound = new Audio(`${scope.constants.href}src/resources/sound/SE/${sound}`);
            thisSound.onerror = function() {
                console.warn(thisSound.src + ' failed');
                audioCount--;
            };
            thisSound.addEventListener("canplaythrough", start(), false);
            async function start() {
                that.audio.SE[sound] = {
                    audio: thisSound
                };
                audioCount--;
            }
        });
        animations.forEach(async(image) => {
            const img = new Image();
            img.onload = start();
            img.onerror = function() {
                console.warn(img.src + ' failed');
                imgCount--;
            };
            img.src = `${scope.constants.href}src/resources/Image/Animations/${image}.png`;
            async function start() {
                that.image.animations[image] = {
                    w: 192,
                    h: 192,
                    col: img.width / 192,
                    row: img.height / 192,
                    src: img.src,
                    image: img
                };
                imgCount--;
            }
        });
        battlebacks1.forEach(async(image) => {
            const img = new Image();
            img.onload = start();
            img.onerror = function() {
                console.warn(img.src + ' failed');
                imgCount--;
            };
            img.src = `${scope.constants.href}src/resources/Image/Battlebacks1/${image}.png`;
            async function start() {
                that.image.battlebacks1[image] = {
                    w: img.width,
                    h: img.height,
                    col: 1,
                    row: 1,
                    src: img.src,
                    image: img
                };
                imgCount--;
            }
        });
        battlebacks2.forEach(async(image) => {
            const img = new Image();
            img.onload = start();
            img.onerror = function() {
                console.warn(img.src + ' failed');
                imgCount--;
            };
            img.src = `${scope.constants.href}src/resources/Image/Battlebacks2/${image}.png`;
            async function start() {
                that.image.battlebacks2[image] = {
                    w: img.width,
                    h: img.height,
                    col: 1,
                    row: 1,
                    src: img.src,
                    image: img
                };
                imgCount--;
            }
        });
        battlers.forEach(async(image) => {
            const img = new Image();
            img.onload = start();
            img.onerror = function() {
                console.warn(img.src + ' failed');
                imgCount--;
            };
            img.src = `${scope.constants.href}src/resources/Image/Battlers/${image}.png`;
            async function start() {
                that.image.battlers[image] = {
                    w: img.width,
                    h: img.height,
                    col: 1,
                    row: 1,
                    src: img.src,
                    image: img
                };
                imgCount--;
            }
        });
    }
    if (map && map == true) {
        other = true;
        totImg += characters.length + tilesets.length;
        imgCount += characters.length + tilesets.length;
        characters.forEach(async(image) => {
            const img = new Image();
            img.onload = start();
            img.onerror = function() {
                console.warn(img.src + ' failed');
                imgCount--;
            };
            img.src = `${scope.constants.href}src/resources/Image/Characters/${image}.png`;
            async function start() {
                if (image.startsWith("!$")) {
                    that.image.characters[image] = {
                        w: img.width / 3,
                        h: img.height / 4,
                        col: 3,
                        row: 4,
                        src: img.src,
                        image: img
                    };
                    imgCount--;
                } else if (image.startsWith("!")) {
                    that.image.characters[image] = {
                        w: img.width / 12,
                        h: img.height / 8,
                        col: 8,
                        row: 12,
                        src: img.src,
                        image: img
                    };
                    imgCount--;
                } else if (image.startsWith("$")) {
                    that.image.characters[image] = {
                        w: img.width / 3,
                        h: img.height / 4,
                        col: 3,
                        row: 4,
                        src: img.src,
                        image: img
                    };
                    imgCount--;
                } else {
                    that.image.characters[image] = {
                        w: img.width / 12,
                        h: img.height / 8,
                        col: 12,
                        row: 8,
                        src: img.src,
                        image: img
                    };
                    imgCount--;
                }
            }
        });
        //weird image division
        tilesets.forEach(async(image) => {
            const img = new Image();
            img.onload = start();
            img.onerror = function() {
                console.warn(img.src + ' failed');
                imgCount--;
            };
            img.src = `${scope.constants.href}src/resources/Image/Tilesets/${image}.png`;
            async function start() {
                that.image.tilesets[image] = {
                    w: img.width,
                    h: img.height,
                    col: 1,
                    row: 1,
                    src: img.src,
                    image: img,
                    data: {}
                };
                imgCount--;
            }
        });
    }
    if (animations && animations == true) {
        other = true;
        totImg += system.length + parallaxes.length + titles1.length + titles2.length;
        imgCount += system.length + parallaxes.length + titles1.length + titles2.length;
        system.forEach(async(image) => {
            const img = new Image();
            img.onload = start();
            img.onerror = function() {
                console.warn(img.src + ' failed');
                imgCount--;
            };
            img.src = `${scope.constants.href}src/resources/Image/System/${image}.png`;
            async function start() {
                imgCount--;
                switch (image) {
                    case "Balloon":
                        that.image.system[image] = {
                            w: img.width / 8,
                            h: img.height / 10,
                            col: 8,
                            row: 10,
                            src: img.src,
                            image: img
                        };
                        break;
                    case "BattleStart":
                        that.image.system[image] = {
                            w: img.width,
                            h: img.height,
                            col: 1,
                            row: 1,
                            src: img.src,
                            image: img
                        };
                        break;
                    case "GameOver":
                        that.image.system[image] = {
                            w: img.width,
                            h: img.height,
                            col: 1,
                            row: 1,
                            src: img.src,
                            image: img
                        };
                        break;
                    case "IconSet":
                        that.image.system[image] = {
                            w: img.width / 16,
                            h: img.height / 39,
                            col: 16,
                            row: 39,
                            src: img.src,
                            image: img
                        };
                        break;
                    case "Shadow":
                        that.image.system[image] = {
                            w: img.width,
                            h: img.height,
                            col: 1,
                            row: 1,
                            src: img.src,
                            image: img
                        };
                        break;
                    case "Window":
                        that.image.system[image] = {
                            w: img.width / 16,
                            h: img.height / 16,
                            col: 16,
                            row: 16,
                            src: img.src,
                            image: img
                        };
                        break;
                    default:
                        that.image.system[image] = {
                            w: img.width,
                            h: img.height,
                            col: 1,
                            row: 1,
                            src: img.src,
                            image: img
                        };
                        break;
                }
            }
        });
        parallaxes.forEach(async(image) => {
            const img = new Image();
            img.onload = start();
            img.onerror = function() {
                console.warn(img.src + ' failed');
                imgCount--;
            };
            img.src = `${scope.constants.href}src/resources/Image/Parallaxes/${image}.png`;
            async function start() {
                that.image.parallaxes[image] = {
                    w: img.width,
                    h: img.height,
                    col: 1,
                    row: 1,
                    src: img.src,
                    image: img
                };
                imgCount--;
            }
        });
        titles1.forEach(async(image) => {
            const img = new Image();
            img.onload = start();
            img.onerror = function() {
                console.warn(img.src + ' failed');
                imgCount--;
            };
            img.src = `${scope.constants.href}src/resources/Image/Titles1/${image}.png`;
            async function start() {
                that.image.titles1[image] = {
                    w: img.width,
                    h: img.height,
                    col: 1,
                    row: 1,
                    src: img.src,
                    image: img
                };
                imgCount--;
            }
        });
        titles2.forEach(async(image) => {
            const img = new Image();
            img.onload = start();
            img.onerror = function() {
                console.warn(img.src + ' failed');
                imgCount--;
            };
            img.src = `${scope.constants.href}src/resources/Image/Titles2/${image}.png`;
            async function start() {
                that.image.titles2[image] = {
                    w: img.width,
                    h: img.height,
                    col: 1,
                    row: 1,
                    src: img.src,
                    image: img
                };
                imgCount--;
            }
        });
        if (loadedAnimations == false) {
            totImg += animations.length;
            imgCount += animations.length;
            animations.forEach(async(image) => {
                const img = new Image();
                img.onload = start();
                img.onerror = function() {
                    console.warn(img.src + ' failed');
                    imgCount--;
                };
                img.src = `${scope.constants.href}src/resources/Image/Animations/${image}.png`;
                async function start() {
                    that.image.animations[image] = {
                        w: 192,
                        h: 192,
                        col: img.width / 192,
                        row: img.height / 192,
                        src: img.src,
                        image: img
                    };
                    imgCount--;
                }
            });
        }
    }
    if (background && background == true) {
        other = true;
        totAudio += BGM.length + BGS.length;
        audioCount += BGM.length + BGS.length;
        BGM.forEach(async(sound) => {
            const thisSound = new Audio(`${scope.constants.href}src/resources/sound/BGM/${sound}`);
            thisSound.onerror = function() {
                console.warn(thisSound.src + ' failed');
                audioCount--;
            };
            thisSound.addEventListener("canplaythrough", start(), false);
            async function start() {
                that.audio.BGM[sound] = {
                    audio: thisSound
                };
                audioCount--;
            }
        });
        BGS.forEach(async(sound) => {
            const thisSound = new Audio(`${scope.constants.href}src/resources/sound/BGS/${sound}`);
            thisSound.onerror = function() {
                console.warn(thisSound.src + ' failed');
                audioCount--;
            };
            thisSound.addEventListener("canplaythrough", start(), false);
            async function start() {
                that.audio.BGS[sound] = {
                    audio: thisSound
                };
                audioCount--;
            }
        });
    }
    if ((introduction && introduction == true) || other == false) {
        totImg += intro.length + faces.length;
        imgCount += intro.length + faces.length;
        totAudio += ME.length + MAIN.length;
        audioCount += ME.length + MAIN.length;
        ME.forEach(async(sound) => {
            const thisSound = new Audio(`${scope.constants.href}src/resources/sound/ME/${sound}`);
            thisSound.onerror = function() {
                console.warn(thisSound.src + ' failed');
                audioCount--;
            };
            thisSound.addEventListener("canplaythrough", start(), false);
            async function start() {
                that.audio.ME[sound] = {
                    audio: thisSound
                };
                audioCount--;
            }
        });
        intro.forEach(async(image) => {
            const img = new Image();
            img.onload = start();
            img.onerror = function() {
                console.warn(img.src + ' failed');
                imgCount--;
            };
            img.src = `${scope.constants.href}src/resources/Image/Intro/${image}.png`;
            async function start() {
                that.image.intro[image] = {
                    w: img.width,
                    h: img.height,
                    col: 1,
                    row: 1,
                    src: img.src,
                    image: img
                };
                imgCount--;
            }
        });
        MAIN.forEach(async(sound) => {
            const thisSound = new Audio(`${scope.constants.href}src/resources/sound/MAIN/${sound}`);
            thisSound.onerror = function() {
                console.warn(thisSound.src + ' failed');
                audioCount--;
            };
            thisSound.addEventListener("canplaythrough", start(), false);
            async function start() {
                that.audio.MAIN[sound] = {
                    audio: thisSound
                };
                audioCount--;
            }
        });
        faces.forEach(async(image) => {
            const img = new Image();
            img.onload = start();
            img.onerror = function() {
                console.warn(img.src + ' failed');
                imgCount--;
            };
            img.src = `${scope.constants.href}src/resources/Image/Faces/${image}.png`;
            async function start() {
                that.image.faces[image] = {
                    w: img.width / 4,
                    h: img.height / 2,
                    col: 4,
                    row: 2,
                    src: img.src,
                    image: img
                };
                imgCount--;
            }
        });
    }

    const totItemToLoad = totImg + totAudio;
    const inter = setInterval(async() => {
        //loading bar
        ctx.fillStyle = "#59BAE9";
        ctx.clearRect(0, 2 * scope.constants.height / 3, scope.constants.width, scope.constants.height);
        roundRect(ctx, scope.constants.width * 20 / 100, scope.constants.height * 90 / 100, (1 - ((imgCount) / totItemToLoad)) * scope.constants.width * 60 / 100, scope.constants.height * 5 / 100, 5, true);
        ctx.textAlign = "center";
        ctx.fillStyle = "#fff";
        ctx.font = '16px Arial';
        if (imgCount > 0) {
            ctx.fillText(`Still loading images... ${totImg - imgCount} / ${totImg}`, scope.constants.width / 2, scope.constants.height * 93 / 100);
        } else if (audioCount > 0) {
            ctx.fillText(`Still loading images... ${totAudio - audioCount} / ${totAudio}`, scope.constants.width / 2, scope.constants.height * 93 / 100);
        } else {
            clearInterval(inter);
            ctx.fillText(`Still loading maps...`, scope.constants.width / 2, scope.constants.height * 93 / 100);
            console.log("Finished loading assets.");
            return resolve(that);
        }
    }, 60);
});

/**
 * Load image or sounds from names.
 * @param {scope} scope 
 * @param {string[]} imgArray Array of image name to return.
 * @param {string[]} sndArray Array of sounds name to return.
 * @returns {Promise<{ image: { intro: {}, faces: {}, battlebacks1: {}, battlebacks2: {}, battlers: {}, animations: {}, tilesets: {}, titles1: {}, titles2: {}, system: {}, parallaxes: {}, characters: {} }, audio: { BGM: {}, BGS: {}, MAIN: {}, ME: {}, SE: {} } }>}
 */
const loadFromName = async(scope, imgArray, sndArray) => new Promise((resolve, reject) => {
    if (!scope) throw new Error("Scope is not defined.");
    if (!imgArray) throw new Error("imgArray is not defined.");
    if (!sndArray) throw new Error("sndArray is not defined.");
    if (!imgArray.length) throw new TypeError("imgArray is not an string array.");
    if (!sndArray.length) throw new TypeError("sndArray is not an string array.");
    scope.constants.loadingGame = true;
    const that = {
            image: {
                intro: {},
                faces: {},
                battlebacks1: {},
                battlebacks2: {},
                battlers: {},
                animations: {},
                tilesets: {},
                titles1: {},
                titles2: {},
                system: {},
                parallaxes: {},
                characters: {}
            },
            audio: {
                BGM: {},
                BGS: {},
                MAIN: {},
                ME: {},
                SE: {}
            }
        },
        ctx = scope.context;

    const itemTot = imgArray.length + sndArray.length;
    var itemCount = itemTot;

    if (imgArray.length > 0) {
        imgArray.forEach(img => {
            if (intro.includes(img)) {
                const image = new Image();
                image.onload = () => {
                    that.image.intro[img] = {
                        w: image.width,
                        h: image.height,
                        col: 1,
                        row: 1,
                        src: image.src,
                        image: image
                    };
                    itemCount--;
                };
                image.onerror = function() {
                    console.warn(image.src + ' failed');
                    itemCount--;
                };
                image.src = `${scope.constants.href}src/resources/Image/Intro/${img}.png`;
            } else if (faces.includes(img)) {
                const image = new Image();
                image.onload = () => {
                    that.image.faces[img] = {
                        w: image.width,
                        h: image.height,
                        col: 1,
                        row: 1,
                        src: image.src,
                        image: image
                    };
                    itemCount--;
                };
                image.onerror = function() {
                    console.warn(image.src + ' failed');
                    itemCount--;
                };
                image.src = `${scope.constants.href}src/resources/Image/Faces/${img}.png`;
            } else if (animations.includes(img)) {
                const image = new Image();
                image.onload = () => {
                    that.image.animations[img] = {
                        w: image.width,
                        h: image.height,
                        col: 1,
                        row: 1,
                        src: image.src,
                        image: image
                    };
                    itemCount--;
                };
                image.onerror = function() {
                    console.warn(image.src + ' failed');
                    itemCount--;
                };
                image.src = `${scope.constants.href}src/resources/Image/Animations/${img}.png`;
            } else if (battlebacks1.includes(img)) {
                const image = new Image();
                image.onload = () => {
                    that.image.battlebacks1[img] = {
                        w: image.width,
                        h: image.height,
                        col: 1,
                        row: 1,
                        src: image.src,
                        image: image
                    };
                    itemCount--;
                };
                image.onerror = function() {
                    console.warn(image.src + ' failed');
                    itemCount--;
                };
                image.src = `${scope.constants.href}src/resources/Image/Battlebacks1/${img}.png`;
            } else if (battlebacks2.includes(img)) {
                const image = new Image();
                image.onload = () => {
                    that.image.battlebacks2[img] = {
                        w: image.width,
                        h: image.height,
                        col: 1,
                        row: 1,
                        src: image.src,
                        image: image
                    };
                    itemCount--;
                };
                image.onerror = function() {
                    console.warn(image.src + ' failed');
                    itemCount--;
                };
                image.src = `${scope.constants.href}src/resources/Image/Battlebacks2/${img}.png`;
            } else if (battlers.includes(img)) {
                const image = new Image();
                image.onload = () => {
                    that.image.battlers[img] = {
                        w: image.width,
                        h: image.height,
                        col: 1,
                        row: 1,
                        src: image.src,
                        image: image
                    };
                    itemCount--;
                };
                image.onerror = function() {
                    console.warn(image.src + ' failed');
                    itemCount--;
                };
                image.src = `${scope.constants.href}src/resources/Image/Battlers/${img}.png`;
            } else if (characters.includes(img)) {
                const image = new Image();
                image.onload = () => {
                    that.image.characters[img] = {
                        w: image.width,
                        h: image.height,
                        col: 1,
                        row: 1,
                        src: image.src,
                        image: image
                    };
                    itemCount--;
                };
                image.onerror = function() {
                    console.warn(image.src + ' failed');
                    itemCount--;
                };
                image.src = `${scope.constants.href}src/resources/Image/Characters/${img}.png`;
            } else if (parallaxes.includes(img)) {
                const image = new Image();
                image.onload = () => {
                    that.image.parallaxes[img] = {
                        w: image.width,
                        h: image.height,
                        col: 1,
                        row: 1,
                        src: image.src,
                        image: image
                    };
                    itemCount--;
                };
                image.onerror = function() {
                    console.warn(image.src + ' failed');
                    itemCount--;
                };
                image.src = `${scope.constants.href}src/resources/Image/Parallaxes/${img}.png`;
            } else if (system.includes(img)) {
                const image = new Image();
                image.onload = () => {
                    that.image.system[img] = {
                        w: image.width,
                        h: image.height,
                        col: 1,
                        row: 1,
                        src: image.src,
                        image: image
                    };
                    itemCount--;
                };
                image.onerror = function() {
                    console.warn(image.src + ' failed');
                    itemCount--;
                };
                image.src = `${scope.constants.href}src/resources/Image/System/${img}.png`;
            } else if (tilesets.includes(img)) {
                const image = new Image();
                image.onload = () => {
                    that.image.tilesets[img] = {
                        w: image.width,
                        h: image.height,
                        col: 1,
                        row: 1,
                        src: image.src,
                        image: image,
                        columns: tilesetsImageData[img].columns,
                        imageheight: tilesetsImageData[img].imageheight,
                        imagewidth: tilesetsImageData[img].imagewidth,
                        margin: tilesetsImageData[img].margin,
                        name: tilesetsImageData[img].name,
                        spacing: tilesetsImageData[img].spacing,
                        tilecount: tilesetsImageData[img].tilecount,
                        tileheight: tilesetsImageData[img].tileheight,
                        tilewidth: tilesetsImageData[img].tilewidth
                    };
                    itemCount--;
                };
                image.onerror = function() {
                    console.warn(image.src + ' failed');
                    itemCount--;
                };
                image.src = `${scope.constants.href}src/resources/Image/Tilesets/${img}.png`;
            } else if (titles1.includes(img)) {
                const image = new Image();
                image.onload = () => {
                    that.image.titles1[img] = {
                        w: image.width,
                        h: image.height,
                        col: 1,
                        row: 1,
                        src: image.src,
                        image: image
                    };
                    itemCount--;
                };
                image.onerror = function() {
                    console.warn(image.src + ' failed');
                    itemCount--;
                };
                image.src = `${scope.constants.href}src/resources/Image/Titles1/${img}.png`;
            } else if (titles2.includes(img)) {
                const image = new Image();
                image.onload = () => {
                    that.image.titles2[img] = {
                        w: image.width,
                        h: image.height,
                        col: 1,
                        row: 1,
                        src: image.src,
                        image: image
                    };
                    itemCount--;
                };
                image.onerror = function() {
                    console.warn(image.src + ' failed');
                    itemCount--;
                };
                image.src = `${scope.constants.href}src/resources/Image/Titles2/${img}.png`;
            } else {
                console.warn(`${img} doesn't exist.`);
                itemCount--;
            }
        });
    }
    if (sndArray.length > 0) {
        sndArray.forEach(sound => {
            if (BGM.includes(sound)) {
                const thisSound = new Audio(`${scope.constants.href}src/resources/sound/BGM/${sound}`);
                thisSound.onerror = function() {
                    console.warn(thisSound.src + ' failed');
                    itemCount--;
                };
                thisSound.addEventListener("canplaythrough", () => {
                    that.audio.BGM[sound] = { audio: thisSound };
                    itemCount--;
                }, false);
            } else if (BGS.includes(sound)) {
                const thisSound = new Audio(`${scope.constants.href}src/resources/sound/BGS/${sound}`);
                thisSound.onerror = function() {
                    console.warn(thisSound.src + ' failed');
                    itemCount--;
                };
                thisSound.addEventListener("canplaythrough", () => {
                    that.audio.BGS[sound] = { audio: thisSound };
                    itemCount--;
                }, false);
            } else if (MAIN.includes(sound)) {
                const thisSound = new Audio(`${scope.constants.href}src/resources/sound/MAIN/${sound}`);
                thisSound.onerror = function() {
                    console.warn(thisSound.src + ' failed');
                    itemCount--;
                };
                thisSound.addEventListener("canplaythrough", () => {
                    that.audio.MAIN[sound] = { audio: thisSound };
                    itemCount--;
                }, false);
            } else if (ME.includes(sound)) {
                const thisSound = new Audio(`${scope.constants.href}src/resources/sound/ME/${sound}`);
                thisSound.onerror = function() {
                    console.warn(thisSound.src + ' failed');
                    itemCount--;
                };
                thisSound.addEventListener("canplaythrough", () => {
                    that.audio.ME[sound] = { audio: thisSound };
                    itemCount--;
                }, false);
            } else if (SE.includes(sound)) {
                const thisSound = new Audio(`${scope.constants.href}src/resources/sound/SE/${sound}`);
                thisSound.onerror = function() {
                    console.warn(thisSound.src + ' failed');
                    itemCount--;
                };
                thisSound.addEventListener("canplaythrough", () => {
                    that.audio.SE[sound] = { audio: thisSound };
                    itemCount--;
                }, false);
            } else {
                console.warn(`${sound} doesn't exist.`);
                itemCount--;
            }
        });
    }

    const point = [".", "..", "...", "..", ".", ""];
    var countPoint = 0;
    //? set a timer to see different things, just for test
    let changeStateTest = true;
    // setTimeout(() => {
    // changeStateTest = true;
    // }, 32000);

    const inter = setInterval(async() => {
        ctx.clearRect(0, 0, scope.constants.width, scope.constants.height);
        ctx.textAlign = "center";
        ctx.fillStyle = "#fff";
        ctx.font = '32px Azure';

        ctx.fillText(`The game is loading${point[(Math.floor(countPoint / 30)) % 6]}`, scope.constants.width / 2, scope.constants.height / 2);
        countPoint++;

        //loading bar
        ctx.fillStyle = "#59BAE9";
        roundRect(ctx, scope.constants.width * 20 / 100, scope.constants.height * 90 / 100, (1 - ((itemCount) / itemTot)) * scope.constants.width * 60 / 100, scope.constants.height * 5 / 100, 5, true);

        ctx.fillStyle = "#fff";
        ctx.font = '16px Arial';
        if (itemCount > 0 || changeStateTest === false) {
            ctx.fillText(`Still loading content... ${itemTot - itemCount} / ${itemTot}`, scope.constants.width / 2, scope.constants.height * 93 / 100);
        } else {
            clearInterval(inter);
            console.log("Finished loading assets.");
            return resolve(that);
        }
    }, 60);
});