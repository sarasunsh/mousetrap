import React from 'react';


class Message extends React.Component{
    render(){
        return(
            <li className="message">{this.props.msg}
            </li>
        )
    }
};

// Input form for messages with event handler for change and submit
// Receives submitFunc as a prop from Chatty
export default class MessageList extends React.Component {
    render(){
        console.log(this.props)
        const renderMessage = function(message){
            return <Message msg={message.text} />
        }

        return(
          <div className="messageList">
            <ul>
                {this.props.messages.map(renderMessage)}
            </ul>
          </div>
        )
    }
};


