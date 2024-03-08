import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Persons - UpdateById", () => {
  let city: number | undefined = undefined;
  beforeAll(async () => {
    const resCity = await testServer.post("/cities").send({ name: "Teste" });

    city = resCity.body.id;
  });

  it("Atualiza registro", async () => {
    const res1 = await testServer.post("/persons").send({
      city,
      email: "paulocrup@createup.com",
      name: "Ceni",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer
      .put(`/persons/${res1.body.id}`)
      .send({
        city,
        name: "Paulo ppariz",
        email: "parixpais@gmail.com",
      });
    expect(resAtualizada.statusCode).toEqual(StatusCodes.OK);
  });
  it("Tenta atualizar registro que não existe", async () => {
    const res1 = await testServer.put("/persons/99999").send({
      city,
      email: "juca@gmail.com",
      name: "Paulo ppariz",
    });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
