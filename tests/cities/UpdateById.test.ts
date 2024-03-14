import { StatusCodes } from "http-status-codes";
import { testServer } from "./../jest.setup";

describe("Cities - UpdateById", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "updateById-cidades@gmail.com";

    await testServer
      .post("/signup ")
      .send({ name: "Teste", email, password: "123456" });

    const signIn = await testServer
      .post("/signin")
      .send({ email, password: "123456" });

    accessToken = signIn.body.accessToken;
  });

  it("Tenta atualizar o registro sem token de autenticação", async () => {
    const res = await testServer
      .put(`/cities/1`)
      .send({ name: "Rio de Janeiro" });

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });

  it("Atualiza o registro", async () => {
    const res = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "São Paulo",
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdate = await testServer
      .put(`/cities/${res.body.id}`)
      .set({ Authorization: `Bearer ${accessToken}` })

      .send({ name: "Rio de Janeiro" });

    expect(resUpdate.statusCode).toEqual(StatusCodes.OK);
  });

  it("Tenta atualizar um registro que não existe", async () => {
    const res = await testServer
      .put("/cities/9423042304")
      .set({ Authorization: `Bearer ${accessToken}` })

      .send({ name: "São Paulo" });

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});
