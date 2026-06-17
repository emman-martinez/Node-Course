import { Server } from "http";
import { WebSocket, WebSocketServer } from "ws";

interface Options {
  server: Server;
  path?: string;
}

export class WssService {
  private static _instance: WssService;
  private wss: WebSocketServer;

  private constructor(options: Options) {
    const { server, path = "/ws" } = options; // localhost:3000/ws
    this.wss = new WebSocketServer({ server, path });
    this.start();
  }

  static get instance(): WssService {
    if (!WssService._instance) {
      throw new Error("WssService is not initialized. Call initWss first.");
    }
    return WssService._instance;
  }

  static initWss(options: Options) {
    WssService._instance = new WssService(options);
  }

  public start() {
    this.wss.on("connection", (ws: WebSocket) => {
      console.log("WebSocket client connected");
      ws.on("close", () => {
        console.log("WebSocket client disconnected");
      });
    });
  }
}
