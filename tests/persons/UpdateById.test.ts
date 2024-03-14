import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Persons - UpdateById", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "updateById-person@gmail.com";

    await testServer
      .post("/signup ")
      .send({ name: "Teste", email, password: "123456" });

    const signIn = await testServer
      .post("/signin")
      .send({ email, password: "123456" });

    accessToken = signIn.body.accessToken;
  });

  let city: number | undefined = undefined;
  beforeAll(async () => {
    const resCity = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: "Teste" });

    city = resCity.body.id;
  });

  it("Tenta atualizar um registro sem o token de autenticação", async () => {
    const res = await testServer.put(`/persons/1`).send({
      city,
      name: "Paulo ppariz",
      email: "parixpais@gmail.com",
    });
    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });

  it("Atualiza registro", async () => {
    const res1 = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        city,
        email: "paulocrup@createup.com",
        name: "Ceni",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer
      .put(`/persons/${res1.body.id}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        city,
        name: "Paulo ppariz",
        email: "parixpais@gmail.com",
      });
    expect(resAtualizada.statusCode).toEqual(StatusCodes.OK);
  });
  it("Tenta atualizar registro que não existe", async () => {
    const res1 = await testServer
      .put("/persons/99999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        city,
        email: "juca@gmail.com",
        name: "Paulo ppariz",
      });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
