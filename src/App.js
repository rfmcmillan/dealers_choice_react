import React, { Component } from 'react';
import axios from 'axios';
import Owners from './Owners';
import Form from './Form';

class App extends Component {
  constructor() {
    super();
    this.state = {
      owners: [],
      loading: true,
    };
  }

  async componentDidMount() {
    this.setState({
      owners: (await axios.get('/api/owners')).data,
      loading: false,
    });
  }

  async componentDidUpdate() {
    this.setState({
      owners: (await axios.get('/api/owners')).data,
      loading: false,
    });
  }

  render() {
    if (this.state.loading === true) {
      return '...loading';
    } else {
      return (
        <div>
          <Owners owners={this.state.owners} />
          <Form />
        </div>
      );
    }
  }
}

export default App;
