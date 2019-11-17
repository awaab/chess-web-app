import React,{Component} from 'react';
//import WithMoveValidation from '../integrations/WithMoveValidation.js';
import Chessboard from 'chessboardjsx';
import Chess from 'chess.js';
class ChessboardValid extends Component{
constructor(props) {
    super(props);
    this.chessGame = new Chess();
  }


makeMove = (sourceSquare, targetSquare, piece) =>{
	this.chessGame.move({ from: sourceSquare, to: targetSquare });
	this.props.updateBoardCallback(this.chessGame.fen());
	this.props.nextTurnCallback(this.chessGame.turn());
}
displayOnConsole = () =>{
	console.log(this.chessGame.ascii());
	console.log(this.state);
	console.log(this.chessGame.turn());
}
onDrop = ({ sourceSquare, targetSquare, piece }) => {
	//COPPIED FROM SOURCE -----------------------------------------
    // see if the move is legal
    this.displayOnConsole();
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
	if(color != this.chessGame.turn())
		return false;
	return true;
}

//////MOVE CHESS GAME TO ABOVE STATE TO ALLOW MAKING MOVES!

render() {
  return (
    <div>
     <Chessboard position={this.props.position} onDrop={this.onDrop} allowDrag={this.allowDrag}/>
              onMessage={this.onMessage}/>
    </div>
  );}
}
export default ChessboardValid;