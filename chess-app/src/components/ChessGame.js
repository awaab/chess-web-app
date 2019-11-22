import React,{Component} from 'react';
import ChessboardValid from './chessboardValid.js'
import Chess from 'chess.js';

//import stockfish from '../chessEngines/stockfish.js';
class ChessGame extends Component{
	constructor(props) {
    super(props);
    this.stockfish = new Worker('static/stockfish.js');
    this.chessGame = new Chess();
    var that = this;
    this.stockfish.onmessage = function(event) { //console.log((event.data));
    	if(event.data.startsWith('bestmove')){
    		//console.log("BEST MOVE");
        console.log((event.data));
    		var move = event.data.split(' ')[1];
        //console.log("CHESSGAME IN ONMESSAGE",that.chessGame.fen());
        //console.log(typeof(that.chessGame),move);
        that.makeMove(move);
    	} else {
        console.log("NOT event.data.startsWith('bestmove')");
      }
       if(event.data==('uciok'))
      console.log("UUCCII OOKK");
    }
    this.stockfish.postMessage('uci');
    this.nextTurn(undefined);
    //this.stockfish.postMessage('position '+this.state.position);
    //this.stockfish.postMessage('isready');
    //this.stockfish.postMessage('position '+this.state.position+'moves d2d4');
  }
  state = {
  	position: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    moves: [],
  }
nextTurn = (turn) =>{
  

  console.log("In chessgame turn: ",turn);
  console.log('++++++++++++++++++++');
	if(turn === this.props.playerColor)
		{console.log('Your turn');}
	else
		{console.log("Oponents turn");
		this.playOponentsTurn();
	}

}

addMove=(move)=>{
  console.log("addMove()");
  console.log(move);
  console.log(this.chessGame.turn());
  this.setState((state, props) => {
  return {
    moves: [...state.moves,move],
  };
});
   console.log(this.state.moves);
}

updateBoard = (fen,move) =>{
  this.addMove(move);
  this.setState((state, props) => {
  return {
    position:fen,
  };
});
  this.displayOnConsole();
  if(this.chessGame.game_over())
    this.endGame();
  this.nextTurn(this.chessGame.turn());
}

endGame = () =>{
  console.log("GAM ENDED");
  console.log(this.chessGame.turn());
  this.props.endGameCallback();

}

displayOnConsole = () =>{
  console.log(this.chessGame.ascii());
  console.log(this.state);
  console.log(this.chessGame.turn());
}

makeMove = (move) =>{
  //this.addMove(move);
  console.log("MAKEMOVE");
  console.log(this.chessGame.ascii());
  console.log(move);
  var sourceSquare=move.substr(0,2);
  var targetSquare=move.substr(2,4);
  this.chessGame.move({ from: sourceSquare, to: targetSquare });
    console.log(this.chessGame.ascii());
  this.updateBoard(this.chessGame.fen(),move);
}

playOponentsTurn = () =>{
	//console.log(this.state.position);
  //console.log("BEFORE",this.chessGame.fen());
  //this.chessGame.load(this.state.position);
    //console.log("AFTER",this.chessGame.fen());

	//console.log("playOponentsTurn");
  console.log("playOponentsTurn",this.chessGame.turn());
	//this.stockfish.postMessage('position startpos moves '+this.state.moves.join(' '));
  this.stockfish.postMessage('position fen '+this.state.position);
  var depth = this.props.depth;
	this.stockfish.postMessage('go depth '+depth);
}


  render() {
  return (
    <div>
     <ChessboardValid chessGame={this.chessGame} position={this.state.position} nextTurnCallback={this.nextTurn} updateBoardCallback={this.updateBoard} moveDoneCallback={this.moveDone} playerColor={this.props.playerColor}/>

    </div>
  );}

}

export default ChessGame;