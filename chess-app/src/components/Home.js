import React,{Component,Fragment} from 'react';
import axios from 'axios';
import GameOptions from './GameOptions.js'
const logout_url = 'api/v1/users/logout/'

class Home extends Component{

constructor(props){
   super(props);
}

	state={
		show_home: true,
		show_stats: false,
		show_options: false,
	}

logOut = () =>{
  axios.post(logout_url)
      .then(response => {
      console.log(response);
      this.props.setLoggedInCallback(false);
  })
}

showStats = () =>{
	console.log('showStats');
		this.setState({
		show_home: false,
		show_stats: true,
		show_options: false,
	});
}
showHome = () =>{
	console.log('showStats');
		this.setState({
		show_home: true,
		show_stats: false,
		show_options: false,
	});
}
showOptions = () =>{
	this.setState({
		show_home: false,
		show_stats: false,
		show_options: true,
	});
}

endGame = () =>{
	this.showHome();
}

render() {
  return (
    <div>
    {this.state.show_home &&
    <Fragment>
    <h1>Home</h1>
    	<button onClick={this.showStats} >Show Stats</button>
    	<button onClick={this.showOptions} >Play against AI</button>
        <button onClick={this.logOut} >Logout</button>
    </Fragment>
	}
	{this.state.show_stats &&
		<h1>stats</h1>
	}


	{this.state.show_options &&
		<Fragment>
		<h1>options</h1>
		<GameOptions endGameCallback={this.endGame}/>
		</Fragment>
	}
	<button onClick={this.showHome}>show_home()</button>
    </div>
  );}
}

export default Home;