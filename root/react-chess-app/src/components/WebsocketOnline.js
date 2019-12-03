import React,{Component} from 'react';

class WebsocketOnline extends Component{
ws = new WebSocket('ws/players/');
}


export default WebsocketOnline;