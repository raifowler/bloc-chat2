import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

import Dashboard from "./components/layout/Dashboard";
import Login from "./components/layout/Login";
// import User from "./components/auth/User";

import "./App.css";
import { firebaseAuth, provider } from "./config/constants";

function PrivateRoute({ component: Component, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        user !== null ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}

// PublicRoute = ({component: Component, user, ...rest}) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) => user === null
//         ? <Component {...props} />
//         : <Redirect to='/' />}
//     />
//   )
// }

class App extends Component {
  state = {
    user: null,
    loading: true
  };

  componentDidMount() {
    this.removeListener = firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user,
          loading: false
        });
      } else {
        this.setState({
          user: null,
          loading: false
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  // setUser = () => {
  //   let user = firebaseAuth.currentUser;

  //   this.setState({ user: user });

  // if (user !== null) {
  //   this.setState({
  //     user: user
  //   });
  // } else {
  //   this.setState({
  //     user: user
  //   });
  // }
  // };

  onClickSignIn = e => {
    e.preventDefault();
    firebaseAuth.signInWithPopup(provider);
  };

  onClickSignOut = e => {
    e.preventDefault();
    firebaseAuth.signOut();
  };

  // <User
  //   user={user}
  //   setUser={this.setUser}
  //   onClickSignIn={this.onClickSignIn}
  //   onClickSignOut={this.onClickSignOut}
  // />

  render() {
    const { user, loading } = this.state;
    return loading === true ? (
      <h1>Loading</h1>
    ) : (
      <Router>
        <div className="h-100">
          <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
              <Link to="/dashboard" className="navbar-brand">
                Bloc Chat
              </Link>
              {user !== null ? (
                <div className="justify-content-end h-100">
                  <span className="nav-item text-light mx-4">
                    {user.displayName}
                  </span>
                  <button
                    className="nav-item btn"
                    onClick={this.onClickSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  className="nav-item btn justify-content-end"
                  onClick={this.onClickSignIn}
                >
                  Sign In
                </button>
              )}
            </div>
          </nav>
          <main className="h-100">
            <div className=" container-fluid h-100 ">
              {user !== null ? <Dashboard user={user} /> : <Login />}
              <Switch>
                <Route exact path="/login" component={Login} />
                <PrivateRoute
                  user={user}
                  exact
                  path="/dashboard"
                  component={Dashboard}
                />
              </Switch>
            </div>
          </main>
        </div>
      </Router>
    );

    // let home = "";

    // if (user !== null) {
    //   home = (
    //     <div className="container-fluid h-100">
    //       <Switch>
    //         <Route exact path="/" component={Dashboard} />
    //       </Switch>
    //     </div>
    //   );
    // } else {
    //   home = (
    //     <div className="container-fluid h-100 text-center">Please sign in</div>
    //   );
    // }

    // return (
    //   <Router>
    //     <div className="h-100">
    //       <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    //         <div className="container-fluid">
    //           <Link to="/" className="navbar-brand">
    //             Bloc Chat
    //           </Link>
    //           <User
    //             user={user}
    //             setUser={this.setUser}
    //             onClickSignIn={this.onClickSignIn}
    //             onClickSignOut={this.onClickSignOut}
    //           />
    //         </div>
    //       </nav>
    //       <main className="h-100">
    //         {home}
    //         {/* <div className="container-fluid h-100">
    //           <Switch>
    //             <Route exact path="/" component={Dashboard} />
    //           </Switch>
    //         </div> */}
    //       </main>
    //     </div>
    //   </Router>
    // );
  }
}

export default App;
