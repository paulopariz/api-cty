import { StatusCodes } from "http-status-codes";
import { testServer } from "./../jest.setup";

describe("Cities - UpdateById", () => {
  it("Atualiza o registro", async () => {
    const res = await testServer.post("/cities").send({
      name: "São Paulo",
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdate = await testServer
      .put(`/cities/${res.body.id}`)
      .send({ name: "Rio de Janeiro" });

    expect(resUpdate.statusCode).toEqual(StatusCodes.OK);
  });

  it("Tenta atualizar um registro que não existe", async () => {
    const res = await testServer
      .put("/cities/9423042304")
      .send({ name: "São Paulo" });

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});
