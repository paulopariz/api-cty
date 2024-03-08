import { StatusCodes } from "http-status-codes";
import { testServer } from "./../jest.setup";

describe("Persons - GetAll", () => {
  let city: number | undefined = undefined;

  beforeAll(async () => {
    const cityCreated = await testServer
      .post("/cities")
      .send({ name: "Teste7" });

    city = cityCreated.body.id;
  });

  it("Busca todos os registros", async () => {
    const res = await testServer.post("/persons").send({
      city,
      email: "paulogetall@get.com",
      name: "Paulo all",
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resGet = await testServer.get("/persons").send();

    expect(Number(resGet.headers["x-total-count"])).toBeGreaterThan(0);
    expect(resGet.statusCode).toEqual(StatusCodes.OK);
    expect(resGet.body.length).toBeGreaterThan(0);
  });
});
