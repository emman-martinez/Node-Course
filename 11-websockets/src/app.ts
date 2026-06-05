import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", function connection(ws) {
  console.log("Client connected");

  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  ws.send("Hello from WebSocket server!");

  setInterval(() => {
    ws.send("Current time: " + new Date().toLocaleTimeString());
  }, 2000);
});

console.log("Server is running on ws://localhost:3000");
