import React,{Component,Fragment} from 'react';
import axios from 'axios';
import GameOptions from './GameOptions.js'
import Stats from './Stats.js';
import { Button,Form,Row, Container } from 'react-bootstrap';


const logout_url = 'chess/logout/'

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
    <h2>Home</h2>
    	<Container>
    	<Button onClick={this.showStats} style={{width: "40%"}}>Show Stats</Button>
    	</Container>
<p/>
    	<Container>
    	<Button onClick={this.showOptions} style={{width: "40%"}}>Play against AI</Button>
    	</Container>
<p/>
    	<Container>
        <Button onClick={this.logOut} style={{width: "40%"}}>Logout</Button>
        </Container>
    </Fragment>
	}
	{this.state.show_stats &&
		<Stats showHome={this.showHome}/>
	}


	{this.state.show_options &&
		<Fragment>
		<GameOptions showHome= {this.showHome} endGameCallback={this.endGame}/>
		</Fragment>
	}
	{/*<button onClick={this.showHome}>show_home()</button>*/}
    </div>
  );}
}

export default Home;