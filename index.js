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
    if (complay==false){
    document.getElementById("message").innerText = status===0 ? "" : status === 1 ? player1.name + " WINS! CONGRATULATIONS" :  status == 2 ? player2.name + " WINS! CONGRATULATIONS" : "GAME ENDED TIED";
    } else{
        document.getElementById("message").innerText = status===0 ? "" : status === 1 ? player1.name + " WINS! CONGRATULATIONS" :  status == 2 ? computerPlayer.name + " WINS!" : "GAME ENDED TIED";
        }
    console.log(status);
   
}

// computer click
function comClickBoard(cell) {
    // if (myBoard.board[cell]!=0 || status!=0 || computerPlayer.active==false) {return}
    console.log(cell+" " + computerPlayer.name);
    computerPlayer.active = false;
    player1.active = true;
    myBoard.board[cell] = 2;
    render(myBoard);

}
//Click function
function clickBoard(cell) {

    if (myBoard.board[cell]!=0 || status!=0 || computerPlayer.active==true) {return}

    if (player1.active==true && complay==false) {
        console.log(cell+" " + player1.name);
        player1.active = false;
        player2.active = true;
        myBoard.board[cell] = 1;
    }   else if (player1.active==true && complay==true) {
        console.log(cell+" " + player1.name);
        player1.active = false;
        computerPlayer.active = true;
        myBoard.board[cell] = 1;
        console.log("Cell: "+cell);
        document.getElementById(myBoard.display[cell]).innerHTML = '<i class="far fa-circle"> </i>';
        console.log(myBoard.display[cell]);
        document.body.style.cursor = "wait";
        timeOut(1000);
       
        
        
    } 
    else {
        console.log(cell+" "+ player2.name);
        player2.active = false;
        player1.active = true;
        myBoard.board[cell]=2;
    }
    render(myBoard);
}

//timeout function
function timeOut(delay) {
    setTimeout( function() {
        if (check(myBoard)===0) {comClickBoard(computerPlays());
            document.body.style.cursor = "default";}
      }, delay);
}

//Player  Object
class player {
    constructor(name,active){
     this.name = name;
     this.active = active;    
    }
}

// Computer player object
class comPlayer {
    constructor() {
        this.name = "Computer";
        this.active = true;
    }
}

function computerPlays() {
    let available = getAvailableMoves(myBoard);
    let random = Math.floor(Math.random() * available.length);;
    if (comlevel ===1) {
        return available[random];
    } else if(comlevel===2) {
        let move = getMediumMove(myBoard);
        if (move>=0) {return move;}
        return available[random];
    } else {
        if (available.length>7) {return available[random];}
        return getBestMove(myBoard);
    }
}

function getMediumMove(board) {
    
    let availableMoves = getAvailableMoves(board);
    for (i in availableMoves) {
        let child = new GameBoard;
        child = cloneBoard(board);
        let move = availableMoves[i];
        child.board[move] = 2;
        if (check(child)===2) {return move}
    }

    for (i in availableMoves) {
        let child = new GameBoard;
        child = cloneBoard(board);
        let move = availableMoves[i];
        child.board[move] = 1;
        if (check(child)===1) {return move}
    }

    return -1;

}



function getBestMove(board,max=true,depth=0) {
    // if game is over return result
    if (check(board)!=0) {
        if (check(board)===1) {return 100-depth}
        else if (check(board)===2) {return -100+depth}
        else {return 0}
    }   

    let best = 0;
    let bestMove = -1;

    if (max==true) {
        //Init best to lowest value
         best = -100;
        //get available moves
        let availableMoves = getAvailableMoves(board);
        console.log(availableMoves.length)
        //Loop through available moves
        for (i in availableMoves) {
            console.log("i: " + i)
            //Create a copy of board
            console.log("My Board: " + myBoard.board);
            console.log("Board: " + board.board);
            let child = new GameBoard;
            child = cloneBoard(board);
            console.log("Child 1:" + child.board);
            //get move
            let move = availableMoves[i];
            //Try a move
            child.board[move]=1;
            console.log("Child 2:" + child.board);
            //Call recursively getBestMove for child board
            const nodeValue = getBestMove(child,false,depth+1);
            // if depth equal zero check best move
            if (depth===0 && best<nodeValue) {bestMove=move;}
            //update best
            best = Math.max(best, nodeValue);
            console.log(" Depth: " + depth + " Best: " + best);
            console.log("i: " + i)
            
        
        }
        if (depth===0) {
            console.log("Best: " + best + " Best Move: " + bestMove);
            return bestMove;
        }

        return best;
    }

    if (max==false) {
        //Init best to highest value
         best = 100;
        let availableMoves = getAvailableMoves(board);
        console.log(availableMoves.length)  
        //Loop through available moves
        for (i in availableMoves) {
        //Create a copy of board
        console.log("My Board: " + myBoard.board);
            console.log("Board: " + board.board);
            let child = new GameBoard;
            child = cloneBoard(board);
        console.log("---Child 1:" + child.board);
         //get move
         let move = availableMoves[i];
         //Try a move
         child.board[move]=2;
         console.log("---Child 2:" + child.board);
        //Call recursively getBestMove for child board
        const nodeValue = getBestMove(child,true,depth+1);
        //update best
        best = Math.min(best, nodeValue);
        console.log("-Depth: " + depth + " -Best: " + best)
    }
        return best;
    }
}

function getAvailableMoves(board) {
    result = [];
    for (i=0;i<board.board.length;i++) {
        if (board.board[i]== 0) {result.push(i)}
    }
    return result;
}

function cloneBoard(board) {
    return JSON.parse(JSON.stringify(board));

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

//Chose Mode
const modeCheck = document.getElementById("complay");
modeCheck.addEventListener("change", ()=> {
    if (modeCheck.checked==true) {
    document.getElementById("m2playersmode").style.display = "none";
    document.getElementById("m1playermode").style.display = "block";
    complay = true;
    } else {
    document.getElementById("m2playersmode").style.display = "block";
    document.getElementById("m1playermode").style.display = "none";
    complay = false;
    }
})


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
    if (complay==true) {
        comlevel = document.getElementById("1").checked ? 1 : document.getElementById("2").checked ? 2 : 3;
        computerPlayer.active = true;
        player1.active = false;
        comClickBoard(computerPlays());
    } else {
    computerPlayer.active= false;
    player1.active = true;
    player2.active = false;
    }
    //display board
    document.getElementById("start").style.display= "none";
    document.getElementById("board").style.display = "block";
    render(myBoard);
})

//Restart Game
const restartBtn = document.getElementById("restart");
restartBtn.addEventListener("click", ()=>{
     //reset board
     myBoard.board = [0,0,0,0,0,0,0,0,0];
     if (complay==true && computerPlayer.active==true) {
        comClickBoard(computerPlays());
     }
     render(myBoard);
})



const myBoard = new GameBoard;
let complay = false;
let comlevel = 1;
const computerPlayer = new comPlayer();
const player1 = new player("Player 1",true);
const player2 = new player("Player 2",false);
let status = 0;