import App from "./app";

import { createAdapter } from "@socket.io/mongo-adapter";
import { MongoClient } from "mongodb";

const { io, httpServer } = App();

const port = process.env.PORT || 3000;

const mongoClient = new MongoClient(
  process.env.SOCKETIO_MONGO_ADAPTER_URI ||
    "mongodb://localhost:27017/?replicaSet=rs0"
);

const main = async () => {
  await mongoClient.connect();

  const mongoCollection = mongoClient
    .db(process.env.SOCKETIO_MONGO_ADAPTER_DB || "mydb")
    .collection(
      process.env.SOCKETIO_MONGO_ADAPTER_COLLECTION ||
        "socket.io-adapter-events"
    );

  await mongoCollection.createIndex(
    { createdAt: 1 },
    { expireAfterSeconds: 3600, background: true }
  );

  io.adapter(
    createAdapter(mongoCollection, {
      addCreatedAtField: true,
    })
  );

  httpServer.listen(port, () =>
    console.log(
      `🚀 Server has started successfully on http://localhost:${port}!`
    )
  );
};

main();
