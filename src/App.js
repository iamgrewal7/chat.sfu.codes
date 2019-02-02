import React, { Component } from 'react';
import AWS from 'aws-sdk';
import './App.css';
import io from 'socket.io-client';


class App extends Component {
  state = {
    field:'',
    messages:[]
  }

  componentWillMount(){
    this.socket = io.connect('http://localhost:8000');
    this.socket.on('message',this.handleMessage);
    AWS.config.update({
      region: "us-east-2",
      accessKeyId: "AKIAJ57U7P6OM2J2YTDA",
      secretAccessKey: "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"
    });
    this.docClient = new AWS.DynamoDB.DocumentClient();
    this.params = {
      TableName: 'Chats',
    }
    this.docClient.scan(this.params,this.onScan);
  }

  onScan = (err, data) => {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // print all the movies
        console.log("Scan succeeded.");
        data.Items.forEach( message => {
          const messages = {
            id: message.id,
            value: message.Msg,
          }
           this.setState(state => ({
            field: '',
            messages: state.messages.concat(messages)
          }))
        });

        // continue scanning if we have more movies, because
        // scan can retrieve a maximum of 1MB of data
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            this.params.ExclusiveStartKey = data.LastEvaluatedKey;
            this.docClient.scan(this.params, this.onScan);
        }
    }
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
    var id = dt.getTime();
    const message = {
      id: dt.getTime(),
      value: this.state.field,
    }

    var params = {
      TableName: 'Chats',
      Item:{
        'Msg': message.value,
        'Id':id
      }
    }
    this.docClient.put(params, (err,data) =>{
      if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
    })

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
