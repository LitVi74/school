/**
 * Created by andrey on 08.05.2022.
 */

var Solder = function (type) {
    this.type = type;
    this.code = Math.floor(Math.random() * Solder.GetSoldersAmount(type)) + 1;

    this.maxHP = Solder.HP
    this.hp = Solder.HP;
    this.damage = Math.ceil(Math.random() * (Solder.DAMAGE[1] - Solder.DAMAGE[0])) + Solder.DAMAGE[0];

    this.onDieAnimation = function () {
    };
    this.onAttackAnimation = function () {
    };
    this.onTakeDamageAnimation = function () {
    };

    this.attackTime = 0;
};

Solder.prototype.takeDamage = function (damage) {
    this.hp -= damage;
    if (this.hp < 0) {
        this.hp = 0;
    }

    console.log(this.type + ' takeDamage, hp - ' + this.hp);

    if (this.isAlive()) {
        this.onTakeDamageAnimation(damage);
    } else {
        this.onDieAnimation();
    }
};

Solder.prototype.attack = function (enemy) {
    var waitTime = this.attackTime + Solder.ATTACK_INTERVAL - Date.now();
    if (waitTime > 0) {
        console.log("attack wait " + waitTime + "ms");
        return;
    }

    this.attackTime = Date.now();

    this.onAttackAnimation();

    setTimeout(function() {
        if (this.isAlive()) {
            enemy.takeDamage(this.damage);
        }
    }.bind(this), Solder.ATTACK_DURATION);
};

Solder.prototype.isAlive = function () {
    return this.hp > 0;
};

Solder.GetSoldersAmount = function (type) {
    var amount = 1;
    while (resources[type + (amount + 1) + '_json']) {
        amount++;
    }
    return amount;
};

Solder.HP = 100;
Solder.DAMAGE = [10, 20];
Solder.ATTACK_INTERVAL = 1000;

Solder.ATTACK_DURATION = 300;