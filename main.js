enchant();
// ====================
//      CONSTANTS
// ====================
var GRAVITY = 1;
var FPS = 60;

// ====================
//        GAME
// ====================
var game = null;
window.onload = function() {
    game = new Game(640, 640);
    game.fps = FPS;
    game.preload('chara.png');

    game.onload = function() {
        var dog = new Dog();
        var land = new Land(0, 500, 600, 100);
        //スマホ対応
        game.rootScene.addEventListener('touchstart', function(e) {
        });
        game.rootScene.addEventListener('touchend', function(e) {
        });
    };
    game.start();
};


// ====================
//         DOG
// ====================
var DOG_HEIGHT = 48;
var DOG_WIDTH  = 32;
var Dog = enchant.Class.create(enchant.Sprite, {
    initialize: function(){
        enchant.Sprite.call(this, DOG_WIDTH, DOG_HEIGHT);
        this.backgroundColor = 'red';
        this.x = 0;
        this.y = 0;
        this.vy = 0;
        this.vx = 0;
        this.onLand = false;
        game.rootScene.addChild(this);
        this.addEventListener('enterframe', this.update);
    },
    update: function(){
        if(!this.onLand) {
            this.vy += GRAVITY;
        }
        this.x += this.vx;
        this.y += this.vy;
        // 地面との衝突判定
        for (var i = 0, l = lands.length; i < l; i++) {
            if (this.intersect(lands[i])) {
                this.onLand = true;
                this.vy = 0;
                this.y = lands[i].y - this.height;
            }
        }
    },
});

// ====================
//        LAND
// ====================
var lands = [];
var Land = enchant.Class.create(enchant.Sprite, {
    initialize: function(x, y, w, h){
        enchant.Sprite.call(this, w, h);
        this.x = x;
        this.y = y;
        this.backgroundColor = 'green';
        game.rootScene.addChild(this);
        this.addEventListener('enterframe', this.update);
        lands.push(this);
    },
    update: function(){
    },
    remove: function(){
        for (var i = 0, l = lands.length; i < l; i++) {
            if (lands[i] == this) {
                lands.splice(i, 1);
                break;
            }
        }
        this.removeEventListener("enterframe", this.update);
    }
});

var Bar = enchant.Class.create(enchant.Sprite, {
    initialize: function(){},
});

