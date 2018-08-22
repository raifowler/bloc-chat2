import React, { Component } from "react";
import RoomList from "../rooms/RoomList";
import MessageList from "../messages/MessageList";

import { roomsRef } from "../../config/constants";

// import * as firebase from "firebase";

// var firebaseConfig = {
//   apiKey: "AIzaSyBl3ucs5y9V7UQvFRC623o7aR_TFHTb6f8",
//   authDomain: "bloc-chat-ec971.firebaseapp.com",
//   databaseURL: "https://bloc-chat-ec971.firebaseio.com",
//   projectId: "bloc-chat-ec971",
//   storageBucket: "bloc-chat-ec971.appspot.com",
//   messagingSenderId: "698791447804"
// };
// firebase.initializeApp(firebaseConfig);

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      showNewRoom: false,
      newRoomName: "",
      activeRoom: "",
      activeRoomName: ""
    };

    // this.roomsRef = firebase.database().ref("rooms");
  }

  handleClick = () => {
    this.setState({ showNewRoom: !this.state.showNewRoom });
  };

  handleClickActive = (roomId, roomName) => {
    this.setState({ activeRoom: roomId, activeRoomName: roomName });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.roomsRef.push({
      name: this.state.newRoomName
    });

    this.setState({ newRoomName: "" });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    // this.roomsRef.on("child_added", snapshot => {
    roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  render() {
    const {
      rooms,
      showNewRoom,
      newRoomName,
      activeRoom,
      activeRoomName
    } = this.state;

    return (
      <div className="row h-100">
        <div className="col-md-3">
          <RoomList
            rooms={rooms}
            showNewRoom={showNewRoom}
            newRoomName={newRoomName}
            handleClick={this.handleClick}
            handleClickActive={this.handleClickActive}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        </div>
        <div className="col-md-9">
          <MessageList
            // firebase={firebase}
            activeRoom={activeRoom}
            activeRoomName={activeRoomName}
          />
        </div>
      </div>
    );
  }
}

export default Dashboard;
