class GamePauseInterface extends GameInterfaces {
    /**
     * @param {GameScope} scope
     */
    constructor(scope) {
        super({
            asOwnCanvas: true,
            zindex: ConfigConst.ZINDEX.PAUSE,
            canvasGroup: "GamePauseGroup",
            requiredImage: [],
            requiredAudio: [],
            activated: false,
            needsUpdate: false
        }, scope);

        /**@type {HTMLImageElement} */
        this.bluredImage = null;
        this.keyPressDelay = 0;
        this.mainMenuName = [
            {
                name: "Resume",
                x: 0, y: 60, w: 0, h: 30
            },
            {
                name: "Quest",
                x: 0, y: 60, w: 0, h: 30
            },
            {
                name: "Party",
                x: 0, y: 60, w: 0, h: 30
            },
            {
                name: "Skill",
                x: 0, y: 60, w: 0, h: 30
            },
            {
                name: "Help",
                x: 0, y: 60, w: 0, h: 30
            },
            {
                name: "Settings",
                x: 0, y: 60, w: 0, h: 30
            },
            {
                name: "Save",
                x: 0, y: 60, w: 0, h: 30
            },
            {
                name: "Load",
                x: 0, y: 60, w: 0, h: 30
            },
            {
                name: "Quit",
                x: 0, y: 60, w: 0, h: 30
            }
        ];
        this.inMenu = false;
        this.mainMenuChosen = 0;
        this.keyboardDelay = 0;
        this.partyMenu = {
            chosen: 0,
            inMenu: false,
            chosenInEntity: 0,
            inEntity: false,

            equipmentToChange: 0,
            equipmentToChangeValidate: false,
            equipmentChosen: 0,
            equipmentChosenValidate: false
        }
        this.questMenu = {
            chosen: 0,
            inMenu: false
        }
        this.settingsMenu = {
            chosen: 0
        }
        this.mainMenuButtonHitbox(scope);
    }

    /**@param {GameScope} scope */
    render(scope) {
        const ctx = scope.cache.context[this.canvasGroup];
        const Width = scope.w;
        const Height = scope.h;

        ctx.clearRect(0, 0, Width, Height);

        if (this.bluredImage) {
            ctx.drawImage(this.bluredImage, 0, 0, Width, Height);
        }

        /*
        Buttons:
        resume -> back to game, unpause function DONE
        quest -> show finished, in progress and failed quest, let read and chose active one
        party -> show entities in the party, chosing one show stats and status and equipement, and usable outside combat skills
        skill -> level up you skill tree
        help -> show help to progress in the story
        settings -> settings, same as main menu
        save -> save your curent progress
        load -> load a save
        quit -> back to the main menu
        */

        // draw the line separating the menu from the content
        RectangleCreator.frameLine(scope, ctx, 14, 100, Width - 28, true, true);

        // write buttons
        ctx.fillStyle = "white";
        ctx.font = "15px Azure";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        // draw each category
        this.mainMenuName.forEach((b, id) => {
            if (id == this.mainMenuChosen) {
                ctx.font = "bold 18px Azure";
            } else {
                ctx.font = "15px Azure";
            }
            ctx.fillStyle = "white";
            ctx.fillText(b.name, ((Width - 20) / (this.mainMenuName.length + 1)) * (id + 1) + 10, 75);
        });

        // draw the title
        ctx.font = "30px Azure";
        ctx.fillText("Pause menu", Width / 2, 30);

        switch (this.mainMenuChosen) {
            case 0: // Resume
                ctx.fillText("Back to the game.", Width / 2, Height / 2);
                break;
            case 1: // Quest
                this.renderQuests(scope);
                break;
            case 2: // Party
                this.renderParty(scope);
                break;
            case 3: // Skill
                ctx.fillText("Skill tree coming soon.", Width / 2, Height / 2);
                // ? create an interface for this ?
                break;
            case 4: // Help
                this.renderhelp(scope);
                break;
            case 5: // Settings
                this.renderSettings(scope);
                break;
            case 6: // Save
                ctx.fillText("Game saves coming soon.", Width / 2, Height / 2);
                break;
            case 7: // Load
                ctx.fillText("Game loads coming soon.", Width / 2, Height / 2);
                break;
            case 8: // Quit
                ctx.fillText("Back to the main menu.", Width / 2, Height / 2 - 15);
                ctx.font = "15px Azure";
                ctx.fillText("All unsaved progress will be lost.", Width / 2, Height / 2 + 10);
                break;
            default:
                throw new Error("Unknown menu");
        }

        // clear everything outside the frame
        ctx.clearRect(0, 0, 10, Height); // right
        ctx.clearRect(0, 0, Width, 10); // top
        ctx.clearRect(Width - 10, 0, Width, Height); // left
        ctx.clearRect(0, Height - 10, Width, Height); // bottom
        // and draw the frame of the pause menu in last
        RectangleCreator.frameRectangle(scope, ctx, 10, 10, Width - 20, Height - 20);

        // to see the min width
        // ctx.fillStyle = "red";
        // ctx.fillRect(800, 0, 2, Height);

        this.needsUpdate = false;
    }

