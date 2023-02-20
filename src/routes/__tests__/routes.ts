import httpMocks from "node-mocks-http";

import { asyncRouteHandler, createPetHandler } from "../routes";

describe("Basic route handlers", () => {

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
});

describe("Test schema validation", () => {
  test("createPetHandler() with description", () => {
    const { req, res } = httpMocks.createMocks({
      method: "POST",
      url: "/pet",
      body: {
        name: "Artemis",
        type: "Cat",
        dateOfBirth: "2023-01-15T00:00:00",
        description: "Artemis is a good boy",
      },
    });

    createPetHandler(req, res);

    const results = res._getJSONData();

    expect(results.name).toMatch("Artemis");
    expect(results.type).toMatch("Cat");
    expect(new Date(results.dateOfBirth)).toEqual(
      new Date("2023-01-15T00:00:00")
    );
    expect(results.description).toMatch("Artemis is a good boy");
  });

  test("createPetHandler() without description", () => {
    const { req, res } = httpMocks.createMocks({
      method: "POST",
      url: "/pet",
      body: {
        name: "Artemis",
        type: "Cat",
        dateOfBirth: "2023-01-15T00:00:00",
      },
    });

    createPetHandler(req, res);

    const results = res._getJSONData();

    expect(results.name).toMatch("Artemis");
    expect(results.type).toMatch("Cat");
    expect(new Date(results.dateOfBirth)).toEqual(
      new Date("2023-01-15T00:00:00")
    );
  });

  test("createPetHandler() with error", () => {
    const { req, res } = httpMocks.createMocks({
      method: "POST",
      url: "/pet",
      body: {
        type: "Cat",
      },
    });

    createPetHandler(req, res);

    expect(res._getJSONData().error).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "invalid_type",
        }),
        expect.objectContaining({
          code: "invalid_date",
        }),
      ])
    );
  });
});
