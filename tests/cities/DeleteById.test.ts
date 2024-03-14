import { StatusCodes } from "http-status-codes";
import { testServer } from "./../jest.setup";

describe("Cities - DeleteById", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "delete-cidades@gmail.com";

    await testServer
      .post("/signup ")
      .send({ name: "Teste", email, password: "123456" });

    const signIn = await testServer
      .post("/signin")
      .send({ email, password: "123456" });

    accessToken = signIn.body.accessToken;
  });

  it("Tenta apagar um registro sem o token de autenticação", async () => {
    const res = await testServer.delete("/cities/1").send();

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });

  it("Apaga o registro", async () => {
    const res = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "São Paulo",
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resDeleted = await testServer
      .delete(`/cities/${res.body.id}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resDeleted.statusCode).toEqual(StatusCodes.OK);
  });

  it("Tenta apagar um registro que não existe", async () => {
    const res = await testServer
      .delete("/cities/9423042304")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});
