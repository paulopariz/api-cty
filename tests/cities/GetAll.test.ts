import { StatusCodes } from "http-status-codes";
import { testServer } from "./../jest.setup";

describe("Cities - GetAll", () => {
  it("Busca todos os registros", async () => {
    const res = await testServer.post("/cities").send({
      name: "São Paulo",
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resGet = await testServer.get("/cities").send();

    expect(Number(resGet.headers["x-total-count"])).toBeGreaterThan(0);
    expect(resGet.statusCode).toEqual(StatusCodes.OK);
    expect(resGet.body.length).toBeGreaterThan(0);
  });
});
