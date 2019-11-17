import React,{Component} from 'react';
import ChessboardValid from './chessboardValid.js'
//import stockfish from '../chessEngines/stockfish.js';
class ChessGame extends Component{
	constructor(props) {
    super(props);
    this.stockfish = new Worker('static/stockfish.js');
    this.stockfish.onmessage = function(event) { console.log(event.data);
    	if(event.data.startsWith('bestmove')){
    		console.log("BEST MOVE");
    		var move = event.data.split()[1];
    	}
    }
    this.stockfish.postMessage('uci');
  }
  state = {
  	position: "start",
  }
nextTurn = (turn) =>{
	if(turn == this.props.playerColor)
		console.log('Your turn');
	else
		{console.log("Oponents turn");
		this.playOponentsTurn();
	}

	console.log("In chessgame turn: ",turn);
}

updateBoard = (fen) =>{
	//this.props.updateBoardCallback(fen);
	this.setState({position:fen});
}

playOponentsTurn = () =>{
	console.log(this.state.position);
	console.log("playOponentsTurn");
	this.stockfish.postMessage('position '+this.state.position);
	this.stockfish.postMessage('go depth 3');
}

  render() {
  return (
    <div>
     <ChessboardValid position={this.state.position} nextTurnCallback={this.nextTurn} updateBoardCallback={this.updateBoard}/>
    </div>
  );}

}

export default ChessGame;