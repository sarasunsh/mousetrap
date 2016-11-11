import React from 'react';
import MessageList from './MessageList';
import MessageForm from './MessageForm';

import io from 'socket.io-client'
let socket = io(`http://localhost:1337`);


export default class Chatroom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            text: ''
        }
        this.messageReceive = this.messageReceive.bind(this);
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    }

    componentDidMount() {
        // socket.on('init', this._initialize);
        socket.on('send:message', this.messageReceive);
        socket.on('newMsg', this.messageReceive)
        // socket.on('user:join', this._userJoined);
        // socket.on('user:left', this._userLeft);
        // socket.on('change:name', this._userChangedName);
    }

     // Push the incoming message into the messages array and refresh the state variables
    messageReceive(message){
        console.log('other message')
        const { messages } = this.state;
        messages.push(message);
        this.setState({ messages });
    }

    // Push the message to the server using socket emit
    handleMessageSubmit(message){
        const {messages} = this.state;
        messages.push(message);
        this.setState({messages});
        socket.emit('send:message', message);
    }

    render () {
        return (
            <div className="chatty">
                <button onClick={() => socket.emit('clicked')}>socket</button>
                <MessageList messages={this.state.messages}/>
                <MessageForm submitFunc={this.handleMessageSubmit}/>
            </div>

        )
    }
}
