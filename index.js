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
]

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
let scoreCounter;

let pacman = {
    x: 10,
    y: 19,
    direction: "right"
};

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
            }

            tiles.push(tile);
        }

        // let brTile = document.createElement('br');
        // tiles.push(brTile);
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

}

function eraseMap(){
    document.body.removeChild(map);
}


//---------------------------------------
// Pacman movement functions
//---------------------------------------

function moveUp(){
    pacman.direction = 'up';
    if(gameMap[pacman.y - 1][pacman.x] !== WALL) {
        gameMap[pacman.y][pacman.x] = EMPTYNESS;
        pacman.y --;
        gameMap[pacman.y][pacman.x] = PACMAN;
    }
}

function moveDown(){
    pacman.direction = 'down';
    if(gameMap[pacman.y + 1][pacman.x] !== WALL) {
        gameMap[pacman.y][pacman.x] = EMPTYNESS;
        pacman.y ++;
        gameMap[pacman.y][pacman.x] = PACMAN;
    }
}

function moveLeft(){
    pacman.direction = 'left';
        if(pacman.y === 9 && pacman.x === 0){
            gameMap[pacman.y][pacman]
            gameMap[pacman.y][pacman.x] = EMPTYNESS;
            pacman.x = 20;
            gameMap[pacman.y][pacman.x] = PACMAN;
        } else if(gameMap[pacman.y][pacman.x - 1] !== WALL) {
            gameMap[pacman.y][pacman.x] = EMPTYNESS;
            pacman.x --;
            gameMap[pacman.y][pacman.x] = PACMAN;
    }
}

function moveRight(){
    pacman.direction = 'right';
        if(pacman.y === 9 && pacman.x === 20) {
            gameMap[pacman.y][pacman.x] = EMPTYNESS;
            pacman.x = 0;
            gameMap[pacman.y][pacman.x] = PACMAN;
        } else if(gameMap[pacman.y][pacman.x + 1] !== WALL) {
            gameMap[pacman.y][pacman.x] = EMPTYNESS;
            pacman.x ++;
            gameMap[pacman.y][pacman.x] = PACMAN;
        }
}

function setupKeyboardControls() {
    document.addEventListener('keydown',  (e) => {
        switch (e.keyCode) {
            case 13:
                console.log(pacman.x);
                console.log(pacman.y);
                break;
            case KEY_LEFT:
            case 65:
                moveLeft();
                break;
            case KEY_UP:
            case 87:
                moveUp();
                break;
            case KEY_RIGHT:
            case 68:
                moveRight();
                break;
            case KEY_DOWN:
            case 83:
                moveDown();
                break;
        }

        eraseMap();
        drawMap();
    });
}


//---------------------------------------
// Setup functions
//---------------------------------------

function init(){
    drawMap();
    setupKeyboardControls();
    scoreCounter = 0;
    addScore();
}


