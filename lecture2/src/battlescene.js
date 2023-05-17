/**
 * Created by andrey on 06.05.2022.
 */

var BattleScene = cc.Scene.extend({
    ctor: function () {
        this._super();

        this.battle = new Battle();

        this.addBackground();

        this.solderView = new SolderView(this.battle.solder);
        this.solderView.setPosition(this.width / 2 - this.width / 6, this.height / 2);
        this.addChild(this.solderView);

        this.enemyView = new SolderView(this.battle.enemy);
        this.enemyView.setPosition(this.width / 2 + this.width / 6, this.height / 2);
        this.addChild(this.enemyView);

        this.addAttackButton();

        cc.audioEngine.playMusic(resources.battle_music, true);
        cc.audioEngine.setMusicVolume(0.5);

        this.battle.showVictoryAnimation = this.showVictoryBanner.bind(this);

        this.showStartBattleBanner();
    },

    addBackground: function () {
        var background = new cc.Sprite(resources.background);
        background.setScale(Math.max(this.width / background.width, this.height / background.height));
        background.setPosition(this.width / 2, this.height / 2);
        background.setLocalZOrder(-1);
        this.addChild(background);
    },

    addAttackButton: function () {
        var buttonSize = cc.spriteFrameCache.getSpriteFrame('button.png').getOriginalSize();
        this.attackButton = new ccui.Button('#button.png', '#button_on.png', '#button_off.png', ccui.Widget.PLIST_TEXTURE);
        this.attackButton.setScale9Enabled(true);
        this.attackButton.setContentSize(180, 70);
        this.attackButton.setCapInsets(cc.rect(buttonSize.width / 2 - 1, buttonSize.height / 2 - 1, 2, 2));
        this.attackButton.setPosition(this.width / 2, this.height / 2 - this.height / 3);
        this.addChild(this.attackButton);

        this.attackButton.setTitleText("ATTACK");
        this.attackButton.setTitleFontSize(35);
        this.attackButton.setTitleFontName(resources.marvin_round.name);

        this.attackButton.addClickEventListener(function () {
            if (!this.battle.running) {
                console.log("wait start");
                return;
            }

            this.battle.solder.attack(this.battle.enemy);
            this.attackButton.enabled = false;
            this.attackButton.disabled = true
            setTimeout(function () {
                this.attackButton.enabled = true;
                this.attackButton.disabled = false;
            }.bind(this), 1000)
        }.bind(this));
    },

    showStartBattleBanner: function () {
        var versus = sp.SkeletonAnimation.create(resources.battle_versus_json, resources.battle_atlas);
        versus.setNormalizedPosition(0.5, 0.5);
        versus.setAnimation(0, "animation", false);
        versus.setCompleteListener(function () {
            this.removeChild(versus)
        }.bind(this))

        this.addChild(versus);
    },

    showVictoryBanner: function () {
        var victory = sp.SkeletonAnimation.create(resources.battle_victory_json, resources.battle_atlas);
        victory.setNormalizedPosition(0.5, 0.5);
        victory.setAnimation(0, "animation", false);
        victory.setCompleteListener(function () {
            this.removeChild(victory)
        }.bind(this))

        var victoryText = new cc.TextFieldTTF("VICTORY", resources.marvin_round.name, 82);
        victoryText.setAnchorPoint(0.5, 0.6);
        victoryText.setColor(cc.color(255,211,32));
        victoryText.setLocalZOrder(15);

        victory.addChild(victoryText);
        this.addChild(victory);
    }
});