    /**@param {GameScope} scope*/
    renderhelp(scope) {
        const ctx = scope.cache.context[this.canvasGroup];
        const Width = scope.w;
        const Height = scope.h;

        if (!scope.global.quest.active) {
            // if no quest is active, show this
            ctx.textAlign = "center";
            ctx.font = "15px Azure"
            ctx.fillText("You have no active quest yet.", Width / 2, Height / 2 - 10);
            ctx.fillText("Set one active or explore the world to get new quests.", Width / 2, Height / 2 + 10);
        } else {
            //TODO show the help quest messsage accordingly
        }
    }

    /**@param {GameScope} scope*/
    renderParty(scope) {
        const ctx = scope.cache.context[this.canvasGroup];
        const Width = scope.w;
        const Height = scope.h;

        // TODO show it's party in the fighting group
        // TODO then show other members
        // if not in menu, just show the quick data
        // in in menu, choose one and you get the full data with the usable oustide fight skills
        // TODO create a pattern for an entity and replicate it
        // TODO create a scroll functionnality

        if (this.partyMenu.inMenu) {
            if (this.partyMenu.chosen == 0) {
                this.displayEntityInfos(scope, scope.global.player);
            } else {
                this.displayEntityInfos(scope, scope.global.party[this.partyMenu.chosen - 1]);
            }
            return;
        }

        // show the player
        this.displayEntityInfosShort(scope, scope.global.player, 20, 110, this.partyMenu.chosen == 0 && this.inMenu);

    }

    /**@param {GameScope} scope*/
    renderSettings(scope) {
        const ctx = scope.cache.context[this.canvasGroup];
        const Width = scope.w;
        const Height = scope.h;

        ctx.fillStyle = "white";
        ctx.textAlign = "left";

        if (this.settingsMenu.chosen == 0 && this.inMenu) { ctx.font = "bold 20px Azure"; } else { ctx.font = "20px Azure"; }
        ctx.fillText(`Always run: ${GameConfig.alwaysRun}`, 30, 120);
        if (this.settingsMenu.chosen == 1 && this.inMenu) { ctx.font = "bold 20px Azure"; } else { ctx.font = "20px Azure"; }
        ctx.fillText(`Music volume: - ${Math.floor(scope.soundsSettings.volumeBG * 100)}% + `, 30, 150);
        if (this.settingsMenu.chosen == 2 && this.inMenu) { ctx.font = "bold 20px Azure"; } else { ctx.font = "20px Azure"; }
        ctx.fillText(`Sound volume: - ${Math.floor(scope.soundsSettings.volumeEFX * 100)}% + `, 30, 180);
    }

