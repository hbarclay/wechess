import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';


class Home extends Component {

  constructor (props) {
    super(props);
    this.state = {message: "",
                  wager: 0,
                  clocklimit: 3,
                  clockincrement: 5,
                  variant: "",
                  rand: false,
                  white: false};

    this.createChallenge = this.createChallenge.bind(this);
  }

  createChallenge(e) {

    const challengeParams = {
      wager: this.state.wager,
      clocklimit: this.state.clocklimit,
      clockincrement: this.state.clockincrement,
      rand: this.state.rand,
      white: this.state.white
    };

    axios.post('http://localhost:4000/api/challenge', challengeParams)
        .then(res => {
          // TODO: handle error response, check that all requests handle errors
          this.props.history.push('/' + res.data.challenge.id);
        });
  }

  render () {
    return (
      <div className="Home">
        <header className="Home-header">
        LichessBetting
        </header>
        <label>
          Time (min):
          <input value={this.state.clocklimit} onChange={e => this.setState({clocklimit: e.target.value.replace(/\D/,'')})}/>

        </label>

        <label>
          Increment (s):

          <input value={this.state.clockincrement} onChange={e => this.setState({clockincrement: e.target.value.replace(/\D/,'')})}/>
        </label>

        <button onClick={this.createChallenge}> Create Challenge </button>

        <a>{this.state.message}</a>

      </div>
    );
  }

}

export default withRouter(Home);
