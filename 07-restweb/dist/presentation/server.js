"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require("express");
class Server {
    app = express();
    folder;
    port;
    constructor(folder, port) {
        this.folder = folder;
        this.port = port;
    }
    async start() {
        // Middleware and routes would be set up here
        // Public folder
        this.app.use(express.static(this.folder));
        this.app.use((req, res) => {
            console.log(`Received request for ${req.url}`);
            res.send(`Hello! You requested ${req.url}`); // Simple response for testing
        });
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map