import httpMocks from "node-mocks-http";
import { notifyHandler } from "..";
import { events } from "../../services/events";

describe("notifyHandler()", () => {
  test("with proper userId", (done) => {
    const { req, res } = httpMocks.createMocks({
      method: "POST",
      url: "/notify",
      body: {
        userId: "6422882d87782a65304560b2",
      },
    });

    events.once("notify", (payload) => {
      expect(payload.userId).toBe("6422882d87782a65304560b2");
      done();
    });

    notifyHandler(req, res);

    const result = res._getJSONData();

    expect(res.statusCode).toBe(200);
    expect(result.status).toBe(200);
  });

  test("with invalid userId", () => {
    const { req, res } = httpMocks.createMocks({
      method: "POST",
      url: "/notify",
      body: {
        userId: "meh",
      },
    });

    notifyHandler(req, res);

    const result = res._getJSONData();

    expect(res.statusCode).toBe(400);
    expect(result.status).toBe(400);
    expect(result.error.length).toBe(1);
  });

  test("with invalid request body", () => {
    const { req, res } = httpMocks.createMocks({
      method: "POST",
      url: "/notify",
      body: {
        hello: "lol",
      },
    });

    notifyHandler(req, res);

    const result = res._getJSONData();

    expect(res.statusCode).toBe(400);
    expect(result.status).toBe(400);
    expect(result.error.length).toBe(1);
  });
});
