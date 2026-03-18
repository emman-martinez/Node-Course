"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./presentation/server");
(async () => {
    main();
})();
function main() {
    const folder = "public";
    const port = 3000;
    const server = new server_1.Server(folder, port);
    server.start();
}
//# sourceMappingURL=app.js.map