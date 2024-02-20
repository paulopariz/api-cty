import { StatusCodes } from "http-status-codes";
import { testServer } from "./../jest.setup";

describe("Cities - GetById", () => {
  it("Busca registro por id", async () => {
    const res = await testServer.post("/cities").send({
      name: "São Paulo",
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resget = await testServer.get(`/cities/${res.body}`).send();

    expect(resget.statusCode).toEqual(StatusCodes.OK);
    expect(resget.body).toHaveProperty("name");
  });

  it("Tenta buscar um registro que não existe", async () => {
    const res = await testServer.get("/cities/9423042304").send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});
