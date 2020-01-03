import React,{Component, Fragment} from 'react';
import ChessGame from './ChessGame.js'
import {Table,Button,Form,Row, Container, Col} from 'react-bootstrap';

class GameOptions extends Component{

state={
		show_options: true,
		show_game: false,
		color: 'w',
		level: 1,
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
		<h3>Game Options</h3>
		 <Container className="text-center" style={{width: "60%"}}>
		 <Form onSubmit={this.handleSubmit}>
<Form.Group controlId="difficulty.level">
    <Form.Label>Select difficulty level</Form.Label>
    <Form.Control as="select" value={this.state.level} onChange={this.handleLevelChange}>
            <option value={1}>One</option>
            <option value={2}>Two</option>
            <option value={3}>Three</option>
            <option value={4}>Four</option>
            <option value={5}>Five</option>
            <option value={6}>Six</option>
           </Form.Control>
  </Form.Group>
        <p></p>
          <Form.Label as='Row'>Select color</Form.Label>
          <Form.Check 
        type="radio"
        value="w"
        checked={this.state.color === "w"}
        onChange={this.handleColorChange}
        id='white'
        label='White'
      />
     <Form.Check 
        type="radio"
        value="b"
        checked={this.state.color === "b"}
        onChange={this.handleColorChange}
        id='black'
        label='Black'
      />
        
          <Form.Group as={Row} controlId="Play" className="text-center">
          <Col style={{width: "10%"}}/>
			<Col><Button variant="primary" type="submit" style={{width: "40%"}} className="btn btn-primary">Play now</Button></Col>
			<Col style={{width: "10%"}}/>
				  </Form.Group>
       </Form>
        </Container>
		</Fragment>
	}

    {this.state.show_game &&
		<Fragment>
		 
		<ChessGame showHome={this.props.showHome} playerColor={this.state.color} level={this.state.level} endGameCallback={this.endGame}/>
		
		</Fragment>
	}
      </div>  );
}


}
export default GameOptions;
