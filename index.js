document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    init();
  });

let gameMap = [
    [3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3],
    [3,1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1,3],
    [3,1,4,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,4,1,3],
    [3,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,3],
    [3,1,2,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,2,1,3],
    [3,1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1,3],
    [3,1,1,1,1,2,1,1,1,3,1,3,1,1,1,2,1,1,1,1,3],
    [3,3,3,3,1,2,1,3,3,3,6,3,3,3,1,2,1,3,3,3,3],
    [1,1,1,1,1,2,1,3,1,1,3,1,1,3,1,2,1,1,1,1,1],
    [3,3,3,3,3,2,3,3,1,8,7,9,1,3,3,2,3,3,3,3,3],
    [1,1,1,1,1,2,1,3,1,1,1,1,1,3,1,2,1,1,1,1,1],
    [3,3,3,3,1,2,1,3,3,3,3,3,3,3,1,2,1,3,3,3,3],
    [3,1,1,1,1,2,1,3,1,1,1,1,1,3,1,2,1,1,1,1,3],
    [3,1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1,3],
    [3,1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1,3],
    [3,1,4,2,1,2,2,2,2,2,1,2,2,2,2,2,1,2,4,1,3],
    [3,1,1,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,1,1,3],
    [3,1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1,3],
    [3,1,2,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,2,1,3],
    [3,1,2,2,2,2,2,2,2,2,5,2,2,2,2,2,2,2,2,1,3],
    [3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3]
];

const WALL = 1;
const COIN = 2;
const EMPTYNESS = 3;
const ENERGIZER = 4;
const PACMAN = 5;
const BLINKY = 6;
const PINKY = 7;
const INKY = 8;
const CLYDE = 9;
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const KEY_A = 65;
const KEY_W = 87;
const KEY_D = 68;
const KEY_S = 83;
const KEY_ENTER = 13;

let map;
let score = 0;

let pacman = {
    x: 10,
    y: 19,
    direction: "none",
    mode: "normal"
};

let blinky = {
    x: 10,
    y: 7,
    mode: "normal",
    tile: EMPTYNESS,
    herocode: BLINKY 
}

//---------------------------------------
// Create elements functions
//---------------------------------------

function createTiles(data){
    let tiles = [];

    for( let row of data ){
        for ( let column of row ){

            let tile = document.createElement('div');
            tile.classList.add('tile');

            if ( column == WALL ){
                tile.classList.add('wall');
            } else if( column == COIN ) {
                tile.classList.add('coin');
            } else if( column == ENERGIZER ){
                tile.classList.add('energizer');
            } else if( column == EMPTYNESS ){
                tile.classList.add('emptyness')
            } else if( column == PACMAN ){
                tile.classList.add('pacman');
                tile.classList.add(pacman.direction);
            } else if( column == BLINKY){
                tile.classList.add('blinky')
            }

            tiles.push(tile);
        }

    }

    return tiles;
}

function drawMap(){
    map = document.createElement('div');
    map.classList.add('container');

    let tiles = createTiles (gameMap);
    for(let tile of tiles) {
        map.appendChild(tile);
    }

    document.body.appendChild(map);
    refreshScore();

}

function addScore(){
    scoreTitle = document.createElement("h3");
    scoreTitle.id = "score"; 
    scoreTitle.innerHTML = "Score " + score;
    document.body.appendChild(scoreTitle);
}

function refreshScore(){
    scoreTitle = document.getElementById("score");
    scoreTitle.innerHTML = "Score " + score;
}

function eraseMap(){
    document.body.removeChild(map);
}


//---------------------------------------
// Movement functions
//---------------------------------------

function startEnergizerEffect(){

}

function step(){
    if(score == 185) endGame();

    pacmanMove();
    blinkyMove();

    eraseMap();
    drawMap();
}

