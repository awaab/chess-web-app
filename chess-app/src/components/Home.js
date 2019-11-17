import React,{Component,Fragment} from 'react';
import axios from 'axios';
import ChessGame from './ChessGame.js'
const logout_url = 'api/v1/users/logout/'

class Home extends Component{

constructor(props){
   super(props);
}

	state={
		show_home: true,
		show_stats: false,
		show_game: false,
	}

logOut = () =>{
  axios.post(logout_url)
      .then(response => {
      console.log(response);
      this.props.setLoggedInCallback(false);
  })
}
playStock = () =>{
	console.log('playStock');
	this.setState({
		show_home: false,
		show_stats: false,
		show_game: true,
	});
}

showStats = () =>{
	console.log('showStats');
		this.setState({
		show_home: false,
		show_stats: true,
		show_game: false,
	});
}
showHome = () =>{
	console.log('showStats');
		this.setState({
		show_home: true,
		show_stats: false,
		show_game: false,
	});
}
render() {
  return (
    <div>
    {this.state.show_home &&
    <Fragment>
    <h1>Home</h1>
    	<button onClick={this.showStats} >Show Stats</button>
    	<button onClick={this.playStock} >Play against stockfish</button>
        <button onClick={this.logOut} >Logout</button>
    </Fragment>
	}
	{this.state.show_stats &&
		<h1>stats</h1>
	}

	{this.state.show_game &&
		<Fragment>
		<h1>game</h1>
		<ChessGame playerColor={'w'}/>
		</Fragment>
	}
	<button onClick={this.showHome}>show_home()</button>
    </div>
  );}
}

export default Home;