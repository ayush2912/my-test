const notificationTransportUrls = {
  offsetmaxsandbox:
    "https://offsetmax-notification-transport-dev-japrkvsz2a-em.a.run.app/notify",
  "offsetmax-demo":
    "https://offsetmax-notification-transport-demo-japrkvsz2a-em.a.run.app/notify",
  "offsetmax-prod":
    "https://offsetmax-notification-transport-prod-japrkvsz2a-em.a.run.app/notify",
  "offsetmax-staging":
    "https://offsetmax-notification-transport-staging-japrkvsz2a-em.a.run.app/notify",
  "offsetmax-prod-mirror":
    "https://offsetmax-notification-transport-prod-mirror-japrkvsz2a-em.a.run.app/notify",
};

exports = async function (changeEvent) {
  const receiverId = changeEvent.fullDocument.receiverId;
  const url = notificationTransportUrls[changeEvent.ns.db];

  const requestOptions = {
    url: url,
    body: JSON.stringify({ userId: receiverId }),
    headers: {
      "Content-Type": ["application/json"],
    },
  };

  const response = await context.http.post(requestOptions);

  console.log(JSON.stringify(requestOptions));
  console.log(response.body.text());
  console.log(JSON.stringify(changeEvent));

  return EJSON.parse(response.body.text());
};
