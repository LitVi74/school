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
        this.battle.hideStartAnimation = this.hideStartBattleBanner.bind(this);

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
        this.startBattle = new cc.Node();
        this.startBattle.setNormalizedPosition(0.5, 0.5);

        var VS_V = new cc.Sprite("#vs_v.png");
        VS_V.setAnchorPoint(0.9, 0.5);

        var VS_S = new cc.Sprite("#vs_s.png");
        VS_S.setAnchorPoint(0.1, 0.5);

        this.startBattle.addChild(VS_V);
        this.startBattle.addChild(VS_S);
        this.addChild(this.startBattle);
    },

    hideStartBattleBanner: function () {
      this.startBattle.runAction(new cc.Sequence(
        new cc.FadeOut(0.3),
        new cc.ToggleVisibility()
      ));
    },

    showVictoryBanner: function () {
        var victorySize = cc.spriteFrameCache.getSpriteFrame('victory_banner.png').getOriginalSize();

        this.victory = new cc.Node();
        this.victory.setNormalizedPosition(0.5, 0.5);
        this.victory.setContentSize(victorySize.width * 2, victorySize.height);

        var victoryBannerLeft = new cc.Sprite("#victory_banner.png");
        victoryBannerLeft.setAnchorPoint(1, 0.5);
        victoryBannerLeft.setLocalZOrder(10);

        var victoryBannerRight = new cc.Sprite("#victory_banner.png");
        victoryBannerRight.setScaleX(-1);
        victoryBannerRight.setAnchorPoint(1, 0.5);
        victoryBannerRight.setLocalZOrder(10);

        var victoryGreenLeft = new cc.Sprite("#victory_green1.png");
        victoryGreenLeft.setScaleX(-1);
        victoryGreenLeft.setNormalizedPosition(-0.2, 0.2);
        victoryGreenLeft.setAnchorPoint(0, 0);

        var victoryGreenRight = new cc.Sprite("#victory_green1.png");
        victoryGreenRight.setNormalizedPosition(0.2, 0.2);
        victoryGreenRight.setAnchorPoint(0, 0);

        var victoryGreenBottom = new cc.Sprite("#victory_green2.png")
        victoryGreenBottom.setAnchorPoint(0.5, 0);
        victoryGreenBottom.setNormalizedPosition(0, -0.7);

        var victorySword = new cc.Sprite("#victory_sword.png");
        victorySword.setNormalizedPosition(0, 0.3);
        victorySword.setLocalZOrder(5);

        var victoryText = new cc.TextFieldTTF("VICTORY", resources.marvin_round.name, 78);
        victoryText.setAnchorPoint(0.5, 0.2);
        victoryText.setColor(cc.color(255,211,32));
        victoryText.setLocalZOrder(15);

        this.victory.addChild(victoryBannerLeft);
        this.victory.addChild(victoryBannerRight);
        this.victory.addChild(victoryGreenLeft);
        this.victory.addChild(victoryGreenRight);
        this.victory.addChild(victoryGreenBottom);
        this.victory.addChild(victorySword);
        this.victory.addChild(victoryText);
        this.addChild(this.victory);
    }
});