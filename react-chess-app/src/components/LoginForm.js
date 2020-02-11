import React,{Component} from 'react';
import axios from 'axios';
import { Button,Form,Row, Col, Container } from 'react-bootstrap';


//const login_url = 'api/v1/rest-auth/login/';
//const login_url = 'api/v1/rest-auth/login/';
const hello_url =  'hello/'
const login_url = 'login/'
const signup_url = 'signup/'
const user_url = 'user/'
const session_url = 'session/'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

class LoginForm extends Component{
constructor(props){
   super(props);
}

	state={
		token: "",
		SessionKey: "",
		logged_in: false,
	}

	submit = (event) => {

		event.preventDefault();
		const data = {username: event.target.username.value,
		password: event.target.password.value}
    	//const data = new FormData(event.target);
    	console.log(data)
    	console.log(event.target.username.value);

    	axios.post(login_url, data)
		.then((response) => {
		this.setState({token:response.data.key});
		  console.log(response);
		  //this.props.setTokenCallback(response.data.key);
		  this.getSessionKey();
		  this.setState({logged_in:true});
		  this.props.setLoggedInCallback(true);
		  
		}, (error) => {
		  console.log(error);
		});



	}


	submit_signup = (event) => {

		event.preventDefault();
		const data = {username: event.target.username.value,
		password1: event.target.password1.value, password2: event.target.password2.value}
    	//const data = new FormData(event.target);
    	//console.log(data)
    	//console.log(event.target.username.value);
    	axios.post(signup_url, data)
		.then((response) => {
		//this.setState({token:response.data.key});
		  console.log(response);
		  //this.props.setTokenCallback(response.data.key);
		  //this.getSessionKey();
		  this.setState({logged_in:true});
		  this.props.setLoggedInCallback(true);
		  
		}, (error) => {
		  console.log(error);
		});



	}


	getSessionKey = ()=>{
		axios.get(session_url)
  		.then(response => {
    	console.log(response.data);
    	this.setState({SessionKey:response.data.SessionKey});
		console.log("SessionKey from login",response.data.SessionKey)
		this.props.setSessionKeyCallback(response.data.SessionKey);
		})
	}

	sessionClick = (event) => {
		console.log("YAAA");
		axios.get(session_url)
  		.then(response => {
    	console.log(response.data);
		})
	}

	helloClick = (event) => {
		console.log("YAAA");
		axios.get(hello_url)
  		.then(response => {
    	console.log(response.data);

    	axios.get(user_url, {
       headers: {"Aothorization":'Bearer' +this.state.token}
    })
      .then(response => {
      console.log(response);
  })
  });
	}

	render() {
		  return (
		  	<div className="text-center">
		  	<h2>Play Chess!</h2>
		  	<Container className="text-center" style={{width: "50%"}}>
				<Form onSubmit={this.submit}>
				<Form.Group as={Row} controlId="username">
				    <Form.Control type="text" placeholder="User Name"/>
				  </Form.Group>
				  <Form.Group as={Row} controlId="password">
				   <Form.Control type="password" placeholder="Password"/>
				  	</Form.Group>
				  	<Form.Group as={Row}  controlId="submitLogin">
				  	<Col style={{width: "10%"}}/>
				  	<Col>
				  <Button variant="primary" type="submit" className="text-center" style={{width: "250px"}}>Login</Button>
				  </Col>
				  <Col  style={{width: "10%"}}/>
				  </Form.Group>
				</Form>
				</Container>
				{/*<button onClick={this.helloClick}>Hello</button>
				<button onClick={this.sessionClick}>Session</button>*/}
			<Container className="text-center" style={{width: "50%"}}>
				<Form onSubmit={this.submit_signup}>
				<Form.Group as={Row} controlId="username">
				    <Form.Control type="text" placeholder="User name"/>
				  </Form.Group>

				  <Form.Group as={Row} controlId="password1" >
				   <Form.Control type="password" placeholder="Password"/>
				   </Form.Group>

				  <Form.Group as={Row} controlId="password2">
				   <Form.Control type="password" placeholder="Repeat password"/>
				   </Form.Group>

				  <Form.Group as={Row} controlId="submitSignup">
				  <Col  style={{width: "10%"}}/>
				  <Col>
				  <Button variant="primary" type="submit" className="btn btn-primary" style={{backgroundColor:'#B9732F', width: "250px"}}>Signup</Button>
				  </Col>
				  <Col  style={{width: "10%"}}/>
				  </Form.Group>
				</Form>

</Container>

			</div>
		)
	}
}

export default LoginForm;