import React,{Component} from 'react';
import ChessboardValid from './chessboardValid.js'
import Chess from 'chess.js';
import axios from 'axios';
import {Table,Button,Form,Row, Container, Col} from 'react-bootstrap';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
const end_game_url = 'endgame/';
//import stockfish from '../chessEngines/stockfish.js';
class ChessGame extends Component{
	constructor(props) {
    super(props);
    this.stockfish = new Worker('static/stockfish.js');
    this.chessGame = new Chess();
    var date = new Date();
    this.start_timestamp = date.getTime();
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
    this.nextTurn('w');
    //this.stockfish.postMessage('position '+this.state.position);
    //this.stockfish.postMessage('isready');
    //this.stockfish.postMessage('position '+this.state.position+'moves d2d4');
  }
  state = {
  	position: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    moves: [],
    gameOver: false,
  }
  depth ={
  1:1,
  2:3,
  3:5,
  4:7,
  5:9,
  6:10,
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
  //post game record
  this.setState({
    gameOver: true,
  })
  var winner = (this.chessGame.turn()==='b') ? "W" : "B";
  var white_player =(this.props.playerColor==='w') ? 'user':'level'+this.props.level;
  var black_player =(this.props.playerColor==='b') ? 'user':'level'+this.props.level;
  var date = new Date();
  var end_timestamp = date.getTime();
  var duration = end_timestamp/1000 -this.start_timestamp/1000;
  console.log('duration', duration);
  const data = {
    winner: winner,
    white_player: white_player,
    black_player: black_player,
    duration: duration,
  }
  console.log("GAM ENDED");
  console.log(this.chessGame.turn());
  axios.post(end_game_url, data)
    .then((response) => {
      console.log(response);
      //this.props.setTokenCallback(response.data.key);
    }, (error) => {
      console.log(error);
    });

  //this.props.endGameCallback();

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
  var depth = this.depth[this.props.level];
  console.log('go depth '+depth);
	this.stockfish.postMessage('go depth '+depth);
}


  render() {
  return (
    <div>
    <Container>
    <Row className="text-center" >
    <Col/>
    <Col>
    {!this.state.gameOver &&
    <h3>Playing against AI level {this.props.level} </h3>
    }
    {this.state.gameOver &&
    <h2>Game Over</h2>
    }
    </Col>
    <Col/>
    </Row>
    <Row className="text-center" >
    <Col/>
     <Col><ChessboardValid chessGame={this.chessGame} position={this.state.position} nextTurnCallback={this.nextTurn} updateBoardCallback={this.updateBoard} moveDoneCallback={this.moveDone} playerColor={this.props.playerColor}/></Col>
     <Col/>
     </Row>
     <Row>
<h3/>
     </Row>
     <Row className="text-center">
     <Col/>
     <Col><Button onClick={this.props.showHome} style={{width: "40%"}}>Quit game</Button></Col>
     <Col/>
     </Row>
     </Container>
    </div>
  );}

}

export default ChessGame;