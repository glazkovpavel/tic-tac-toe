const space = document.querySelector('.space');
const cell = document.getElementsByClassName('cell');
const currentPlayer = document.getElementById('curPlyr');
const buttonPlay = document.querySelector('.select-button');
const playTitle = document.querySelector('.play-title');

let player = "x";
let gameSelectionAuto = false;

buttonPlay.addEventListener('click', togglePlay);
playTitle.textContent = 'Игра вдвоём'

function togglePlay() {
    console.log('togglePlay')
    gameSelectionAuto = !gameSelectionAuto;
    if (!gameSelectionAuto) {
        playTitle.textContent = 'Игра вдвоём'
    } else {
        playTitle.textContent = 'Игра с компьютером'
    }
}



if(gameSelectionAuto) {
    console.log('Игра с компьютером')
} else {
    console.log('Игра вдвоём')
}

const winIndex = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]

const stat = {
    'x': 0,
    'o': 0,
    'd': 0
}


for (let i = 1; i <= 9; i++) {
    space.innerHTML += "<div class='cell' pos=" + i + "></div>"
}

for (let i = 0; i < cell.length; i++) {
    cell[i].addEventListener('click', cellClick, false);
}

function autoMove() {

    //let a = cell.filter(val => val.innerHTML !== 0)


    let t = Math.ceil(Math.random() *9)

        if(cell[t].innerHTML.length !== 0)
        {
            console.log('cell[t].innerHTML', cell[t].innerHTML)
            this.innerHTML = player;
        }

        // console.log('i===t', i, t, this.innerHTML)
        //
        // if(!cell.hasOwnProperty("item")) {
        //     this.innerHTML = player;
        //     return;
        // }

    cellClick()

}

function getRandomInt(max){
    return Math.floor(Math.random() * max);
}

function cellClick() {

    const data = [];

    if(!this.innerHTML) {
        this.innerHTML = player;
    } else {
        alert("Ячейка занята");
        return;
    }

    for(let i in cell){
        if(cell[i].innerHTML === player){
            data.push(parseInt(cell[i].getAttribute('pos')));
        }
    }

    if(checkWin(data)) {
        stat[player] += 1;
        restart("Выграл: " + player);
    }else {
        let draw = true;
        for(let i in cell) {
            if(cell[i].innerHTML === '') draw = false;
        }
        if(draw) {
            stat.d += 1;
            restart("Ничья");
        }
    }
    player = player === "x" ? "o" : "x";
    currentPlayer.innerHTML = player.toUpperCase();

    if(gameSelectionAuto) {
        autoMove()
    }
}

function checkWin(data) {
    for(let i in winIndex) {
        let win = true;
        for(let j in winIndex[i]) {
            let id = winIndex[i][j];
            let ind = data.indexOf(id);

            if(ind === -1) {
                win = false
            }
        }
        if(win) return true;
    }
    return false;
}

function restart(text) {

    alert(text);
    for(let i = 0; i < cell.length; i++) {
        cell[i].innerHTML = '';
    }
    updateStat();
}

function updateStat() {
    document.getElementById('sX').innerHTML = stat.x;
    document.getElementById('sO').innerHTML = stat.o;
    document.getElementById('sD').innerHTML = stat.d;
}
