import React, { Component } from "react";
import RoomList from "../rooms/RoomList";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      showNewRoom: false,
      newRoomName: "",
      activeRoom: null
    };

    this.roomsRef = this.props.firebase.database().ref("rooms");
    this.roomMessagesRef = this.props.firebase
      .database()
      .ref("messages/" + this.state.activeRoom);
  }

  handleClick = () => {
    this.setState({ showNewRoom: !this.state.showNewRoom });
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

  // populateMessages = () => {
  //   const { activeRoom } = this.state;

  //   const loadingMessage = (

  //   )

  //   if(activeRoom === !null) {
  //     this.componentDidMount() {
  //       this.roomMessagesRef.on("child_added", snapshot => {
  //         console.log(snapshot)
  //       })
  //     }
  //   } else {
  //     return
  //   }
  // }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  render() {
    const { rooms, showNewRoom, newRoomName } = this.state;

    return (
      <div className="row">
        <div className="col-md-3">
          <RoomList
            rooms={rooms}
            showNewRoom={showNewRoom}
            newRoomName={newRoomName}
            handleClick={this.handleClick}
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
