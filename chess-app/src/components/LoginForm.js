import React,{Component} from 'react';
import axios from 'axios';

//const login_url = 'api/v1/rest-auth/login/';
//const login_url = 'api/v1/rest-auth/login/';
const hello_url =  'chess/hello/'
const login_url = 'chess/login/'
const signup_url = 'chess/signup/'
const user_url = 'chess/user/'
const session_url = 'chess/session/'
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
		  	<div>
		  	<h1>Login</h1>
				<form onSubmit={this.submit}>
				  <label>
				    User Name:
				    <input id="username" name="username" type="text" />
				  </label>

				  <label>
				    Password:
				    <input id="password" name="password" type="password" />
				  </label>

				  <input type="submit" value="Submit" />
				</form>

				{/*<button onClick={this.helloClick}>Hello</button>
				<button onClick={this.sessionClick}>Session</button>*/}
			
			<h1>Signup</h1>
				<form onSubmit={this.submit_signup}>
				  <label>
				    User Name:
				    <input id="username" name="username" type="text" />
				  </label>

				  <label>
				    Password:
				    <input id="password1" name="password1" type="password" />
				  </label>

				  <label>
				    Password again:
				    <input id="password2" name="password2" type="password" />
				  </label>

				  <input type="submit" value="Submit" />
				</form>

			</div>
		)
	}
}

export default LoginForm;