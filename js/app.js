// Enemies our player must avoid
var Enemy = function() {

    // Starts off the enemy bug
    this.start();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed*dt;

    // If the enemy reaches the end of the screen, restart
    if (this.x > 402) {this.start();};
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Start the enemy out with a place and speed
Enemy.prototype.start = function() {
    this.col = -1;
    this.row = getRandomInt(1,4);
    this.x = this.col * 101;
    this.y = this.row * 83;
    this.speed = getRandomInt(40,100);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    //Variables applied to the player go here - only one player
    // Told the engine.js to load this image,
    // otherwise it forced the standard boy image.
    this.start();

    this.sprite = 'images/char-princess-girl.png';

};

// Update the player's position (copied from Enemy above)
Player.prototype.update = function(dt) {
    // Copied from Enemy above. Note:
    // Update any mvmt by dt param
    this.x = this.col * 101;
    this.y = this.row * 83;

    // If the player reaches the water, restart
    // todo: add points
    if (this.row === 0) {
        this.start();
    };

    if (checkCollisions()) {
        this.start();
    };

};

// Draw the player on the screen (copied from Enemy above)
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            this.col -= 1;
            break;
        case 'up':
            this.row -= 1;
            break;
        case 'right':
            this.col += 1;
            break;
        case 'down':
            this.row += 1;
            break;

    };
    if (this.row > 5) {this.row = 5;};
    if (this.col < 0) {this.col = 0;};
    if (this.row < 0) {this.row = 0;};
    if (this.col > 4) {this.col = 4;};
};

Player.prototype.start = function() {
    this.col = 2;
    this.row = 5;
    this.x = this.col * 101;
    this.y = this.row * 83;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

function checkCollisions() {
    var collided = false;
    allEnemies.forEach(function(enemy) {
        if (enemy.row == player.row) {
            if(enemy.x + 83 > player.y && enemy.x < player.x + 83){
                collided = true;
            };
        };
    });
    return collided;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// TODO: uncomment out the lines in engine.js with the array
// Place the player object in a variable called player

var allEnemies = [];

for (var i=0; i<4; i++) {
    var enemy = allEnemies.push(new Enemy());
};

var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
