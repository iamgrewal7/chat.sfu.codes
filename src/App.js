import React, { Component } from 'react';

import './App.css';
import io from 'socket.io-client';


class App extends Component {
  state = {
    field:'',
    messages:[]
  }

  componentWillMount(){
    this.socket = io.connect('http://localhost:8000');
    this.socket.on('connect', () =>{
      console.log("A user Connected");
    })
    this.socket.on('message',this.handleMessage);
    
  }

  handleMessage = (message) => {
    this.setState(state => ({ messages: state.messages.concat(message) }))
  }

  handleChange = event => {
    this.setState({ field: event.target.value });
  }

  handleSubmit = event =>{
    event.preventDefault()
    var dt = new Date();
    const message = {
      id: dt.getTime(),
      value: this.state.field,
    }

    this.socket.emit('message',message)

    this.setState(state => ({
      field: '',
      messages: state.messages.concat(message)
    }))


  }


  render() {
    return (
      <div className="App">
          <ul>
            {this.state.messages.map(message =>
              <li key={message.id}>{message.value}</li>
            )}
          </ul>
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleChange}
              type="text"
              placeholder="Hello world!"
              value={this.state.field}
            />
            <button>Send</button>
          </form>
      </div>
    );
  }
}

export default App;
