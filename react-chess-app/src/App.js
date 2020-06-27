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
import './index.css'


const csrf_url = 'csrf/'
const logged_in_check_url = 'logged-in/'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

let _csrfToken = null;

async function getCsrfToken() {
  if (_csrfToken === null) 
  axios.get(csrf_url)
  .then(response => {
  console.log(response);
  _csrfToken = response.data.csrfToken;
});
axios.defaults.headers.common['X-CSRFTOKEN'] = _csrfToken;
  return _csrfToken;
}

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
  getCsrfToken()
  console.log("componentDidMount token=",this.state.token);
    axios.post(logged_in_check_url)
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
    <div >
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