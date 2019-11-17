import React,{Component} from 'react';
import ChessboardValid from './components/chessboardValid.js';
import LoginForm from './components/LoginForm.js'
//import Messenger from './components/Messenger.js'
import Home from './components/Home.js'
import logo from './logo.svg';
import './App.css';
//import {AuthProvider,AuthConsumer} from "react-check-auth";
import axios from 'axios';
import Websocket from 'react-websocket';
//import Reducer from './reduxes.js'



const user_url = 'api/v1/rest-auth/user/'
const logged_in_check_url = 'api/v1/users/logged-in/'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

class App extends Component{
state = {
    message_to_send: 'Message No. 0',
    messages_recieved: [],
    token:"",
    logged_in: false,
    SessionKey:"DefaultAppjs",
  }

constructor(props){
   super(props);
  //this.refWebSocket = React.createRef();
}

componentDidMount(){
  console.log("componentDidMount token=",this.state.token);
    axios.get(logged_in_check_url)
      .then(response => {
      console.log(response);
      this.setState({logged_in: true});
  });
}

handleData =(data)=> {
      let result = JSON.parse(data);
      console.log(data);
    }



setLoggedIn = (logged_in) =>{
  this.setState({logged_in:logged_in});
}

setSessionKey = (SessionKey) =>{
  this.setState({SessionKey:SessionKey});
  //window.localStorage.setItem("SessionKey",this.state.SessionKey);
  console.log(this.state);
  console.log("SessionKey from appjs",SessionKey);
}

render() {
  return (
    <div className="App">
    {/*<AuthProvider authUrl={user_url}/>*/}
    {/* <ChessboardValid/> */}
    {!this.state.logged_in &&
      <LoginForm setTokenCallback={this.setToken} setLoggedInCallback={this.setLoggedIn} setSessionKeyCallback={this.setSessionKey}/>
    }

    {/*this.state.logged_in &&
      <Messenger token={this.state.token} SessionKey={this.state.SessionKey}/>
    */}
    {this.state.logged_in &&
    <Home setLoggedInCallback={this.setLoggedIn}/>
  }


    </div>

  );}
}
export default App;