import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import subscribeToTimer from './api.js';


class App extends Component {

   constructor(props) {
  	super(props);
  	subscribeToTimer((err, timestamp) => this.setState({ 
    		timestamp 
  	}));
}


  state  = {timestamp:'Nothing yet'};
  render() {
    return (
      <div className="App">
          <h1>{this.state.timestamp}</h1>
      </div>
    );
  }
}

export default App;
