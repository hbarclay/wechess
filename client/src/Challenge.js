import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';


class Challenge extends Component {
  constructor(props) {
    super (props);

    this.state = {
      id: "",
      wager: 0,
      timeControl: ""
    }

    this.payWager = this.payWager.bind(this);
  }

  componentDidMount() {
    this.setState(state => { return ({id: this.props.match.params.id}); });

    // FIXME: Should this be here? I think yes
    axios.get('http://localhost:4000/api/' + this.props.match.params.id)
      .then(res => {
        console.log(res.data);
        this.setState(state => { return (res.data);});
      });
  }

  payWager() {
    // TODO: Web3 and WS stuff here
  }

  render() {
      return (
        <>
        <header>
          Give this url to a friend: {window.location.href}
        </header>
          Challenge details:
            <p>Wager: {this.state.wager}</p>
            <p>Time control: {this.state.timeControl}</p>
        <p>
          <button onClick={this.payWager}> Pay Wager/Start Game </button>
        </p>
        </>
      );
  }
}

export default withRouter(Challenge);
