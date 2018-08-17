import React, { Component } from "react";
import RoomList from "../rooms/RoomList";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: ""
    };

    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

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
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-3">
          <RoomList
            rooms={this.state.rooms}
            newRoomName={this.state.newRoomName}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        </div>
        <div className="col-md-9">
          <h1>Messages will appear here</h1>
        </div>
      </div>
    );
  }
}

export default Dashboard;
