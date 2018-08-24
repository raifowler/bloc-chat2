import React, { Component } from "react";

import { messagesRef } from "../../config/constants";
import firebase from "firebase";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      roomMessages: [],
      messageContent: ""
    };

    this.messageContainer = React.createRef();

    // this.roomMessagesRef = this.props.firebase.database().ref("messages");
  }

  handleMessageSend = e => {
    const { messageContent } = this.state;

    e.preventDefault();

    messagesRef.push({
      username: this.props.user.displayName,
      content: messageContent,
      roomId: this.props.activeRoom,
      sentAt: firebase.database.ServerValue.TIMESTAMP
    });

    this.setState({
      messageContent: ""
    });
  };

  handleContentChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  currentDateTime = milliseconds => {
    let dateTime = new Date(milliseconds);

    let month = dateTime.getMonth();
    let date = dateTime.getDate();
    let year = dateTime.getFullYear();
    let hours = dateTime.getHours();

    let amPm = "AM";
    let hoursClock = hours;

    if (hours >= 12) {
      hoursClock = hours - 12;
      amPm = "PM";
    }

    if (hours === 0) {
      hoursClock = 12;
    }

    let minutes = dateTime
      .getMinutes()
      .toString()
      .padStart(2, "0");

    return `${month + 1}/${date}/${year} ${hoursClock}:${minutes} ${amPm}`;
  };

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

  componentDidUpdate(prevProps, prevState) {
    const { activeRoom } = this.props;
    const { messages } = this.state;

    if (
      prevProps.activeRoom !== activeRoom ||
      prevState.messages !== messages
    ) {
      let newRoomMessages = messages.filter(
        message => message.roomId.toString() === activeRoom
      );

      this.setState({
        roomMessages: newRoomMessages
      });
    }
  }

  componentWillUnmount() {
    messagesRef.off();
  }

  render() {
    const { activeRoom, activeRoomName } = this.props;
    const { roomMessages, messageContent } = this.state;

    if (activeRoom !== "") {
      return (
        <div className="h-75 card">
          <h5 className="text-center card-header">{activeRoomName}</h5>
          <div className="card-body" id="message-container">
            <ul className=" list-group list-group-flush align-text-bottom">
              {roomMessages.map(message => (
                <li key={message.key} className="list-group-item">
                  <div className="d-block">
                    <span className="font-weight-bold">{message.username}</span>
                    <span className="float-right font-weight-light">
                      {this.currentDateTime(message.sentAt)}
                    </span>
                  </div>
                  <div className="d-block">{message.content}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-footer">
            <form onSubmit={this.handleMessageSend} className="mb-1">
              <div className="input-group">
                <input
                  type="text"
                  name="messageContent"
                  className="form-control"
                  placeholder="Enter message"
                  onChange={this.handleContentChange}
                  required
                  value={messageContent}
                />
                <div className="input-group-append">
                  <input
                    type="submit"
                    value="Send"
                    className="btn btn-outline-primary"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return <h5 className="text-center">Select a chat room</h5>;
    }
  }
}

export default MessageList;
