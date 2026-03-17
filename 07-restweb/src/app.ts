import * as http from "http";

// Create an HTTP server that listens on port 8080 and responds with "Hello, World!" to any request.
// This is a simple example of an HTTP server using Node.js.
// You can run this code in a Node.js environment, and it will start a server that listens on port 8080.
// When you access http://localhost:8080 in your browser or send a request to that URL.
// You will receive a response with the message "Hello, World!".
// http: The built-in Node.js module for creating HTTP servers and handling HTTP requests and responses.
// createServer: A method from the http module that creates an HTTP server.
//               It takes a callback function as an argument, which is called every time a request is received by the server.
// request: The incoming HTTP request object, which contains information about the request such as headers, URL, and method.
// response: The HTTP response object, which is used to send a response back to the client.
//           You can set the status code, headers, and body of the response using this object.
const server = http.createServer((req, res) => {
  console.log(`Received request: ${req.method} ${req.url}`);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.write("Hello, World!\n");
  res.end();
});

server.listen(8080, () => {
  console.log("Server running at http://localhost:8080/");
});
