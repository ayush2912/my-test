import App from "./app";

const { httpServer } = App();

const port = process.env.PORT || 3000;

httpServer.listen(port, () =>
  console.log(`🚀 Server has started successfully on http://localhost:${port}!`)
);