    /**@param {GameScope} scope*/
    renderQuests(scope) {
        const ctx = scope.cache.context[this.canvasGroup];
        const Width = scope.w;
        const Height = scope.h;
        const failed = scope.global.quest.failed;
        const ongoing = scope.global.quest.ongoing;
        const finished = scope.global.quest.finished;
        const menu = this.questMenu;

        // quests category
        if (menu.chosen == 0 && this.questMenu.inMenu) { ctx.font = "bold 18px Azure"; } else { ctx.font = "15px Azure"; }
        ctx.fillText(`Ongoing (${ongoing.length})`, ((Width - 40) / 4) + 20, 120);
        if (menu.chosen == 1 && this.questMenu.inMenu) { ctx.font = "bold 18px Azure"; } else { ctx.font = "15px Azure"; }
        ctx.fillText(`Finished (${finished.length})`, ((Width - 40) / 4) * 2 + 20, 120);
        if (menu.chosen == 2 && this.questMenu.inMenu) { ctx.font = "bold 18px Azure"; } else { ctx.font = "15px Azure"; }
        ctx.fillText(`Failed (${failed.length})`, ((Width - 40) / 4) * 3 + 20, 120);

        // if not quests
        if (failed.length + ongoing.length + 1 + finished.length == 0) {
            ctx.font = "30px Azure";
            ctx.fillText("No quests available right now.", Width / 2, Height / 2 - 15);
            ctx.font = "15px Azure";
            ctx.fillText("Explore the world to get new quests.", Width / 2, Height / 2 + 10);
            return;
        }

    }

