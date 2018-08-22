import React, { Component } from "react";

import { messagesRef } from "../../config/constants";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      roomMessages: []
    };

    // this.roomMessagesRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    // this.roomMessagesRef.on("child_added", snapshot => {
    messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;

      this.setState({
        messages: this.state.messages.concat(message)
      });
    });
  }

  componentDidUpdate(prevProps) {
    const { activeRoom } = this.props;
    const { messages } = this.state;

    if (prevProps.activeRoom !== activeRoom) {
      let newRoomMessages = messages.filter(
        message => message.roomId.toString() === activeRoom
      );

      this.setState({
        roomMessages: newRoomMessages
      });
    }
  }

  render() {
    const { activeRoom, activeRoomName } = this.props;
    const { roomMessages } = this.state;

    if (activeRoom !== "") {
      return (
        <div className="h-75 card">
          <h5 className="text-center card-header">{activeRoomName}</h5>
          <div className="card-body">
            <ul className=" list-group list-group-flush align-text-bottom">
              {roomMessages.map(message => (
                <li key={message.key} className="list-group-item">
                  <span className="font-weight-bold">{message.username}</span> :{" "}
                  {message.content}
                </li>
              ))}
            </ul>
          </div>
          <div className="card-footer">Type New Message Here</div>
        </div>
      );
    } else {
      return <h5 className="text-center">Select a chat room</h5>;
    }
  }
}

export default MessageList;
