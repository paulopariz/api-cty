import { StatusCodes } from "http-status-codes";
import { testServer } from "./../jest.setup";

describe("Persons - DeleteById", () => {
  let city: number | undefined = undefined;

  beforeAll(async () => {
    const cityCreated = await testServer
      .post("/cities")
      .send({ name: "Teste12" });

    city = cityCreated.body.id;
  });

  it("Apaga o registro", async () => {
    const res = await testServer.post("/persons").send({
      city,
      email: "paulodelete@del.com",
      name: "Paulo delete",
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resDeleted = await testServer
      .delete(`/persons/${res.body.id}`)
      .send();

    expect(resDeleted.statusCode).toEqual(StatusCodes.OK);
  });

  it("Tenta apagar um registro que não existe", async () => {
    const res = await testServer.delete("/persons/9423042304").send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});
