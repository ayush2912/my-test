exports = async function (changeEvent) {
  const receiverId = changeEvent.fullDocument.receiverId.$oid;

  const response = await context.http.post({
    url: "https://offsetmax-notification-transport-japrkvsz2a-em.a.run.app/notify",
    body: { userId: receiverId },
    encodeBodyAsJSON: true,
  });

  return EJSON.parse(response.body.text());
};
