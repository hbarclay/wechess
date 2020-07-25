// TODO: SSR
import React, {Component} from 'react';
import axios from 'axios';
import {
  withRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Home from './Home';
import Challenge from './Challenge';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>

        <Switch>
          <Route path={'/:id'}>
            <Challenge />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
