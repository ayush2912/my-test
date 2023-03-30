exports = async function (changeEvent) {
  const receiverId = changeEvent.fullDocument.receiverId;
  
  const requestOptions = {
    url: "https://offsetmax-notification-transport-japrkvsz2a-em.a.run.app/notify",
    body: JSON.stringify({ userId: receiverId }), 
    headers: {
      "Content-Type": [ "application/json" ]
    }
  }

  const response = await context.http.post(requestOptions);
  
  console.log(JSON.stringify(requestOptions))
  console.log(response.body.text())
  console.log(JSON.stringify(changeEvent))

  return EJSON.parse(response.body.text());
};
