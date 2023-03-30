exports = async function (changeEvent) {
  const receiverId = changeEvent.fullDocument.receiverId;

  const requestOptions = {
    url: context.environment.values.NOTIFICATION_TRANSPORT_API_URL,
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
