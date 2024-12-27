const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws) {
  console.log("New client connected");

  ws.on("message", function incoming(message) {
    try {
      const data = message.toString();
      console.log("received: %s", data);

      // Add server message and send back
      const response = `${data} - Sent from server`;
      ws.send(response);
    } catch (error) {
      console.error("Error processing message:", error);
      ws.send("Error processing message");
    }
  });

  ws.on("close", function close() {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server running on ws://localhost:8080");
