// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(700, 400, Phaser.AUTO, 'game', stateActions);
var score = 0;
var player;
var pipes;
var label_score;

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


    game.physics.startSystem(Phaser.Physics.ARCADE);


    // set the background colour of the scene
    game.stage.setBackgroundColor("#00FFFF");
    game.add.text(100, 200, // coordinates
        "THE DARK KNIGHT RETURNS", //text
        { font: "35px Georgia", // font size and typeface
            fill: "#123456" } //text colour
    );

    game.input.onDown.add(clickHandler);
    game.add.audio("score");
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(flap);




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



    pipes = game.add.group();






    player = game.add.sprite(60, 200, "playerImg");
    player.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(player);
    player.checkWorldBounds = true;
    player.body.gravity.y = 300;

    label_score = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff"})
    //generate_pipe();
    game.time.events.loop(1.75 * Phaser.Timer.SECOND, generate_pipe);



}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {



    game.physics.arcade.overlap(player, pipes, game_over);
}


function game_over(){
    
    location.reload();

}






function add_pipe_part(x, y, pipe_part){
    var pipe = pipes.create(x, y, pipe_part);
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -200;

}





function clickHandler(mouse) {
    player.x = mouse.x;
    player.y = mouse.y;
    //game.add.sprite(event.x, event.y, "playerImg");
    //game.sound.play("score");
    //player.reset(mouse.x, mouse.y);

}



function flap()
{
    player.body.velocity.y = - 150;


}

function generate_pipe() {

    var hole = Math.floor(Math.random() * 5) + 1;

    for (var i = 0; i < hole; i++) {
        add_pipe_part(900, i * 50, "pipe");
    }

    for (var i = hole + 2; i < 8; i++) {
        add_pipe_part(900, i * 50, "pipe");

    }

    score++;
    label_score.setText(score);

}

