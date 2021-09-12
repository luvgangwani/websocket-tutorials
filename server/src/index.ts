import {createServer, IncomingMessage, Server, ServerResponse} from 'http';
import ws from 'websocket';

// create an http server
const server:Server = createServer((request: IncomingMessage, response: ServerResponse) => {
    console.log(`${new Date()}: Request reveiced from url ${request.url}`);
    response.writeHead(404);
    response.end();
});

// listen on port 5000
server.listen('5000', () => {
    console.log(`${new Date()}: Server is listening at port 5000`);
});

// initialize the websocket server
const wsServer: ws.server = new ws.server({
    httpServer: server,
    autoAcceptConnections: false,
});

// setup server events
wsServer.on('request', (request: ws.request) => {
    // accept the connection request
    const connection:ws.connection = request.accept('echo-protocol', request.origin);

    console.log(`${new Date()}: Connection accepted.`);

    connection.on('message', (message: ws.Message) => {
        if (message.type === 'utf8') {
            console.log(`${new Date()}: Received message by server - "${message.utf8Data}"`);
            // send the message to all the clients connected
            connection.sendUTF(message.utf8Data);
        }
    });

    // event for closing the connection
    connection.on('close', (reasonCode: number, desc: string) => {
        console.log(`${new Date()}: Peer ${connection.remoteAddress} disconnected!`);
    });
});