    /**@param {GameScope} scope */
    update(scope) {
        const Width = scope.w;
        const Height = scope.h;

        if (this.resized) {
            this.resized = false;
            this.mainMenuButtonHitbox(scope);
            this.u();
        }

        const k = GameConfig.keyBoard;
        const kup = KTM.pressed(k.up),
            kdown = KTM.pressed(k.down),
            kright = KTM.pressed(k.right),
            kleft = KTM.pressed(k.left),
            kconfirm = KTM.pressed(k.confirm),
            kback = KTM.pressed(k.back);

        // to apply the delay for the keyboard
        if (kup || kdown || kright || kleft || kconfirm || kback) {
            if (this.keyboardDelay + 150 >= Date.now()) {
                return;
            } else {
                this.keyboardDelay = Date.now();
            }
        }

        // unpause
        if ((KTM.pressed(GameConfig.keyBoard.pause) || (kback && !this.inMenu)) && this.keyPressDelay + 150 < Date.now()) {
            this.unpause(scope);
            return;
        }

        // menus and everything
        if (!this.inMenu) {
            if (kconfirm) { this.inMenu = true; GameSoundManager.playSound("SE/Cursor1"); this.u(); return; }
            // choose through the main menu
            if (kright) { this.mainMenuChosen++; GameSoundManager.playSound("SE/Cursor1"); this.u(); }
            if (kleft) { this.mainMenuChosen--; GameSoundManager.playSound("SE/Cursor1"); this.u(); }
            this.mainMenuChosen = this.mainMenuChosen.clamp(0, this.mainMenuName.length - 1);
            // choose with mouse
            this.mainMenuName.forEach((b, i) => {
                if (MTM.clickOver(b.x, b.y, b.w, b.h, false, 16)) { this.mainMenuChosen = i; this.u(); }
            })
            return;
        }

        // Resume
        if (this.mainMenuChosen === 0) { this.unpause(scope); return; }

        // Quest
        if (this.mainMenuChosen === 1) {
            if (this.questMenu.inMenu) {
                // TODO when quests are here
                if (kback && this.questMenu.inMenu) { this.questMenu.inMenu = false; GameSoundManager.playSound("SE/Cancel1"); this.u(); return; }
            }

            if (kconfirm) { this.questMenu.inMenu = true; GameSoundManager.playSound("SE/Cursor1"); this.u(); return; }
            // choose through the menu
            if (kright) { this.questMenu.chosen++; GameSoundManager.playSound("SE/Cursor1"); this.u(); }
            if (kleft) { this.questMenu.chosen--; GameSoundManager.playSound("SE/Cursor1"); this.u(); }
            this.questMenu.chosen = this.questMenu.chosen.clamp(0, 2);
        }

        // Party
        if (this.mainMenuChosen === 2) {
            // chose the entity menu
            if (this.partyMenu.inEntity && this.partyMenu.chosenInEntity == 1) {
                if (kback) {
                    this.partyMenu.inEntity = false;
                    this.partyMenu.equipmentToChange = 0; this.partyMenu.equipmentToChangeValidate = false;
                    this.partyMenu.equipmentChosen = 0; this.partyMenu.equipmentChosenValidate = false;
                    GameSoundManager.playSound("SE/Cancel1");
                    this.u(); return;
                }
                // move through the equipment to change
                if (kdown) { this.partyMenu.equipmentToChange++; GameSoundManager.playSound("SE/Cursor1"); this.u(); }
                if (kup) { this.partyMenu.equipmentToChange--; GameSoundManager.playSound("SE/Cursor1"); this.u(); }
                this.partyMenu.equipmentToChange = this.partyMenu.equipmentToChange.clamp(0, 6);
                // TODO finish the equipment to choose
                return;
            }

            // chose the entity
            if (this.partyMenu.inMenu) {
                if (kback) { this.partyMenu.inMenu = false; this.partyMenu.chosenInEntity = 0; GameSoundManager.playSound("SE/Cancel1"); this.u(); return; }
                if (kconfirm) { this.partyMenu.inEntity = true; GameSoundManager.playSound("SE/Cursor1"); this.u(); return; }
                // choose through general, formation, skill and equipment
                if (kright) { this.partyMenu.chosenInEntity++; GameSoundManager.playSound("SE/Cursor1"); this.u(); }
                if (kleft) { this.partyMenu.chosenInEntity--; GameSoundManager.playSound("SE/Cursor1"); this.u(); }
                this.partyMenu.chosenInEntity = this.partyMenu.chosenInEntity.clamp(0, 3);
                return;
            }

            if (kconfirm) { this.partyMenu.inMenu = true; GameSoundManager.playSound("SE/Cursor1"); this.u(); return; }
            // choose through the entities
            if (kdown) { this.partyMenu.chosen++; GameSoundManager.playSound("SE/Cursor1"); this.u(); }
            if (kup) { this.partyMenu.chosen--; GameSoundManager.playSound("SE/Cursor1"); this.u(); }
            this.partyMenu.chosen = this.partyMenu.chosen.clamp(0, scope.global.party.length);
        }

        // Skill
        if (this.mainMenuChosen === 3) { }

        // Help
        if (this.mainMenuChosen === 4) { }

        // Settings
        if (this.mainMenuChosen === 5) {
            // always run
            if (kconfirm && this.settingsMenu.chosen == 0) {
                GameConfig.alwaysRun = !GameConfig.alwaysRun; GameSoundManager.playSound("SE/Cursor1");
                this.u();
            }
            // music volume
            if (kright && this.settingsMenu.chosen == 1) {
                scope.soundsSettings.volumeBG = Math.round((scope.soundsSettings.volumeBG * 100 + 5).clamp(0, 100)) / 100;
                GameSoundManager.changeVolume();
                this.u();
            }
            if (kleft && this.settingsMenu.chosen == 1) {
                scope.soundsSettings.volumeBG = Math.round((scope.soundsSettings.volumeBG * 100 - 5).clamp(0, 100)) / 100;
                GameSoundManager.changeVolume();
                this.u();
            }
            // sound volume
            if (kright && this.settingsMenu.chosen == 2) {
                scope.soundsSettings.volumeEFX = Math.round((scope.soundsSettings.volumeEFX * 100 + 5).clamp(0, 100)) / 100;
                GameSoundManager.changeVolume();
                this.u();
            }
            if (kleft && this.settingsMenu.chosen == 2) {
                scope.soundsSettings.volumeEFX = Math.round((scope.soundsSettings.volumeEFX * 100 - 5).clamp(0, 100)) / 100;
                GameSoundManager.changeVolume();
                this.u();
            }

            // choose through the entities
            if (kdown) { this.settingsMenu.chosen++; GameSoundManager.playSound("SE/Cursor1"); this.u(); }
            if (kup) { this.settingsMenu.chosen--; GameSoundManager.playSound("SE/Cursor1"); this.u(); }
            this.settingsMenu.chosen = this.settingsMenu.chosen.clamp(0, 2);
        }

        // Save
        if (this.mainMenuChosen === 6) { }

        // Load
        if (this.mainMenuChosen === 7) { }

        // Quit
        if (this.mainMenuChosen === 8 && kconfirm) {
            // TODO 
        }

        // back to menu
        if (kback) {
            this.inMenu = false;
            this.questMenu.chosen = 0;
            this.partyMenu.chosen = 0;
            this.settingsMenu.chosen = 0;
            GameSoundManager.playSound("SE/Cancel1");
            this.u(); return;
        }
        // TODO back button/system
    }

