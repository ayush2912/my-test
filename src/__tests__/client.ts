import { AddressInfo } from "net";
import { io as Client } from "socket.io-client";
import fetch from "isomorphic-unfetch";

import { events } from "../services/events";
import { findUserByAccessToken } from "../services/graphql";
import App from "../app";

const signin = () =>
  fetch("https://api.offsetmax.digital/dev-auth/signin", {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "sec-ch-ua":
        '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "x-api-key": "T6IP0eDgi46xbUpxvQhNA5ssQWWlyE4h3OuDWYCf",
      Referer: "https://dev-dashboard.offsetmax.digital/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: '{"email":"grey.ang+test.1@climateconnect.digital","password":"HelloWorld123!"}',
    method: "POST",
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .then(({ userId, token }) => ({
      id: userId,
      accessToken: token,
    }));

type User = {
  id: string;
  accessToken: string;
};

describe("Socket.io Client", () => {
  const testUser: User = {
    id: "",
    accessToken: "",
  };

  /* 
    Signin user so that we can have a userId and access token that we can test with
  */
  beforeAll(async () => {
    const results = await signin();
    Object.assign(testUser, results);
  });

  test("Find user by access token", async () => {
    const user: User = await findUserByAccessToken(testUser.accessToken);
    expect(user.id).toBe(testUser.id);
  });

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
          token: testUser.accessToken,
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
          token: testUser.accessToken,
        },
      });

      socket.on("connect", () => {
        events.emit("notify", { userId: testUser.id });
      });

      socket.on("new", () => {
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
          token: testUser.accessToken,
        },
      });

      socket.on("connect", async () => {
        await fetch(`http://localhost:${address.port}/notify`, {
          method: "post",
          body: JSON.stringify({
            userId: testUser.id,
          }),
          headers: { "Content-Type": "application/json" },
        });
      });

      socket.on("new", () => {
        socket.disconnect();
      });

      socket.on("disconnect", () => {
        httpServer.close();
        done();
      });
    });
  });
});
