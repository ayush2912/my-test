import { AddressInfo } from "net";
import { io as Client } from "socket.io-client";
import { events } from "../services/events";
import fetch from "isomorphic-unfetch";
import App from "../app";

describe("Socket.io Client", () => {
  test("Connect socket.io client to server without auth", (done) => {
    const { httpServer } = App();
    httpServer.listen(() => {
      const address = httpServer.address() as AddressInfo;

      const socket = Client(`http://localhost:${address.port}/notifications`);

      socket.on("connect_error", (err) => {
        expect(err.message).toBe("not authorized");
        httpServer.close();
        done();
      });
    });
  });

  test("Connect socket.io client to server with auth", (done) => {
    const { httpServer } = App();
    httpServer.listen(() => {
      const address = httpServer.address() as AddressInfo;

      const socket = Client(`http://localhost:${address.port}/notifications`, {
        auth: {
          userId: "64229683d32a0a8bea10e4de",
        },
      });

      socket.on("connect", () => {
        expect(typeof socket.id).toBe("string");
        socket.disconnect();
      });

      socket.on("disconnect", () => {
        httpServer.close();
        done();
      });
    });
  });

  test("Broadcast new notification events to client through EventEmitter", (done) => {
    const { httpServer } = App();
    httpServer.listen(() => {
      const address = httpServer.address() as AddressInfo;

      const socket = Client(`http://localhost:${address.port}/notifications`, {
        auth: {
          userId: "6422a06cd32a0a8bea10e4df",
        },
      });

      socket.on("connect", () => {
        events.emit("notify", { userId: "6422a06cd32a0a8bea10e4df" });
      });

      socket.on("new", () => {
        console.log("Client socket received new notification");
        socket.disconnect();
      });

      socket.on("disconnect", () => {
        httpServer.close();
        done();
      });
    });
  });

  test("Broadcast new notification events to client through POST /notify route", (done) => {
    const { httpServer } = App();

    httpServer.listen(() => {
      const address = httpServer.address() as AddressInfo;

      const socket = Client(`http://localhost:${address.port}/notifications`, {
        auth: {
          userId: "6422a06cd32a0a8bea10e4df",
        },
      });

      socket.on("connect", async () => {
        await fetch(`http://localhost:${address.port}/notify`, {
          method: "post",
          body: JSON.stringify({
            userId: "6422a06cd32a0a8bea10e4df",
          }),
          headers: { "Content-Type": "application/json" },
        });
      });

      socket.on("new", () => {
        console.log("Client socket received new notification");
        socket.disconnect();
      });

      socket.on("disconnect", () => {
        httpServer.close();
        done();
      });
    });
  });
});