function pacmanMove(){
    switch(pacman.direction){
        case 'right':
            if(pacman.y === 9 && pacman.x === 20) {
                gameMap[pacman.y][pacman.x] = EMPTYNESS;
                pacman.x = 0;
                gameMap[pacman.y][pacman.x] = PACMAN;
            } else if(gameMap[pacman.y][pacman.x + 1] !== WALL) {
                gameMap[pacman.y][pacman.x] = EMPTYNESS;
                pacman.x ++;
                pickCoin();
                gameMap[pacman.y][pacman.x] = PACMAN;
            }
            break;
        case 'left':
            if(pacman.y === 9 && pacman.x === 0){
                gameMap[pacman.y][pacman]
                gameMap[pacman.y][pacman.x] = EMPTYNESS;
                pacman.x = 20;
                gameMap[pacman.y][pacman.x] = PACMAN;
            } else if(gameMap[pacman.y][pacman.x - 1] !== WALL) {
                gameMap[pacman.y][pacman.x] = EMPTYNESS;
                pacman.x --;
                pickCoin();
                gameMap[pacman.y][pacman.x] = PACMAN;
            }
            break;
        case 'up':
            if(gameMap[pacman.y - 1][pacman.x] !== WALL) {
                gameMap[pacman.y][pacman.x] = EMPTYNESS;
                pacman.y --;
                pickCoin();
                gameMap[pacman.y][pacman.x] = PACMAN;
            }
            break;
        case 'down':
            if(gameMap[pacman.y + 1][pacman.x] !== WALL) {
                gameMap[pacman.y][pacman.x] = EMPTYNESS;
                pacman.y ++;
                pickCoin();
                gameMap[pacman.y][pacman.x] = PACMAN;
            }
            break;
    }
}

function blinkyMove(){
    if(blinky.x == pacman.x && blinky.y == pacman.y) endGame();
    dx = blinky.x - pacman.x;
    dy = blinky.y - pacman.y;
    gameMap[blinky.y][blinky.x] = blinky.tile;

    if(Math.abs(dx) >= Math.abs(dy)){
       if(blinky.x > pacman.x && gameMap[blinky.y][blinky.x - 1] != WALL) {
           blinky.x --;
        } 
       else if(gameMap[blinky.y][blinky.x + 1] != WALL) {
            blinky.x ++;
        }
       else goWhereFree(blinky);
    } else{
        if(blinky.y > pacman.y && gameMap[blinky.y - 1][blinky.x] != WALL) { blinky.y --;}
       else if(gameMap[blinky.y + 1][blinky.x] != WALL && blinky.y != 9 && blinky.x != 10) { blinky.y ++;}
       else goWhereFree(blinky);
    }
    blinky.tile = gameMap[blinky.y][blinky.x];
    gameMap[blinky.y][blinky.x] = BLINKY;
}

function goWhereFree(hero){
    direction = {};
    if(gameMap[hero.y][hero.x + 1] != WALL) direction['right'] = true;
    if(gameMap[hero.y][hero.x - 1] != WALL) direction['left'] = true;
    if(gameMap[hero.y - 1][hero.x] != WALL) direction['up'] = true;
    if(gameMap[hero.y + 1][hero.x] != WALL) direction['down'] = true;

    random = Math.floor(Math.random() * Object.keys(direction).length); 
    counter = 0;
    for(el in direction){
        if(counter == random){
            switch(el){
                case 'right':
                    hero.x ++;
                    break;
                case 'left':
                    hero.x --;
                    break;
                case 'up':
                    hero.y --;
                    break;
                case 'down':
                    hero.y ++;
                    break;
            }
            break;
        }
        counter ++;
    }
    
    
 
}

function pickCoin(){
    if(gameMap[pacman.y][pacman.x] == COIN) score++;
    else if(gameMap[pacman.y][pacman.x] == ENERGIZER) {
        score += 10;
        startEnergizerEffect();
    }
}

//---------------------------------------
// Controls functions
//---------------------------------------

function setupKeyboardControls() {
    document.addEventListener('keydown',  (e) => {
        switch (e.keyCode) {
            case KEY_LEFT:
            case KEY_A:
                moveLeft();
                break;
            case KEY_UP:
            case KEY_W:
                moveUp();
                break;
            case KEY_RIGHT:
            case KEY_D:
                moveRight();
                break;
            case KEY_DOWN:
            case KEY_S:
                moveDown();
                break;
        }

    });
}

function moveUp(){
    if(gameMap[pacman.y - 1][pacman.x] !== WALL) 
        pacman.direction = 'up';
}

function moveDown(){
    if(gameMap[pacman.y+1][pacman.x] !== WALL)
        pacman.direction = 'down';
}

function moveLeft(){
    if(gameMap[pacman.y][pacman.x-1] !== WALL)
        pacman.direction = 'left';
}

function moveRight(){
    if(gameMap[pacman.y][pacman.x + 1] !== WALL)
        pacman.direction = 'right';
}



//---------------------------------------
// Setup functions
//---------------------------------------

function init(){
    addScore();
    drawMap();
    setupKeyboardControls();
    setInterval(step, 250);
}

function endGame(){
    eraseMap();
}


