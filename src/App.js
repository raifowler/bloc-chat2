import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import * as firebase from "firebase";

import Dashboard from "./components/layout/Dashboard";

import "./App.css";

var firebaseConfig = {
  apiKey: "AIzaSyBl3ucs5y9V7UQvFRC623o7aR_TFHTb6f8",
  authDomain: "bloc-chat-ec971.firebaseapp.com",
  databaseURL: "https://bloc-chat-ec971.firebaseio.com",
  projectId: "bloc-chat-ec971",
  storageBucket: "bloc-chat-ec971.appspot.com",
  messagingSenderId: "698791447804"
};
firebase.initializeApp(firebaseConfig);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
              <Link to="/" className="navbar-brand">
                Bloc Chat
              </Link>
            </div>
          </nav>
          <main>
            <div className="container-fluid">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => <Dashboard {...props} firebase={firebase} />}
                />
              </Switch>
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