    /**@param {GameScope} scope */
    pause(scope) {
        // get the map image and blur it
        /*
        const ctx = scope.cache.context[this.canvasGroup];
        const that = this;
        const i = document.createElement('img');
        i.onerror = function () {
            console.warn("Failed to blur the map (1).");
        }
        i.onload = function () {
            ctx.filter = "blur(10px)";
            ctx.clearRect(0, 0, scope.w, scope.h);
            ctx.drawImage(i, 0, 0, i.width, i.height, 0, 0, i.width, i.height);
            ctx.filter = "none";
            const ii = document.createElement('img');
            ii.onerror = function () {
                console.warn("Failed to blur the map (2).");
            }
            ii.onload = function () {
                that.bluredImage = ii;
                that.u();
            }
            ii.src = that.interfaceCanvas.toDataURL('image/png', 1.0);
        }
        i.src = scope.state.menu.map.interfaceCanvas.toDataURL('image/png', 1.0);
        */

        scope.state.menu.map.interfaceCanvas.hidden = true;
        this.interfaceCanvas.hidden = false;
        this.keyPressDelay = Date.now();
        this.activated = true;
        this.u();
    }

    /**@param {GameScope} scope */
    unpause(scope) {
        this.activated = false;
        scope.cache.context[this.canvasGroup].clearRect(0, 0, scope.w, scope.h);
        this.interfaceCanvas.hidden = true;
        this.mainMenuChosen = 0;

        scope.state.menu.map.interfaceCanvas.hidden = false;
        scope.state.menu.map.activated = true;
        scope.state.menu.map.needsUpdate = true;
        scope.state.menu.map.keyPressDelay = Date.now();
        GameSoundManager.playSound("SE/Cancel1");
    }

    /**@param {GameScope} scope */
    mainMenuButtonHitbox(scope) {
        // calculate the average size of each element
        scope.cache.context[this.canvasGroup].font = "15px Azure";
        let wa = []
        this.mainMenuName.forEach(b => {
            wa.push(scope.cache.context[this.canvasGroup].measureText(b.name).width);
        })

        this.mainMenuName.forEach((b, id) => {
            let w = wa[id];
            let ws = 0;
            let we = 0;
            const part = ((scope.w - 20) / (this.mainMenuName.length + 1));
            if (id + 1 < this.mainMenuName.length) {
                // start of the next item
                we = (part * (id + 2) + 10 - wa[id + 1] / 2)
                    // end of the current item
                    - (part * (id + 1) + 10 + w / 2);
            } else {
                we = scope.w - (part * (id + 1) + 10 + w / 2);
            }
            if (id > 0) {
                // start of the current item
                ws = (part * (id + 1) + 10 - w / 2)
                    // end of the previous item
                    - (part * (id) + 10 + wa[id - 1] / 2);
            } else {
                ws = (part * (id + 1) + 10 - w / 2);
            }

            b.x = ((scope.w - 20) / (this.mainMenuName.length + 1)) * (id + 1) + 10 - w / 2 - ws / 2;
            b.w = w + we / 2 + ws / 2;
        });
    }

    u() { this.needsUpdate = true; }

