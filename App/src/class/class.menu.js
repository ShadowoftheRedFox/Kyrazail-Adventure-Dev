class GameMenuBuilder {
    /**
     * @param {GameMenuBuilderOptions} options 
     */
    constructor(options = {}, skipValidation = false) {
        this.setup(options, skipValidation);
    }

    /**
     * @param {GameMenuBuilderOptions} options 
     * @param {boolean} skipValidation
     */
    setup(options, skipValidation) {
        this.positionY = options.positionY || "center";
        this.positionX = options.positionX || "center";

        this.name = (options.name ? options.name.toString().trim() : (function () { throw new ReferenceError(`You must pass a name for the menu.`); })());
        this.menu = (skipValidation == true ? options.menu : this.validateMenus(options.menu));

        this.menuFocused = options.menuFocused || 0;

        this.x = options.x || 0;
        this.y = options.y || 0;
        this.w = options.w || ConfigConst.MAINCONTAINER.offsetWidth;
        this.h = options.h || ConfigConst.MAINCONTAINER.offsetHeight;

        this.align = options.align || "vertical";
    }

    /**
     * @param {GameMenuBuilderOptionsMenu[]} menus 
     */
    validateMenus(menus) {
        menus.forEach((menu, idx) => {
            if (!menu.name) throw new ReferenceError(`The menu ${idx} must have a name.`);
            menu.name = menu.name.toString().trim();
            if (!menu.focused || typeof menu.focused != "boolean") menu.focused = false;
            if (!["function", "menu"].includes(menu.value)) throw new TypeError(`The menu ${idx} (${menu.name}) must have a valid value.`);
            if (menu.value == "function" && (!menu.function || typeof menu.function != "function")) throw new TypeError(`The menu ${idx} (${menu.name}) must have a valid function.`);
            if (menu.value == "menu" && (!menu.menu || !menu.menu.length)) throw new TypeError(`The menu ${idx} (${menu.name}) must have a valid menu.`);
            if (menu.value == "menu") menu.menu = this.validateMenus(menu.menu);
            if (!menu.align) menu.align = "vertical";
            if (!["horizontal", "vertical"].includes(menu.align)) throw new TypeError(`The menu ${idx} (${menu.name}) must have a valid align.`);
        });
        return menus;
    }
}