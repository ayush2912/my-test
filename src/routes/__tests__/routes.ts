import httpMocks from "node-mocks-http";

import { routeHandler, asyncRouteHandler } from "../routes";

test("Test routeHandler", () => {
  const { req, res } = httpMocks.createMocks({
    method: "GET",
    url: "/",
  });

  routeHandler(req, res);

  expect(res._getData()).toMatch(/sheldon-cooper-bazinga-tbbt-gif/);
});

test("Test asyncRouteHandler", async () => {
  const { req, res } = httpMocks.createMocks({
    method: "GET",
    url: "/async",
  });

  await asyncRouteHandler(req, res);

  expect(res._getJSONData()).toEqual({
    data: "Hello world!",
  });
});
