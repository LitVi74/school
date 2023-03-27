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

        solder.onTakeDamageAnimation = this.onTakeDamage.bind(this);
        solder.onAttackAnimation = this.onAttack.bind(this);
        solder.onDieAnimation = this.onDie.bind(this);
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

    onTakeDamage: function () {
        this.animation.runAction(new cc.Sequence(
            new cc.FadeTo(0.3, 140),
            new cc.FadeTo(0.3, 255)
        ));

        var damage = sp.SkeletonAnimation.create(resources.damage_json, resources.battle_atlas);
        damage.setAnimation(0, "animation", false);
        damage.setCompleteListener(function() {
            damage.removeFromParent();
        })
        this.addChild(damage);
    }
});