    /**
     * Draw the short infos about the given entity starting from the (x,y) coordinates
     * @param {GameScope} scope 
     * @param {GamePlayerMember | GamePartyMember} entity 
     * @param {number} x 
     * @param {number} y 
     * @param {boolean} focused
     */
    displayEntityInfosShort(scope, entity, x, y, focused = false) {
        const ctx = scope.cache.context[this.canvasGroup];
        const Width = scope.w;
        const Height = scope.h;

        // don't draw if y is too low
        if (y >= Height - 10) { return; }

        // draw the frame 
        if (focused) {
            RectangleCreator.frameRectangleTrans(scope, ctx, x, y, Width - 20 - x, 150);
        } else {
            RectangleCreator.frameRectangle(scope, ctx, x, y, Width - 20 - x, 150);
        }

        // draw the face
        RectangleCreator.frameRectangle(scope, ctx, x, y, 150, 150,
            scope.cache.image[entity.face.src].image,
            entity.face.col * 96, entity.face.row * 96,
            96, 96
        );

        const xps = scope.calculateXp(entity.lvl, entity.xp);

        // draw the name
        ctx.fillStyle = "white";
        ctx.font = "18px Azure";
        ctx.textAlign = "left";
        ctx.fillText(`${entity.firstName} ${entity.lastName} | Level ${xps.l} | ${entity.species} | ${entity.class}`, x + 160, y + 20, Width - 230);

        // draw xp bar
        ctx.font = "15px Azure";
        ctx.fillStyle = "white";
        ctx.lineWidth = 2;
        ctx.fillText(`Xp: ${xps.r} / ${xps.t}`, x + 160, y + 40);
        ctx.fillStyle = "green";
        ctx.fillRect(x + 160, y + 55, (xps.r / xps.t) * 200, 8);
        ctx.strokeStyle = "white";
        ctx.strokeRect(x + 160, y + 55, 200, 8);

        // draw health bar
        ctx.font = "15px Azure";
        ctx.fillStyle = "white";
        ctx.lineWidth = 2;
        ctx.fillText(`Hp: ${entity.stats.hp} / ${entity.stats.maxhp}`, x + 160, y + 75);
        ctx.fillStyle = "red";
        ctx.fillRect(x + 160, y + 90, (entity.stats.hp / entity.stats.maxhp) * 200, 8);
        ctx.strokeStyle = "white";
        ctx.strokeRect(x + 160, y + 90, 200, 8);

        // draw magic point bar
        ctx.font = "15px Azure";
        ctx.fillStyle = "white";
        ctx.lineWidth = 2;
        ctx.fillText(`Mp: ${entity.stats.mp} / ${entity.stats.maxmp}`, x + 160, y + 110);
        ctx.fillStyle = "blue";
        ctx.fillRect(x + 160, y + 125, (entity.stats.mp / entity.stats.maxmp) * 200, 8);
        ctx.strokeStyle = "white";
        ctx.strokeRect(x + 160, y + 125, 200, 8);

        // say the description
        ctx.font = "12px Azure";
        ctx.fillStyle = "white";
        scope.divideText(ctx, entity.description, Width - 440, 100).forEach((line, id) => {
            ctx.fillText(line, x + 380, y + 40 + id * 20);
        });
    }

