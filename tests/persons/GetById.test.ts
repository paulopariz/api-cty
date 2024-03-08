import { StatusCodes } from "http-status-codes";
import { testServer } from "./../jest.setup";

describe("Persons - GetById", () => {
  let city: number | undefined = undefined;

  beforeAll(async () => {
    const cityCreated = await testServer
      .post("/cities")
      .send({ name: "Teste2" });

    city = cityCreated.body.id;
  });

  it("Busca registro por id", async () => {
    const res = await testServer.post("/persons").send({
      city,
      email: "paulogetbyid@get.com",
      name: "Paulo getbyid",
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resget = await testServer.get(`/persons/${res.body.id}`).send();

    expect(resget.statusCode).toEqual(StatusCodes.OK);
    expect(resget.body).toHaveProperty("name");
  });

  it("Tenta buscar um registro que não existe", async () => {
    const res = await testServer.get("/persons/9423042304").send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});
