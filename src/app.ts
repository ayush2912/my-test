import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { notifyHandler } from "./routes";
import { events } from "./services/events";
import { findUserByAccessToken } from "./services/graphql";

dotenv.config();

const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

interface ClientToServerEvents {}

interface ServerToClientEvents {
  new: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  userId: string;
}

const App = () => {
  const app = express();

  app.use(morgan("dev"));

  app.use(bodyParserJSON);
  app.use(bodyParserURLEncoded);

  app.post("/notify", notifyHandler);

  const httpServer = createServer(app);

  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.engine.use(morgan("dev"));

  const notificationsIo = io.of("/notifications");

  notificationsIo.use(async (socket, next) => {
    const user = await findUserByAccessToken(socket.handshake.auth.token);

    const userId = user?.id;

    if (!userId) {
      const err = new Error("not authorized");
      return next(err);
    }

    socket.join(userId);
    next();
  });

  notificationsIo.on("connection", (socket) => {
    // console.log(`Client connected`, socket.id, socket.handshake.auth);
  });

  events.on("notify", ({ userId }) => {
    notificationsIo.to(userId).emit("new");
  });

  return {
    app,
    io,
    httpServer,
  };
};

export default App;
