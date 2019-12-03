import React,{Component,Fragment} from 'react';
import axios from 'axios';
import {Table,Button,Form,Row, Container, Col} from 'react-bootstrap';


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
		user:'',
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
			user: data.user,
    	})
	console.log(this.state);

}
resultString = (game)=>{
	if (game.winner ==='D')
		return "DRAW";
	if (game.winner ==='W'){
		if(game.white_player===this.state.user)
			return "WON";
		else return "LOST"
	}
if (game.winner ==='B'){
		if(game.black_player===this.state.user)
			return "WON";
		else return "LOST"
	}
}

render() {
  return (
    <div>
    <Container>
    <Row><h2/></Row>
  <Row>
  	<Col style={{width: "25%"}}/>
    <Col><h4>Total games played: {this.state.played}</h4></Col>
    <Col style={{width: "25%"}}/>
  </Row>
  <Row>
   <Col style={{width: "35%"}}/>
    <Col><p>Won: {this.state.won}</p> </Col>
    <Col><p>Lost: {this.state.lost}</p> </Col>
    <Col><p>Draw: {this.state.draw}</p> </Col>
     <Col style={{width: "35%"}}/>
  </Row>
</Container>
    
    
  
  <Container>
  <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>Result</th>
      <th>White</th>
      <th></th>
      <th>Black</th>
      <th>{'Date'}</th>
      <th>Duration</th>
    </tr>
  </thead>

   <tbody>
    {this.state.gameList.map(game => (
      <tr>
         <td>{this.resultString(game)}</td>
         <td>{game.white_player} </td>
                  <td>vs </td>
         <td> {game.black_player}</td>
         <td>{game.started_at} </td>
         <td>{game.duration} </td>
         
      </tr>
    ))}
    </tbody>
    </Table>
<Row>
<Col/>
    <Col><Button onClick={this.props.showHome} style={{width: "80%"}}>Back to main menu</Button></Col>
<Col/>
 </Row>
  </Container>

    </div>
    );
}
}

export default Stats;