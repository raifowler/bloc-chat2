import React, { Component } from "react";
import classnames from "classnames";

class RoomList extends Component {
  render() {
    const {
      rooms,
      showNewRoom,
      newRoomName,
      handleClick,
      handleSubmit,
      handleChange,
      handleClickActive
    } = this.props;

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
              required
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
          <div className="mb-3">
            <h5>
              <span>Chat Rooms</span>
              <span>
                <a href="#!" onClick={handleClick} className="float-right">
                  <i
                    className={classnames({
                      "fas fa-plus": showNewRoom === false,
                      "fas fa-minus": showNewRoom === true
                    })}
                  />
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
                  <a
                    className="btn btn-link"
                    onClick={() => {
                      handleClickActive(room.key, room.name);
                    }}
                  >
                    {room.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    } else {
      return <h4>Loading...</h4>;
    }
  }
}

export default RoomList;
