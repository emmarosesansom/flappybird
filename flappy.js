// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(700, 400, Phaser.AUTO, 'game', stateActions);
var score;
var player;

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "assets/flappy_Batman.png");
    game.load.audio("score", "assets/point.ogg");
    game.load.image("pipe", "assets/pipe.png");


}

/*
 * Initialises the game. This function is only called once.
 */
function create() {

    //game.physics.startSystem(Phaser.Physics.ARCADE);
    //game.physics.arcade.enable(player);

    // set the background colour of the scene
    game.stage.setBackgroundColor("#00FFFF");
    game.add.text(100, 200, // coordinates
        "THE DARK KNIGHT RETURNS", //text
        { font: "35px Georgia", // font size and typeface
            fill: "#123456" } //text colour
    );

    game.input.onDown.add(clickHandler);
    game.add.audio("score");
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);

    var x = 100;
    var y = 30;

    player = game.add.sprite(x, y, "playerImg");


    player.x = 300;
    player.y = 300;

    //var right_key = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    //right_key.onDown.add(moveRight);

    //var left_key = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    //left_key.onDown.add(moveLeft);

    //var up_key = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    //up_key.onDown.add(moveUp);

    //var down_key = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    //down_key.onDown.add(moveDown);
    //game.add.sprite(20, 0, "pipe");

    //var hole = Math.floor(Math.random() * 5)+1;

    for (var j = 0; j < 5; i++) {

        var hole = Math.floor(Math.random() * 5)+1;

        for (var i = 0; i < hole; i++) {
            game.add.sprite(j * 200, i * 50, "pipe");
        }

        for (var i = hole + 2; i < 8; i++) {
            game.add.sprite(i * 200, i * 50, "pipe");

        }

    }
}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    
}

function clickHandler(mouse) {
    player.x = mouse.x;
    player.y = mouse.y;
    //game.add.sprite(event.x, event.y, "playerImg");
    //game.sound.play("score");
    //player.reset(mouse.x, mouse.y);

}

function spaceHandler() {

    game.sound.play("score");
    // Fill in the body - play sound
}

function moveLeft(){

    player.x -= 20;

}

function moveRight(){

    player.x +=20;

}

function moveUp(){

    player.y -= 20;

}

function moveDown(){

    player.y += 20;

}