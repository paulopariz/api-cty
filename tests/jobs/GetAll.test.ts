import { StatusCodes } from "http-status-codes";
import { testServer } from "./../jest.setup";

describe("Jobs - GetAll", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "getAll-jobs@gmail.com";

    await testServer
      .post("/signup ")
      .send({ name: "Teste", email, password: "123456" });

    const signIn = await testServer
      .post("/signin")
      .send({ email, password: "123456" });

    accessToken = signIn.body.accessToken;
  });

  it("Tenta buscar os registros sem o token de autenticação", async () => {
    const res = await testServer.get("/jobs").send();

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });

  it("Busca todos os registros", async () => {
    const res = await testServer
      .post("/jobs")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "São Paulo",
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resGet = await testServer
      .get("/jobs")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(Number(resGet.headers["x-total-count"])).toBeGreaterThan(0);
    expect(resGet.statusCode).toEqual(StatusCodes.OK);
    expect(resGet.body.length).toBeGreaterThan(0);
  });
});
