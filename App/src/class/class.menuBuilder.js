class GameMenuBuilder {
    /**
     * @param {HTMLCanvasElement} canvas
     * @param {MenuBuilderDefaultOptions} options 
     */
    constructor(scope, canvas, options = {}) {
        if (!canvas || !canvas.getContext) throw new Error("Canvas is not defined.");
        this.canvas = canvas;

        this.background = options.background || "DarkButNotBlack";
        this.backgroundMusic = options.backgroundMusic || null;

        this.debug = options.debug || false;

        // title style
        this.title = options.title || "Menu Title";
        this.titlePosition = options.titlePosition || "center";
        this.fontSize = options.fontSize || "1em";
        this.fontStyle = options.fontStyle || "ComicSansMS";
        this.fontColor = options.fontColor || "#000000";
        this.textAlign = options.textAlign || "center";
        //? title is always on top

        // key for each action
        this.confirm = options.confirm || [];
        this.back = options.back || [];
        this.up = options.up || [];
        this.down = options.down || [];
        this.left = options.left || [];
        this.right = options.right || [];

        this.frame = options.frame || false;
        /**Transition between buttons.*/
        this.transition = options.transition || false;
        this.position = options.position || "BOTTOMCENTER";

        this.menu = options.menu || [];
        this.validateMenu();
        this.init(scope);
    }

    validateMenu() {
        const menu = this.menu;
        if (menu.length == 0) return;
        menu.forEach((button, id) => {
            menu[id].content = button.content || `Button ${id}`;
            menu[id].submenu = button.submenu || null;
            menu[id].inline = button.inline || false;

            menu[id].onHover = ((typeof button.onHover == "function") ? button.onHover : null);
            menu[id].onClick = ((typeof button.onClick == "function") ? button.onClick : null);
            menu[id].onConfirm = ((typeof button.onConfirm == "function") ? button.onConfirm : null);

            menu[id].fontSize = button.fontSize || "0.5em";
            menu[id].fontStyle = button.fontStyle || "ComicSansMS";
            menu[id].fontColor = button.fontColor || "#000000";
            menu[id].textAlign = button.textAlign || "center";
            menu[id].background = button.background || "DarkButNotBlack";
        });
    }

    /**
     * Setup every internal data.
     * @param {GameScope} scope
     */
    init(scope) {
        //STEP get context
        this.context = this.canvas.getContext("2d", { willReadFrequently: true });

        //STEP create a refreshCanvas parameter to return if update is needed.
        this.refreshCanvas = false;

        //STEP since some elements are inline, buttonFocused is <= as the amount of buttons, so set up all of those:
        this.buttonAmount = 0;
        this.buttonFocused = 0;
        this.menu.forEach(button => {
            if (!button.inline) this.buttonAmount++;
        });
    }

    /**
     * @param {GameScope} scope 
     * @returns {boolean} Needs update or no.
     */
    menuRender(scope) {
        //STEP get actual dimension
        const width = scope.w;
        const height = scope.h;

        //STEP set text baseline to middle, because it's evenly reparted on bottom and top, so it's easier to draw with different text size
        this.context.textBaseline = "middle";

        //STEP clear the canvas
        this.context.clearRect(0, 0, width, height);

        //STEP draw background depending of the type
        if (Array.isArray(this.background)) {
            //? preload it in init?
            this.background.forEach((imageName, id) => {
                if (scope.cache.image[imageName]) this.context.drawImage(scope.cache.image[imageName].image, 0, 0, width, height);
                else throw new Error(`${imageName} is not an image in cache`);
            });
        } else if (this.background instanceof HTMLImageElement) {
            this.context.drawImage(scope.cache.image[this.background].image, 0, 0, width, height);
        } else {
            this.context.fillStyle = this.background;
            this.context.fillRect(0, 0, width, height);
        }

        //STEP if debugging is true
        if (this.debug) {
            // alway refresh canvas to see what's happening at every frame
            this.refreshCanvas = true;

            // draw the last click 
            this.context.fillStyle = "red";
            this.context.beginPath();
            this.context.arc(MouseTrackerManager.data.lastMoveTrue.x, MouseTrackerManager.data.lastMoveTrue.y, 10, 0, 2 * Math.PI, false);
            this.context.fill();
            this.context.closePath();
            this.context.fillStyle = "blue";
            this.context.beginPath();
            this.context.arc(MouseTrackerManager.data.click[MouseTrackerManager.data.click.length - 1].x, MouseTrackerManager.data.click[MouseTrackerManager.data.click.length - 1].y, 10, 0, 2 * Math.PI, false);
            this.context.fill();
            this.context.closePath();

            //TODO draw button hit boxes
        }

        //STEP draw title
        this.context.font = `${this.fontSize} ${this.fontStyle}`;
        this.context.fillStyle = this.fontColor;
        this.context.textAlign = this.textAlign;
        const TitleMetrics = this.context.measureText(this.title);
        const TitleMetricsHeight = TitleMetrics.actualBoundingBoxDescent + TitleMetrics.actualBoundingBoxAscent;
        switch (this.titlePosition) {
            case "left":
                this.context.fillText(this.title, TitleMetricsHeight, TitleMetricsHeight);
                break;
            case "center":
                this.context.fillText(this.title, width, TitleMetricsHeight);
                break;
            case "right":
                this.context.fillText(this.title, width - TitleMetricsHeight, TitleMetricsHeight);
                break;
            default:
                // center the title
                this.context.fillText(this.title, width, TitleMetricsHeight);
                break;
        }

        /*
        ? What's up 'til last time?
        BUG title is not being displayed
        
        */

        //STEP draw button background

        //STEP draw buttons

        //step draw frame

        return this.refreshCanvas;
    }

    /**
     * @param {GameScope} scope 
     */
    menuUpdate(scope) { }
}