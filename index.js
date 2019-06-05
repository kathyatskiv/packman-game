document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    init();
  });

const DATA = [
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

let gameMap; //Current array of numbers
let map; //List of the tiles-divs
let score = 0;
let gameOver = false;
let gameMode; //PVP or PVE

let start = document.getElementById("start");

let pacman = {
    x: 10,
    y: 19,
    direction: "right",
    mode: "normal",
    tile: PACMAN,
    under: EMPTYNESS
};

let blinky = {
    x: 10,
    y: 7,
    direction: "right",
    mode: "normal",
    tile: BLINKY,
    under: EMPTYNESS
}

//---------------------------------------
// Create elements functions
//---------------------------------------

function createTiles(data){
    tiles = [];

    for( row of data ){
        for ( column of row ){

            tile = document.createElement('div');
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
                tile.id = "ghost";
            }

            tiles.push(tile);
        }
    }

    return tiles;
}

function drawMap(){
    map = document.createElement('div');
    map.classList.add('container');

    let tiles = createTiles(gameMap);
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

function setUpMap(){
    gameMap = [
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
}

function setUpHeroes(){
    pacman = {
        x: 10,
        y: 19,
        direction: "right",
        mode: "normal",
        tile: PACMAN,
        under: EMPTYNESS
    };
    
    blinky = {
        x: 10,
        y: 7,
        direction: "right",
        mode: "normal",
        tile: BLINKY,
        under: EMPTYNESS
    }

}


//---------------------------------------
// Movement functions
//---------------------------------------

function startEnergizerEffect(){
    console.log("energizer was picked");
    pacman.mode = "energizer";
    blinky.mode = "energizer";

    let ghost = document.getElementById("ghost");
    console.log(ghost);
    ghost.classList.add("energizer");

    setTimeout(function() {
        pacman.mode = "normal";
        blinky.mode = "normal";
        ghost.classList.remove("energizer");
    },  4000);
}

function step(){
    heroMove(pacman);
    switch(gameMode){
        case "pve":
            blinkyMove();
            break;
        case "pvp":
            heroMove(blinky);
            break;
        }
            
    if(blinky.x == pacman.x && blinky.y == pacman.y) {
        gameOver = true;
        endGame(0);
        console.log("step");
    }

    if(!gameOver){
        eraseMap();
        drawMap();
    }

}

function heroMove(hero){
    switch(hero.direction){
        case 'right':
            if(hero.y === 9 && hero.x === 20) {
                gameMap[hero.y][hero.x] = EMPTYNESS;
                hero.x = 0;
                gameMap[hero.y][hero.x] = hero.tile;
            } else if(gameMap[hero.y][hero.x + 1] !== WALL) {
                gameMap[hero.y][hero.x] = hero.under;
                hero.x ++;
                if(hero == pacman) pickCoin();
                else hero.under = gameMap[hero.y][hero.x];
                gameMap[hero.y][hero.x] = hero.tile;
            }
            break;
        case 'left':
            if(hero.y === 9 && hero.x === 0){
                gameMap[hero.y][hero.x] = EMPTYNESS;
                hero.x = 20;
                gameMap[hero.y][hero.x] = hero.tile;
            } else if(gameMap[hero.y][hero.x - 1] !== WALL) {
                gameMap[hero.y][hero.x] = hero.under;
                hero.x --;
                if(hero == pacman) pickCoin();
                else hero.under = gameMap[hero.y][hero.x];
                gameMap[hero.y][hero.x] = hero.tile;
            }
            break;
        case 'up':
            if(gameMap[hero.y - 1][hero.x] !== WALL) {
                gameMap[hero.y][hero.x] = hero.under;
                hero.y --;
                if(hero == pacman) pickCoin();
                else hero.under = gameMap[hero.y][hero.x];
                gameMap[hero.y][hero.x] = hero.tile;
            }
            break;
        case 'down':
            if(gameMap[hero.y + 1][hero.x] !== WALL) {
                gameMap[hero.y][hero.x] = hero.under;
                hero.y ++;
                if(hero == pacman) pickCoin();
                else hero.under = gameMap[hero.y][hero.x];
                gameMap[hero.y][hero.x] = hero.tile;
            }
            break;
    }
}

function blinkyMove(){
    gameMap[blinky.y][blinky.x] = blinky.under;

    if(blinky.mode == "normal"){

        dx = blinky.x - pacman.x;
        dy = blinky.y - pacman.y;
    
        if(Math.abs(dx) >= Math.abs(dy)){
           if(blinky.x > pacman.x && gameMap[blinky.y][blinky.x - 1] != WALL && blinky.x > 0) {
               blinky.x --;
            } 
           else if(gameMap[blinky.y][blinky.x + 1] != WALL && blinky.x < 20) {
                blinky.x ++;
            }
           else goWhereFree(blinky);
        } else{
            if(blinky.y > pacman.y && gameMap[blinky.y - 1][blinky.x] != WALL && blinky.y > 0) blinky.y --;
           else if(gameMap[blinky.y + 1][blinky.x] != WALL && blinky.y != 9 && blinky.x != 10 && blinky.y < 20) blinky.y ++;
           else goWhereFree(blinky);
        }
    } else goWhereFree(blinky);

    blinky.under = gameMap[blinky.y][blinky.x];
    gameMap[blinky.y][blinky.x] = BLINKY;
}

function goWhereFree(hero){
    direction = {};
    if(gameMap[hero.y][hero.x + 1] != WALL && blinky.x < 20) direction['right'] = true;
    if(gameMap[hero.y][hero.x - 1] != WALL && blinky.x > 0) direction['left'] = true;
    if(gameMap[hero.y - 1][hero.x] != WALL && blinky.y > 0) direction['up'] = true;
    if(gameMap[hero.y + 1][hero.x] != WALL && blinky.y < 20) direction['down'] = true;

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

    if(score == 185) {
        gameOver = true;
        endGame(1);    
    }
}

//---------------------------------------
// Controls functions
//---------------------------------------

function setupKeyboardControls() {
    document.addEventListener('keydown',  (e) => {
        switch (e.keyCode) {
            case KEY_LEFT:
                moveLeft(pacman);
                break;
            case KEY_A:
                if(gameMode = "pvp") moveLeft(blinky);
                else moveLeft(pacman);
                break;
            case KEY_UP:
                moveUp(pacman);
                break;
            case KEY_W:
                if(gameMode = "pvp") moveUp(blinky);
                else moveUp(pacman);
                break;
            case KEY_RIGHT:
                moveRight(pacman);
                break;
            case KEY_D:
                if(gameMode = "pvp" ) moveRight(blinky);
                else moveRight(pacman);
                break;
            case KEY_DOWN:
                moveDown(pacman)
                break;
            case KEY_S:
                if(gameMode = "pvp" ) moveDown(blinky);
                else moveDown(pacman)
                break;
            case KEY_ENTER:
                console.log(gameMap);
                break;
        }

    });
}

function moveUp(hero){
    if(gameMap[hero.y - 1][hero.x] !== WALL) 
        hero.direction = 'up';
}

function moveDown(hero){
    if(gameMap[hero.y+1][hero.x] !== WALL)
        hero.direction = 'down';
}

function moveLeft(hero){
    if(gameMap[hero.y][hero.x-1] !== WALL)
        hero.direction = 'left';
}

function moveRight(hero){
    if(gameMap[hero.y][hero.x + 1] !== WALL)
        hero.direction = 'right';
}



//---------------------------------------
// Setup functions
//---------------------------------------

let game;

function init(){
    setUpMap();
    pvp = document.getElementById("pvp");
    pve = document.getElementById("pve");
    pvp.addEventListener("click", () => {
        div = document.getElementById("start");
        document.body.removeChild(div);
        setUpGame("pvp");
    });
    pve.addEventListener("click", () => {
        div = document.getElementById("start");
        document.body.removeChild(div);
        setUpGame("pve");
    });
}

function setUpGame(mode){
    gameMode = mode;
    addScore();
    drawMap();
    setupKeyboardControls();
    game = setInterval(step, 250);
}

function endGame(res){
    eraseMap();
    scoreTitle = document.getElementById("score");
    document.body.removeChild(scoreTitle);

    message = document.createElement("h1");
    message.classList.add("title");

    btnRetry = document.createElement("button");
    btnRetry.classList.add("btn");
    btnRetry.innerHTML = "Retry";

    btnBackToMenu = document.createElement("button");
    btnBackToMenu.classList.add("btn");
    btnBackToMenu.innerHTML = "Menu";

    if(gameMode == "pve"){
        switch(res){
            case 0:
                message.innerHTML = "You lose! <br> Your score: " + score;
                break;
            case 1:
                message.innerHTML = "You won! <br> Your score: " + score;
                break;
        }
    } else{
        switch(res){
            case 0:
                message.innerHTML = "Ghost won! <br> Pacman score: " + score;
                break;
            case 1:
                message.innerHTML = "Pacman won!";
                break;
        }
    }

    document.body.appendChild(message);
    document.body.appendChild(btnRetry);
    document.body.appendChild(btnBackToMenu);

    clearInterval(game);

    score = 0;
    setUpMap();
    setUpHeroes();
    gameOver = false;

    btnBackToMenu.addEventListener("click", () => {
        document.body.removeChild(message);
        document.body.removeChild(btnRetry);
        document.body.removeChild(btnBackToMenu);
        document.body.appendChild(start);
        init();
    });

    btnRetry.addEventListener("click", () => {
        document.body.removeChild(message);
        document.body.removeChild(btnRetry);
        document.body.removeChild(btnBackToMenu);
        setUpGame(gameMode)
    });
}


