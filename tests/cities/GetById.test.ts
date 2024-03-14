import { StatusCodes } from "http-status-codes";
import { testServer } from "./../jest.setup";

describe("Cities - GetById", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "getById-cidades@gmail.com";

    await testServer
      .post("/signup ")
      .send({ name: "Teste", email, password: "123456" });

    const signIn = await testServer
      .post("/signin")
      .send({ email, password: "123456" });

    accessToken = signIn.body.accessToken;
  });

  it("Tenta buscar o registro por id sem o token de autenticação", async () => {
    const res = await testServer.get(`/cities/1`).send();

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });

  it("Busca registro por id", async () => {
    const res = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "São Paulo",
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resget = await testServer
      .get(`/cities/1`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resget.statusCode).toEqual(StatusCodes.OK);
    expect(resget.body).toHaveProperty("name");
  });

  it("Tenta buscar um registro que não existe", async () => {
    const res = await testServer
      .get("/cities/9423042304")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});
