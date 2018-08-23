import React, { Component } from "react";
import { firebaseAuth } from "../../config/constants";

class User extends Component {
  componentDidMount() {
    const { setUser } = this.props;

    firebaseAuth.onAuthStateChanged(user => {
      setUser(user);
    });
  }

  // componentDidUpdate() {
  //   const { setUser } = this.props;

  //   firebaseAuth.onAuthStateChanged(user => {
  //     setUser(user);
  //   });
  // }

  render() {
    const { user, onClickSignIn, onClickSignOut } = this.props;

    if (user === null) {
      return (
        <button
          className="nav-item btn justify-content-end"
          onClick={onClickSignIn}
        >
          Sign In
        </button>
      );
    } else {
      return (
        <button
          className="nav-item btn justify-content-end"
          onClick={onClickSignOut}
        >
          Sign Out
        </button>
      );
    }
  }
}

export default User;
