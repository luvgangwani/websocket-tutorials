import React , { useEffect } from 'react';
import ws from 'websocket';

const client = new ws.w3cwebsocket('ws://localhost:5000/', 'echo-protocol');

function App() {
  useEffect(() => {
    // set up the connect event listener
    client.onopen = () => {
      console.log('WebSocket client connected');

      // send a message
      if (client.readyState === client.OPEN) {
        client.send(Math.random().toString());
      }
    }

    // set up the event listener for when the connection is closed
    client.onclose = () => {
      console.log('Client connection closed!');
    };

    // set up the event listener for when a message is received
    client.onmessage = (message) => {
      if (typeof message.data === 'string') {
        console.log(`${new Date()}: Received message by the client: "${message.data}"`);
      }
    };

     // set up the event listener for when there is an error
    client.onerror = (error) => {
      console.log(`Connection error: ${error.toString()}`);
    }

  }, []);

  return (
   <div></div>
  );
}

export default App;