    /**
     * Draw the infos about the given entity
     * @param {GameScope} scope 
     * @param {GamePlayerMember | GamePartyMember} entity 
     */
    displayEntityInfos(scope, entity) {
        const ctx = scope.cache.context[this.canvasGroup];
        const Width = scope.w;
        const Height = scope.h;

        ctx.font = "15px Azure";
        ctx.fillStyle = "white";

        // line between the entity menu
        RectangleCreator.frameLine(scope, ctx, 16, 140, Width - 32, true, true);
        if (0 == this.partyMenu.chosenInEntity) { ctx.font = "bold 18px Azure"; } else { ctx.font = "15px Azure"; }
        ctx.fillText("General", ((Width - 40) / 5), 115);
        if (1 == this.partyMenu.chosenInEntity) { ctx.font = "bold 18px Azure"; } else { ctx.font = "15px Azure"; }
        ctx.fillText("Equipment", ((Width - 40) / 5) * 2, 115);
        if (2 == this.partyMenu.chosenInEntity) { ctx.font = "bold 18px Azure"; } else { ctx.font = "15px Azure"; }
        ctx.fillText("Formation", ((Width - 40) / 5) * 3, 115);
        if (3 == this.partyMenu.chosenInEntity) { ctx.font = "bold 18px Azure"; } else { ctx.font = "15px Azure"; }
        ctx.fillText("Skills", ((Width - 40) / 5) * 4, 115);

        if (0 == this.partyMenu.chosenInEntity) {
            // draw the face
            RectangleCreator.frameRectangle(scope, ctx, 20, 150, 150, 150,
                scope.cache.image[entity.face.src].image,
                entity.face.col * 96, entity.face.row * 96,
                96, 96
            );

            const xps = scope.calculateXp(entity.lvl, entity.xp);

            // draw the name
            ctx.fillStyle = "white";
            ctx.font = "18px Azure";
            ctx.textAlign = "left";
            ctx.fillText(`${entity.firstName} ${entity.lastName} | Level ${xps.l} | ${entity.species} | ${entity.class}`, 180, 170, Width - 230);

            // draw xp bar
            ctx.font = "15px Azure";
            ctx.fillStyle = "white";
            ctx.lineWidth = 2;
            ctx.fillText(`Xp: ${xps.r} / ${xps.t}`, 180, 190);
            ctx.fillStyle = "green";
            ctx.fillRect(180, 205, (xps.r / xps.t) * 200, 8);
            ctx.strokeStyle = "white";
            ctx.strokeRect(180, 205, 200, 8);

            // draw health bar
            ctx.font = "15px Azure";
            ctx.fillStyle = "white";
            ctx.lineWidth = 2;
            ctx.fillText(`Hp: ${entity.stats.hp} / ${entity.stats.maxhp}`, 180, 225);
            ctx.fillStyle = "red";
            ctx.fillRect(180, 240, (entity.stats.hp / entity.stats.maxhp) * 200, 8);
            ctx.strokeStyle = "white";
            ctx.strokeRect(180, 240, 200, 8);

            // draw magic point bar
            ctx.font = "15px Azure";
            ctx.fillStyle = "white";
            ctx.lineWidth = 2;
            ctx.fillText(`Mp: ${entity.stats.mp} / ${entity.stats.maxmp}`, 180, 260);
            ctx.fillStyle = "blue";
            ctx.fillRect(180, 275, (entity.stats.mp / entity.stats.maxmp) * 200, 8);
            ctx.strokeStyle = "white";
            ctx.strokeRect(180, 275, 200, 8);

            // say the description
            ctx.font = "15px Azure";
            ctx.fillStyle = "white";
            scope.divideText(ctx, entity.description, Width - 440, 100).forEach((line, id) => {
                ctx.fillText(line, 400, 190 + id * 20);
            });

            // show stats
            // def and magicdef
            ctx.fillText(`Def: ${entity.stats.def}`, 20, 270 + 40);
            ctx.fillText(`| Mdef: ${entity.stats.magicdef}`, 140, 270 + 40);
            // atk and magicatk
            ctx.fillText(`Atk: ${entity.stats.atk}`, 20, 270 + 55);
            ctx.fillText(`| Matk: ${entity.stats.magicatk}`, 140, 270 + 55);
            // agi and luck
            ctx.fillText(`Agi: ${entity.stats.agi}`, 20, 270 + 70);
            ctx.fillText(`| Luck: ${entity.stats.luck}`, 140, 270 + 70);

            // show equipment
            ctx.fillText(`| Head : ${entity.equipment.head}`, 260, 270 + 40);
            ctx.fillText(`| Torso: ${entity.equipment.torso}`, 260, 270 + 55);
            ctx.fillText(`| Foot : ${entity.equipment.foot}`, 260, 270 + 70);

            ctx.fillText(`| Jewel: ${entity.equipment.jewel1}`, 450, 270 + 40);
            ctx.fillText(`| Jewel: ${entity.equipment.jewel2}`, 450, 270 + 55);

            ctx.fillText(`| Weapon: ${entity.equipment.weapon1}`, 650, 270 + 40);
            ctx.fillText(`| Weapon: ${entity.equipment.weapon2}`, 650, 270 + 55);

            //TODO show effects
            return;
        }

        // equipment
        if (1 == this.partyMenu.chosenInEntity) {
            // TODO
            return;
        }

        // formation
        if (2 == this.partyMenu.chosenInEntity) {

            return;
        }

        // skills
        if (3 == this.partyMenu.chosenInEntity) {

            return;
        }
    }
}