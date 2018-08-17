import React, { Component } from "react";

class RoomList extends Component {
  state = {
    showNewRoom: false
  };

  render() {
    const { rooms, handleSubmit, handleChange, newRoomName } = this.props;
    const { showNewRoom } = this.state;

    let newRoomForm = "";

    // If new room form should display
    if (showNewRoom) {
      newRoomForm = (
        <form onSubmit={handleSubmit} className="mb-1">
          <div className="input-group">
            <input
              type="text"
              name="newRoomName"
              className="form-control"
              placeholder="Room name"
              onChange={handleChange}
              value={newRoomName}
            />
            <div className="input-group-append">
              <input
                type="submit"
                value="Add Room"
                className="btn btn-outline-success"
              />
            </div>
          </div>
        </form>
      );
    } else {
      newRoomForm = null;
    }

    if (rooms) {
      return (
        <div>
          <div className="col">
            <div className="mb-3">
              <h5>
                <span>Chat Rooms</span>
                <span>
                  <a
                    href="#!"
                    onClick={() =>
                      this.setState({ showNewRoom: !this.state.showNewRoom })
                    }
                    className="float-right"
                  >
                    <i className="fas fa-plus" />
                  </a>
                </span>
              </h5>
              {newRoomForm}
              <ul className="list-group list-group-flush">
                {rooms.map(room => (
                  <li
                    key={room.key}
                    className="list-group-item list-group-item-action"
                  >
                    {room.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <h4>Loading...</h4>;
    }
  }
}

export default RoomList;
