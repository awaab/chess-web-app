import React,{Component, Fragment} from 'react';
import ChessGame from './ChessGame.js'


class GameOptions extends Component{

state={
		show_options: true,
		show_game: false,
		color: 'w',
		level: 1,
	}

depth ={
	1:2,
	2:3,
	3:5,
	4:7,
	5:9,
	6:10,
}

constructor(props){
   super(props);
}

handleSubmit = (event)=>{
			event.preventDefault();
	this.setState({show_options: false,
	show_game: true,});
}
handleLevelChange = (event)=>{
    this.setState({level: event.target.value});
}

handleColorChange = (event)=>{
    this.setState({color: event.target.value});
}
endGame = () =>{
	this.props.endGameCallback();
}

render() {
  return (
    <div>
     {this.state.show_options &&
		<Fragment>
		<h1>Select Options</h1>
		 <form onSubmit={this.handleSubmit}>
        <label>
          Level
          <select value={this.state.level} onChange={this.handleLevelChange}>
            <option value={1}>One</option>
            <option value={2}>Two</option>
            <option value={3}>Three</option>
            <option value={4}>Four</option>
            <option value={5}>Five</option>
            <option value={6}>Six</option>
          </select>
        </label>
        <p></p>
       
         <ul>
        <li>
          <label>
            <input
              type="radio"
              value="w"
              checked={this.state.color === "w"}
              onChange={this.handleColorChange}
            />
            white
          </label>
        </li>
        
        <li>
          <label>
            <input
              type="radio"
              value="b"
              checked={this.state.color === "b"}
              onChange={this.handleColorChange}
            />
            black
          </label>
        </li>
      </ul>

       <input type="submit" value="Play" />
       </form>

		</Fragment>
	}

    {this.state.show_game &&
		<Fragment>
		<h1>game</h1>
		<ChessGame playerColor={this.state.color} depth={this.depth[this.state.level]} endGameCallback={this.endGame}/>
		</Fragment>
	}
      </div>  );
}


}
export default GameOptions;
