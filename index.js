//Game Board object
class GameBoard {
    constructor(){
        this.board = [0,0,0,0,0,0,0,0,0];
        this.display = ["b0","b1","b2","b3","b4","b5","b6","b7","b8"];
        //Add Listeners
        for (let i=0;i<this.board.length;i++) {
            document.getElementById(this.display[i]).addEventListener("click", ()=>{clickBoard(i)})
        }
    }
}
//Fill Board
function render(board) {
    
    // fill cells
    for (i=0;i<board.board.length;i++) {
        document.getElementById(board.display[i]).innerHTML = board.board[i]== 1 ? '<i class="far fa-circle"> </i>' : board.board[i]== 2 ? '<i class="fas fa-times"></i>' :  '';
    }
    //get game status
    status = check(board);
    //display winner message
    document.getElementById("message").innerText = status===0 ? "" : status === 1 ? player1.name + " WINS! CONGRATULATIONS" :  status == 2 ? player2.name + " WINS! CONGRATULATIONS" : "GAME ENDED TIED";
    console.log(status);
}

//Click function
function clickBoard(cell) {

    if (myBoard.board[cell]!=0 || status!=0) {return}

    if (player1.active==true) {
        console.log(cell+" " + player1.name);
        player1.active = false;
        player2.active = true;
        myBoard.board[cell] = 1;
    } else {
        console.log(cell+" "+ player2.name);
        player2.active = false;
        player1.active = true;
        myBoard.board[cell]=2;
    }
    render(myBoard);
}



//Player  Object
class player {
    constructor(name,active){
     this.name = name;
     this.active = active;    
    }
}

//Game flow Object
class flow {
    constructor(){
        this.active = 1;
        this.played = false;
    }

}

//Check game status
function check(board) {

    // check if three in the row horizontally
    for (let i=0;i<9;i+=3) {
        if (board.board[i]===1 && board.board[i]===board.board[i+1] && board.board[i]===board.board[i+2]) {return 1}
        else if (board.board[i]===2 && board.board[i]===board.board[i+1] && board.board[i]===board.board[i+2]) {return 2}
    }
    // check if three in the row vertical
    for (let i=0;i<9;i++) {
        if (board.board[i]===1 && board.board[i]===board.board[i+3] && board.board[i]===board.board[i+6]) {return 1}
        else if (board.board[i]===2 && board.board[i]===board.board[i+3] && board.board[i]===board.board[i+6]) {return 2}
    }
    // check if three in the row diagonally 
    if (board.board[0]===1 && board.board[0]===board.board[4] && board.board[0]===board.board[8]) {return 1}
        else if (board.board[0]===2 && board.board[0]===board.board[4] && board.board[0]===board.board[8]) {return 2}
    
    if (board.board[2]===1 && board.board[2]===board.board[4] && board.board[2]===board.board[6]) {return 1}
        else if (board.board[2]===2 && board.board[2]===board.board[4] && board.board[2]===board.board[6]) {return 2}
    //check if tie
    if (board.board.includes(0)==false) {return 3}

    //game is on
    return 0;

}

//Game start
const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", ()=> {
    //get player names
    if (document.getElementById("pl1").value=="") {player1.name = "Player 1"}
    else {player1.name = document.getElementById("pl1").value;}

    if (document.getElementById("pl2").value=="") {player2.name = "Player 2"}
    else {player2.name = document.getElementById("pl2").value;}

    //reset board
    myBoard.board = [0,0,0,0,0,0,0,0,0];
    //set active player
    player1.active = true;
    player2.active = false;

    //display board
    document.getElementById("start").style.display= "none";
    document.getElementById("board").style.display = "block";
})

//Restart Game
const restartBtn = document.getElementById("restart");
restartBtn.addEventListener("click", ()=>{
     //reset board
     myBoard.board = [0,0,0,0,0,0,0,0,0];
     render(myBoard);
})

const myBoard = new GameBoard;
const player1 = new player("Player 1",true);
const player2 = new player("Player 2",false);
let status = 0;