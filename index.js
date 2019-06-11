document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    init();
  });

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
const stopTiles = [WALL, BLINKY, INKY, PINKY, CLYDE];

let gameMap; //Current array of numbers
let map; //List of the tiles-divs
let score = 0;
let gameOver = false;
let gameMode; //PVP or PVE
let gameLvl;
let winScore;
let currentGhostList = [];

let start = document.getElementById("start");

let pacman = {
    x: 10,
    y: 19,
    direction: "right",
    mode: "normal",
    mouth: "open",
    tile: PACMAN,
    under: EMPTYNESS,
    id: "pacman"
};

let blinky = {
    x: 10,
    y: 7,
    direction: "right",
    mode: "normal",
    tile: BLINKY,
    under: EMPTYNESS,
    id: "blinky"
}

let pinky = {
    x: 9,
    y: 9,
    direction: "right",
    mode: "normal",
    tile: PINKY,
    under: EMPTYNESS,
    id: "pinky"
}

let clyde = {
    x: 11,
    y: 9,
    direction: "right",
    mode: "normal",
    tile: CLYDE,
    under: EMPTYNESS,
    id: "clyde"
}

let inky = {
    x: 10,
    y: 9,
    direction: "right",
    mode: "normal",
    tile: INKY,
    under: EMPTYNESS,
    id: "inky"
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

            switch(column){
                case WALL:
                    tile.classList.add('wall');
                    break;
                case COIN:
                    tile.classList.add('coin');
                    break;
                case ENERGIZER:
                    tile.classList.add('energizer');
                    break;
                case EMPTYNESS:
                    tile.classList.add('emptyness');
                    break;
                case PACMAN:
                    tile.classList.add('pacman');
                    tile.id = "pacman"
                    tile.classList.add(pacman.direction);
                    tile.classList.add(pacman.mouth);
                    break;
                case BLINKY:
                    tile.classList.add('blinky');
                    tile.id = "blinky";
                    tile.classList.add(blinky.direction);
                    break;
                case PINKY:
                    tile.classList.add('pinky');
                    tile.id = "pinky";
                    tile.classList.add(pinky.direction);
                    break;
                case CLYDE:
                    tile.classList.add('clyde');
                    tile.id = "clyde";
                    tile.classList.add(clyde.direction);
                    break;
                case INKY:
                     tile.classList.add('inky');
                    tile.id = "inky";
                    tile.classList.add(inky.direction);
                    break;
                
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

//---------------------------------------
// SetUp functions
//---------------------------------------

function setUpMap(){
    currentGhostList = [];
    currentGhostList.push(blinky);
    switch(gameLvl){
        case 3:
        case 5:
            currentGhostList.push(inky);
        case 4:
            if(gameLvl != 3) currentGhostList.push(pinky, clyde);
            gameMap = [
                [3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3],
                [3,1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1,3],
                [3,1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1,3],
                [3,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,3],
                [3,1,2,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,2,1,3],
                [3,1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1,3],
                [3,1,1,1,1,2,1,1,1,3,1,3,1,1,1,2,1,1,1,1,3],
                [3,3,3,3,1,2,1,3,3,3,6,3,3,3,1,2,1,3,3,3,3],
                [1,1,1,1,1,2,1,3,1,1,3,1,1,3,1,2,1,1,1,1,1],
                [3,3,3,3,3,2,3,3,1,7,8,9,1,3,3,2,3,3,3,3,3],
                [1,1,1,1,1,2,1,3,1,1,1,1,1,3,1,2,1,1,1,1,1],
                [3,3,3,3,1,2,1,3,3,3,3,3,3,3,1,2,1,3,3,3,3],
                [3,1,1,1,1,2,1,3,1,1,1,1,1,3,1,2,1,1,1,1,3],
                [3,1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1,3],
                [3,1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1,3],
                [3,1,2,2,1,2,2,2,2,2,1,2,2,2,2,2,1,2,2,1,3],
                [3,1,1,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,1,1,3],
                [3,1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1,3],
                [3,1,2,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,2,1,3],
                [3,1,2,2,2,2,2,2,2,2,5,2,2,2,2,2,2,2,2,1,3],
                [3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3]
            ];  
            winScore = 149;
            break;
        case 2:
            currentGhostList.push(inky);
        case 1:
            gameMap = [
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
                [1,2,1,1,2,1,1,1,1,2,2,2,1,1,1,1,2,1,1,2,1],
                [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
                [1,2,1,1,2,1,2,1,1,1,1,1,1,1,2,1,2,1,1,2,1],
                [1,2,2,2,2,1,2,2,2,2,1,2,2,2,2,1,2,2,2,2,1],
                [1,1,2,1,2,1,1,1,1,3,1,3,1,1,1,1,2,1,2,1,1],
                [1,2,2,1,2,2,3,3,3,3,6,3,3,3,3,2,2,1,2,2,1],
                [1,2,1,1,1,2,1,3,1,1,3,1,1,3,1,2,1,1,1,2,1],
                [1,2,2,2,2,2,1,3,1,7,8,9,1,3,1,2,2,2,2,2,1],
                [1,2,1,1,1,2,1,3,1,1,1,1,1,3,1,2,1,1,1,2,1],
                [1,2,2,2,1,2,1,3,3,3,3,3,3,3,1,2,1,2,2,2,1],
                [1,1,1,2,1,2,1,3,1,1,1,1,1,3,1,2,1,2,1,1,1],
                [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
                [1,2,1,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,1,2,1],
                [1,2,2,2,1,2,2,2,2,2,1,2,2,2,2,2,1,2,2,2,1],
                [1,1,1,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,1,1,1],
                [1,2,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,2,1],
                [1,2,1,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,1,2,1],
                [1,2,2,2,2,2,2,2,2,2,5,2,2,2,2,2,2,2,2,2,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            ];
            winScore = 200;
            break;
    }

    if(gameLvl == 1 || gameMode == "pvp"){
        gameMap[clyde.y][clyde.x] = EMPTYNESS;
        gameMap[pinky.y][pinky.x] =EMPTYNESS;
        gameMap[inky.y][inky.x] = EMPTYNESS;
    }else if(gameLvl == 2 || gameLvl == 3){
        gameMap[clyde.y][clyde.x] = EMPTYNESS;
        gameMap[pinky.y][pinky.x] =EMPTYNESS;
    } else if(gameLvl == 4){
        gameMap[inky.y][inky.x] = EMPTYNESS;
    }

    console.log(currentGhostList);
    
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

    pinky = {
        x: 9,
        y: 9,
        direction: "right",
        mode: "normal",
        tile: PINKY,
        under: EMPTYNESS
    }
    
    clyde = {
        x: 11,
        y: 9,
        direction: "right",
        mode: "normal",
        tile: CLYDE,
        under: EMPTYNESS
    }
    
    inky = {
        x: 10,
        y: 9,
        direction: "right",
        mode: "normal",
        tile: INKY,
        under: EMPTYNESS
    }

}


//---------------------------------------
// Game functions
//---------------------------------------

function step(){
    heroMove(pacman);
    pcm = document.getElementById("pacman");

    if(pcm != null && pacman.mouth == "open"){
        pacman.mouth = "close";
        pcm.classList.remove("open");
        pcm.classList.add("close");
    }else if(pcm != null){
        pacman.mouth = "open";
        pcm.classList.remove("close");
        pcm.classList.remove("open");
    }

    if(gameMode == 'pvp' && blinky.x == pacman.x && blinky.y == pacman.y){
        gameOver = true;
        endGame(0);
        return;
    }

    currentGhostList.forEach(el => {
        if(el.x == pacman.x && el.y == pacman.y) {
            gameOver = true;
            endGame(0);
            return;
        }
    });

    switch(gameMode){
        case "pve":
            ghostMove(blinky);
            if(gameLvl != 1 && gameLvl != 4) ghostMove(inky);
            if(gameLvl > 3){
                ghostMove(pinky);
                ghostMove(clyde);
            }
            break;
        case "pvp":
            heroMove(blinky);
            if(blinky.x == pacman.x && blinky.y == pacman.y){
                gameOver = true;
                endGame(0);
                return;
            }
            break;
        }

    
    currentGhostList.forEach(el => {
        if(el.x == pacman.x && el.y == pacman.y) {
            gameOver = true;
            endGame(0);
            return;
        }
    });
    

    if(!gameOver){
        eraseMap();
        drawMap();
    }

}

function heroMove(hero){
    switch(hero.direction){
        case 'right':
            if(gameLvl > 2 && hero.y === 9 && hero.x === 20) {
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
            if(gameLvl > 2 && hero.y === 9 && hero.x === 0){
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

function ghostMove(ghost){
    gameMap[ghost.y][ghost.x] = ghost.under;

    if(ghost.mode == "normal"){

        dx = ghost.x - pacman.x;
        dy = ghost.y - pacman.y;
    
        if(Math.abs(dx) >= Math.abs(dy)){
           if(ghost.x > pacman.x && !stopTiles.includes(gameMap[ghost.y][ghost.x - 1]) && ghost.x > 0){
               ghost.x --;
               ghost.direction = 'left';
           }
           else if(!stopTiles.includes(gameMap[ghost.y][ghost.x + 1]) && ghost.x < 20){
               ghost.x ++;
               ghost.direction = 'right';
           }
           else goWhereFree(ghost);
        } else{
            if(ghost.y > pacman.y && !stopTiles.includes(gameMap[ghost.y - 1][ghost.x]) && ghost.y > 0){ 
                ghost.y --;
                ghost.direction = 'up';
            }
           else if(!stopTiles.includes(gameMap[ghost.y + 1][ghost.x])  && ghost.y != 9 && ghost.x != 10 && ghost.y < 20){
               ghost.y ++;
               ghost.direction = 'down';
           }
           else goWhereFree(ghost);
        }
    } else goWhereFree(ghost);

    ghost.under = gameMap[ghost.y][ghost.x];

    if(ghost.under == PACMAN){
        gameOver = true;
        endGame(0);
        return;
    }

    gameMap[ghost.y][ghost.x] = ghost.tile;
}

function goWhereFree(hero){
    direction = {};

    if(!stopTiles.includes(gameMap[hero.y][hero.x + 1]) && hero.x < 20) direction['right'] = true;
    if(!stopTiles.includes(gameMap[hero.y][hero.x - 1]) && hero.x > 0) direction['left'] = true;
    if(!stopTiles.includes(gameMap[hero.y - 1][hero.x]) && hero.y > 0) direction['up'] = true;
    if(!stopTiles.includes(gameMap[hero.y + 1][hero.x]) && hero.y < 20) direction['down'] = true;

    random = Math.floor(Math.random() * Object.keys(direction).length); 
    counter = 0;
    for(el in direction){
        if(counter == random){
            switch(el){
                case 'right':
                    hero.x ++;
                    hero.direction = 'right';
                    break;
                case 'left':
                    hero.x --;
                    hero.direction = 'left';
                    break;
                case 'up':
                    hero.y --;
                    hero.direction = 'up';
                    break;
                case 'down':
                    hero.y ++;
                    hero.direction = 'down';
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

       // startEnergizerEffect();
    }

    if(score >= winScore) {
        gameOver = true;
        setUpHeroes();
        endGame(1);    
        return;
    }
}

function startEnergizerEffect(){
    console.log("energizer was picked");
    pacman.mode = "energizer";

    currentGhostList.forEach(el => {
        let ghost = document.getElementById(el.id);
        el.mode = "energizer";
        console.log(ghost);
        ghost.classList.add("energizer");
    })

    setTimeout(() => {
        pacman.mode = "normal";
        currentGhostList.forEach(el => {
            el.mode = "normal";
            let ghost = document.getElementById(el.id);
            ghost.classList.remove("energizer");
        });
    },  4000);
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
// Start functions
//---------------------------------------

let game;

function init(){
    pvp = document.getElementById("pvp");
    pve = document.getElementById("pve");

    pvp.addEventListener("click", () => {
        div = document.getElementById("start");
        document.body.removeChild(div);
        gameMode = "pvp";
        selectLevel();
    });

    pve.addEventListener("click", () => {
        div = document.getElementById("start");
        document.body.removeChild(div);
        gameMode = "pve"
        selectLevel();
    });
}

function selectLevel(){
    switch(gameMode){
        case "pvp":
            lvls = [2, 3];
            break;
        case "pve":
            lvls = [1, 2, 3, 4, 5];
            break;
    }
    
    btns = document.createElement("div");
    btns.classList.add("lvls");
    lvls.forEach(lvl => {
        btn = document.createElement("button");
        btn.classList.add("btn");
        
        switch(gameMode){
            case "pvp":
                btn.innerHTML = "map " + (--lvl);
                break;
            case "pve":
                btn.innerHTML = "lvl " + lvl;
                break;
        }

        btn.addEventListener("click", () =>{
            gameLvl = lvl;
            removeAllChildren(document.body);
            setUpMap();
            setUpGame();
        });

        btns.appendChild(btn);
    });
    document.body.appendChild(btns);

    back = setStopBtn();
    document.body.appendChild(back);

    back.addEventListener("click", () => {
        removeAllChildren(document.body);
        document.body.appendChild(start);
        init();
    });

}

function removeAllChildren(elem){
    while(elem.firstChild){
        elem.removeChild(elem.firstChild);
    }
}

function setStopBtn(){
    back = document.createElement("button");
    back.classList.add("back");
    back.innerHTML = "Return to menu"

    return back;
}

function setUpGame(){
    setUpMap();
    setUpHeroes();
    addScore();
    drawMap();
    btn = setStopBtn();
    setupKeyboardControls();

    game = setInterval(step, 250);
}


//---------------------------------------
// End game functions
//---------------------------------------

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
        removeAllChildren(document.body);
        document.body.appendChild(start);
        init();
    });

    btnRetry.addEventListener("click", () => {
        removeAllChildren(document.body);
        setUpGame()
    });
}


