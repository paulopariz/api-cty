import { StatusCodes } from "http-status-codes";
import { testServer } from "./../jest.setup";

describe("Cities - DeleteById", () => {
  it("Apaga o registro", async () => {
    const res = await testServer.post("/cities").send({
      name: "São Paulo",
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resDeleted = await testServer.delete(`/cities/${res.body.id}`).send();

    expect(resDeleted.statusCode).toEqual(StatusCodes.OK);
  });

  it("Tenta apagar um registro que não existe", async () => {
    const res = await testServer.delete("/cities/9423042304").send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});
