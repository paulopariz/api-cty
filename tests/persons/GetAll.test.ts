import { StatusCodes } from "http-status-codes";
import { testServer } from "./../jest.setup";

describe("Persons - GetAll", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "getAll-person@gmail.com";

    await testServer
      .post("/signup ")
      .send({ name: "Teste", email, password: "123456" });

    const signIn = await testServer
      .post("/signin")
      .send({ email, password: "123456" });

    accessToken = signIn.body.accessToken;
  });

  let job: number | undefined = undefined;

  beforeAll(async () => {
    const jobCreated = await testServer
      .post("/jobs")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: "Teste7" });

    job = jobCreated.body.id;
  });

  it("Tenta buscar os registros sem o token de autenticação", async () => {
    const res = await testServer.get("/persons").send();

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });

  it("Busca todos os registros", async () => {
    const res = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        job,
        email: "paulogetall@get.com",
        name: "Paulo all",
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resGet = await testServer
      .get("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(Number(resGet.headers["x-total-count"])).toBeGreaterThan(0);
    expect(resGet.statusCode).toEqual(StatusCodes.OK);
    expect(resGet.body.length).toBeGreaterThan(0);
  });
});
