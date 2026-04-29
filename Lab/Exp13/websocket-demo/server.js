const WebSocket = require("ws");

// Create WebSocket Server
const wss = new WebSocket.Server({ port: 3000 });

console.log("WebSocket server is running on ws://localhost:3000");

// When client connects
    wss.on("connection", function connection(ws) {
    console.log("New client connected");

    // Send welcome message
    ws.send("Welcome to WebSocket Server!");

    // Receive message from client
    	ws.on("message", function incoming(message) {
        console.log("Received:", message.toString());

        // Broadcast message to all clients
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    // When client disconnects
    ws.on("close", () => {
        console.log("Client disconnected");
    });
});
