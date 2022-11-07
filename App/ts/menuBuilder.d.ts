export { }

declare global {
    class GameMenuBuilder {
        constructor(options: GameMenuBuilderOptions);
        title: string;
    }

    /**
     * It's only the options to build the menu.
     * There is no "utility" options like index of button, everything will be handled internaly.
     * This may change often, to fix the future numerous amount of bugs.
     * Default options will also be handled internaly, as well as validation.
     */
    type GameMenuBuilderOptions = {
        background: HTMLImageElement | HTMLImageElement[] | ColorResolvable | CanvasGradient | CanvasPattern;
        backgroundMusic: HTMLAudioElement;
        position: keyof typeof RelativePosition;

        debug: boolean

        // title style
        title: string;
        titlePosition: "left" | "center" | "right";
        fontSize: string;
        fontStyle: string;
        fontColor: string | ColorResolvable | CanvasGradient | CanvasPattern;
        textAlign: CanvasTextAlign;

        // key for each action
        confirmKeysBind: string[];
        backKeysBind: string[];
        upKeysBind: string[];
        downKeysBind: string[];
        leftKeysBind: string[];
        rightKeysBind: string[];

        /**Transition between buttons.*/
        transition: boolean;
        frame: boolean;
        menu: GameMenuBuilderOptionsButton[]
    };

    type GameMenuBuilderOptionsButton = {
        content: string;
        submenu: GameMenuBuilder | undefined;

        inline: boolean;
        //? specific to the parameters of the button?
        onHover: (...args: any) => any | null;
        onClick: (...args: any) => any | null;
        onConfirm: (...args: any) => any | null;

        // content style
        fontSize: string | "inherit";
        fontStyle: string | "inherit";
        fontColor: string | ColorResolvable | CanvasGradient | CanvasPattern | "inherit";
        textAlign: CanvasTextAlign | "inherit";
        background: HTMLImageElement | ColorResolvable | CanvasGradient | CanvasPattern;
    }

    type ColorResolvable =
        | keyof typeof Colors
        | Number
        | HexColorString;

    const Colors: {
        Default: 0x000000;
        White: 0xffffff;
        Aqua: 0x1abc9c;
        Green: 0x57f287;
        Blue: 0x3498db;
        Yellow: 0xfee75c;
        Purple: 0x9b59b6;
        LuminousVividPink: 0xe91e63;
        Fuchsia: 0xeb459e;
        Gold: 0xf1c40f;
        Orange: 0xe67e22;
        Red: 0xed4245;
        Grey: 0x95a5a6;
        Navy: 0x34495e;
        DarkAqua: 0x11806a;
        DarkGreen: 0x1f8b4c;
        DarkBlue: 0x206694;
        DarkPurple: 0x71368a;
        DarkVividPink: 0xad1457;
        DarkGold: 0xc27c0e;
        DarkOrange: 0xa84300;
        DarkRed: 0x992d22;
        DarkGrey: 0x979c9f;
        DarkerGrey: 0x7f8c8d;
        LightGrey: 0xbcc0c0;
        DarkNavy: 0x2c3e50;
        Blurple: 0x5865f2;
        Greyple: 0x99aab5;
        DarkButNotBlack: 0x2c2f33;
        NotQuiteBlack: 0x23272a;
    };

    type HexColorString = `#${string}`;

    enum RelativePosition {
        TOPLEFT = 0,
        TOPCENTER = 1,
        TOPRIGHT = 2,
        LEFT = 3,
        CENTER = 4,
        RIGHT = 5,
        BOTTOMLEFT = 6,
        BOTTOMCENTER = 7,
        BOTTOMRIGHT = 8
    }

    enum ButtonForm {
        RECTANGLE = 0,
        ROUNDED = 1
    }
}