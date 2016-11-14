import React from 'react';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import UsersList from './UsersList';

import { Col, Panel } from 'react-bootstrap';

import io from 'socket.io-client'
let socket = io(`http://localhost:1337`);


export default class Chatroom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            user: '',
            messages: [],
            text: ''
        }
        this.initialize = this.initialize.bind(this);
        this.messageReceive = this.messageReceive.bind(this);
        this.userJoined = this.userJoined.bind(this);
        this.userLeft = this.userLeft.bind(this);
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    }

    componentDidMount() {
        socket.on('init', this.initialize);
        socket.on('newMsg', this.messageReceive)
        socket.on('user:join', this.userJoined);
        socket.on('user:left', this.userLeft);
        // socket.on('change:name', this._userChangedName);
    }

    initialize(data) {
        const {users, name} = data;
        this.setState({users, user: name});
        console.log(this.state)
    }

     // Push the incoming message into the messages array and refresh the state variables
    messageReceive(message){
        const { messages } = this.state;
        messages.push(message);
        this.setState({ messages });
    }

    userJoined(data) {
        const {users, messages} = this.state;
        const {name} = data;
        users.push(name);
        messages.push({
            user: 'CHATBOT',
            text : name +' joined the room'
        });
        this.setState({users, messages});
    }

    userLeft(data) {
        var {users, messages} = this.state;
        var {name} = data;
        var index = users.indexOf(name);
        users.splice(index, 1);
        messages.push({
            user: 'CHATBOT',
            text : name +' has left the room'
        });
        this.setState({users, messages});
    }

    // Push the message to the server using socket emit
    handleMessageSubmit(message){
        const {messages} = this.state;
        messages.push(message);
        this.setState({messages});
        socket.emit('send:message', message);
    }

    render () {
        // const cssPadding = {
        //     padding: 10px
        // }

        return (
            <div className="chatty">
                <Col xs={6} className="test">
                    <Panel header="Messages" bsStyle="primary">
                        <MessageList
                            messages={this.state.messages}
                        />
                    </Panel>
                    <MessageForm
                        submitFunc={this.handleMessageSubmit}
                        user={this.state.user}
                    />
                </Col>
                <Col xs={6}>
                    <Panel header="Users currently online" bsStyle="info">
                        <UsersList
                            users={this.state.users}
                            user={this.state.user}
                        />
                    </Panel>

                </Col>
            </div>
        )
    }
}
