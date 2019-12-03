
import React, { Component } from 'react'

const URL = 'ws://127.0.0.1:8000/ws/players/'

class Messenger extends Component {
constructor(props){
   super(props);
}

  state = {
    message_to_send: 'Message No. 0',
    messages_recieved: [],
    token: "",
    SessionKey:"DefaultMessenger",
  }

  ws = new WebSocket(URL);

  componentDidMount() {
    this.ws.onopen = () => {
      console.log('connected');
      console.log('SessionKey in Messenger open',this.props.SessionKey);
      this.setState({SessionKey:this.props.SessionKey});
      const message = { SessionKey: this.props.SessionKey, message: "New key"}
      console.log(message);
      this.ws.send(JSON.stringify(message))

    }

    this.ws.onmessage = (evt) => {
      const message = JSON.parse(evt.data);
      var messages_recieved=this.state.messages_recieved
      messages_recieved.push(message);
      this.setState({
        messages_recieved: messages_recieved,
      });
      console.log(messages_recieved);
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      this.setState({
        ws: new WebSocket(URL)
      })
    }
  }

  submitMessage = (evt) => {
    //console.log("token in Messenger=",this.props.token);
          console.log(window.localStorage.getItem('SessionKey'))
    evt.preventDefault();
    console.log('SessionKey in Messenger submit',this.props.SessionKey);
    const message = { SessionKey: this.props.SessionKey, message: this.state.message_to_send}
    //console.log(message)
    this.ws.send(JSON.stringify(message))
  }

  handleChange = (evt) => {
    this.setState({message_to_send: evt.target.value});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitMessage}>
        <label>
          Message:
          <input type="text" value={this.state.message_to_send} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}

export default Messenger;
