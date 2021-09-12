import React , { Component } from 'react';
import ws from 'websocket';

const client = new ws.w3cwebsocket('ws://localhost:5000/', 'echo-protocol');

class App extends Component {

  constructor() {
    super();
    this.state = {
      message: '', // set the current message state
      messages: [], // list of all messages
    };
    this.handleSendClick = this.handleSendClick.bind(this);
  }

  componentDidMount() {
    // set up the connect event listener
    client.onopen = () => {
      console.log('WebSocket client connected');
    }

    // set up the event listener for when the connection is closed
    client.onclose = () => {
      console.log('Client connection closed!');
    };

    // set up the event listener for when a message is received
    client.onmessage = (message) => {
      const { messages } = this.state;
      if (typeof message.data === 'string') {
        this.setState({ messages: [`${new Date()}: ${message.data}`, ...messages] });
      }
    };

     // set up the event listener for when there is an error
    client.onerror = (error) => {
      console.log(`Connection error: ${error.toString()}`);
    }
  }

  // handler function for sending a message
  handleSendClick() {
    const { message } = this.state;
    // send a message
    if (client.readyState === client.OPEN) {
      client.send(message);
    }
  }

  render() {
    const { message, messages } = this.state;
    return (
      <div>
        <div>
         <h1>Messages</h1>
         {
           messages.map((eachMessage, index) => (
             <div key={index}>{eachMessage}</div>
           ))
         }
        </div>
        <input type="text" placeholder="Message" onChange={(e) => this.setState({ message: e.target.value })} value={message} />
        <button onClick={this.handleSendClick}>Send</button>
      </div>
     );
  }
}

export default App;
