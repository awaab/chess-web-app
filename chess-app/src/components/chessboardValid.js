import React,{Component} from 'react';
//import WithMoveValidation from '../integrations/WithMoveValidation.js';
import Chessboard from 'chessboardjsx';
import Chess from 'chess.js';
class ChessboardValid extends Component{
constructor(props) {
    super(props);
    //this.chessGame = new Chess();
  }


makeMove = (sourceSquare, targetSquare, piece) =>{
	this.props.chessGame.move({ from: sourceSquare, to: targetSquare });
	this.props.updateBoardCallback(this.props.chessGame.fen(),sourceSquare+targetSquare);
	//this.props.nextTurnCallback(this.props.chessGame.turn());
  this.displayOnConsole();
}
displayOnConsole = () =>{
	console.log(this.props.chessGame.ascii());
	console.log(this.state);
	console.log(this.props.chessGame.turn());
}
onDrop = ({ sourceSquare, targetSquare, piece }) => {
	//COPPIED FROM SOURCE -----------------------------------------
    // see if the move is legal
    this.makeMove(sourceSquare, targetSquare, piece);
    //WithMoveValidation.onDrop({ sourceSquare, targetSquare });
    //END COPPIED FROM SOURCE-----------------------------------------
      };

onMessage = (data) => {
	console.log(JSON.parse(data));
}
allowDrag = ({piece,sourceSquare}) =>{
	var color = piece.charAt(0);
	console.log('dragging',color);
  console.log(this.props.color);
	if(color !== this.props.chessGame.turn())
		return false;
  else if (color == this.props.playerColor)
	return true;
}

//////MOVE CHESS GAME TO ABOVE STATE TO ALLOW MAKING MOVES!

render() {
  return (
    <div>
     <Chessboard position={this.props.position} onDrop={this.onDrop} allowDrag={this.allowDrag}/>
    </div>
  );}
}
export default ChessboardValid;