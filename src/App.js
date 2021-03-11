import React, { Component } from 'react';
import axios from 'axios';
import Owner from './Owner';
import Form from './Form';

class App extends Component {
  constructor() {
    super();
    this.state = {
      owners: [],
      loading: true,
      selectedOwnerId: '',
    };
  }

  async componentDidMount() {
    this.setState({
      owners: (await axios.get('/api/owners')).data,
      loading: false,
    });
    this.setState({ selectedUserId: window.location.hash.slice(1) });
    window.addEventListener('hashchange', () => {
      this.setState({ selectedOwnerId: window.location.hash.slice(1) });
    });
  }

  render() {
    const { loading, owners, selectedOwnerId } = this.state;
    if (loading === true) {
      return '...loading';
    } else {
      return (
        <div id="container">
          <h2>Owners</h2>

          <div id="owner-info">
            <div>
              <Form />
            </div>
            <div>
              <ul>
                {owners.map((owner, index) => {
                  return (
                    <li key={index}>
                      <a href={`#${owner.id}`}>
                        {owner.firstName} {owner.lastName}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              {!!selectedOwnerId ? (
                <Owner owner={owners[selectedOwnerId - 1]} />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
