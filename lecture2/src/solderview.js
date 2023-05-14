/**
 * Created by andrey on 08.05.2022.
 */

var SolderView = cc.Node.extend({
    ctor: function (solder) {
        this._super();

        this.solder = solder;

        this.animation = sp.SkeletonAnimation.create(resources[solder.type + solder.code + '_json'], resources.battle_atlas);
        this.animation.setAnimation(0, "idle", true);
        this.addChild(this.animation);

        if (solder.type === 'solder') {
            this.animation.setScaleX(-1);
        }

        this.addProgressBar();

        solder.onTakeDamageAnimation = this.onTakeDamage.bind(this);
        solder.onAttackAnimation = this.onAttack.bind(this);
        solder.onDieAnimation = this.onDie.bind(this);
    },

    addProgressBar: function () {
        var progressBarBG = new ccui.Scale9Sprite("progress_background.png");
        var progressBarBGSize = progressBarBG.getContentSize();
        progressBarBG.setCapInsets(
          cc.rect(
            progressBarBGSize.width / 2 - 1,
            progressBarBGSize.height / 2 - 1,
            2,
            2
          )
        );

        this.HPprogress = new ccui.Scale9Sprite("progressbar.png");
        this.HPprogress.setCapInsets(
          cc.rect(
            progressBarBGSize.width / 2 - 1,
            progressBarBGSize.height / 2 - 1,
            2,
            2
          )
        );

        progressBarBG.setContentSize(progressBarBGSize.width * 5, progressBarBGSize.height);
        progressBarBG.setScale(0.2);
        progressBarBG.setPosition(0, -progressBarBGSize.height);
        progressBarBG.setLocalZOrder(0);

        this.HPprogress.setAnchorPoint(0, 0);
        this.HPprogress.setLocalZOrder(1);

        progressBarBG.addChild(this.HPprogress);
        this.animation.addChild(progressBarBG);

        this.setHPProgressByPercent(1);
    },

    setHPProgressByPercent: function (percent) {
        var maxSize = this.HPprogress.getParent().getContentSize();
        this.HPprogress.setContentSize(percent * maxSize.width, maxSize.height)
    },

    onDie: function() {
        this.animation.runAction(new cc.Sequence(
            new cc.FadeOut(0.3),
            new cc.ToggleVisibility()
        ));
    },

    onAttack: function() {
        this.animation.setAnimation(0, "attack", false);
        this.animation.setCompleteListener(function() {
            this.animation.setAnimation(0, "idle", true);
        }.bind(this));

        cc.audioEngine.playEffect(resources['battle_' + this.solder.type + '_effect'], false);
    },

    onTakeDamage: function (damage) {
        this.animation.runAction(new cc.Sequence(
            new cc.FadeTo(0.3, 140),
            new cc.FadeTo(0.3, 255)
        ));

        var damageAnimation = sp.SkeletonAnimation.create(resources.damage_json, resources.battle_atlas);
        damageAnimation.setAnimation(0, "animation", false);
        damageAnimation.setCompleteListener(function() {
            damageAnimation.removeFromParent();
        })
        this.addChild(damageAnimation);

        this.addDamageDelta(damage)

        this.setHPProgressByPercent(this.solder.hp / this.solder.maxHP);
    },

    addDamageDelta: function (damage) {
        var text = new cc.TextFieldTTF(-damage.toString(), resources.marvin_round.name, 32);
        text.setColor(cc.color(255, 0, 0));

        if (this.solder.type === 'solder') {
            text.setScaleX(-1);
        }

        this.animation.addChild(text)

        text.runAction(new cc.Sequence(
            new cc.MoveBy(0.7, cc.p(0, 100)),
            new cc.ToggleVisibility()
        ));
    }
});