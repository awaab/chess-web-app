import React,{Component,Fragment} from 'react';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

const games_played_url ='chess/games_played/';

class Stats extends Component{
state={
		gameList: [],
		won: -1,
		lost: -1,
		draw: -1,
		played: -1,
}

constructor(props){
   super(props);
   axios.get(games_played_url)
  		.then(response => {
    	console.log(response.data);
    	this.setStats(response.data);
	})
}

setStats = (data) => {
	this.setState({
    		gameList: data.games_list,
			won: data.won,
			lost: data.lost,
			draw: data.draw,
			played: data.played,
    	})
	console.log(this.state);

}

render() {
  return (
    <div>
    <p>Total games played: {this.state.played}</p>
    <p>Won: {this.state.won}</p>
    <p>Lost: {this.state.lost}</p>
    <p>Draw: {this.state.draw}</p>
  
  <ul>
    {this.state.gameList.map(game => (
      <li>
        <div>{game.winner}</div>
        <div>{game.white_player}</div>
        <div>{game.black_player}</div>
        <div>{game.duration}</div>
        <div>{game.started_at}</div>
      </li>
    ))}
  </ul>

    </div>
    );
}
}

export default Stats;