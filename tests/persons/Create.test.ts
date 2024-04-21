import { StatusCodes } from "http-status-codes";
import { testServer } from "./../jest.setup";

describe("Persons - Create", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "create-person@gmail.com";

    await testServer.post("/signup ").send({ name: "Teste", email, password: "123456" });

    const signIn = await testServer.post("/signin").send({ email, password: "123456" });

    accessToken = signIn.body.accessToken;
  });

  let job: number | undefined = undefined;
  beforeAll(async () => {
    const jobCreated = await testServer
      .post("/jobs")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: "Teste12" });

    job = jobCreated.body.id;
  });

  it("Tenta criar registro sem o token de autenticação", async () => {
    const res = await testServer.post("/persons").send({
      job,
      email: "paulocreate@create.com",
      name: "Ceni",
    });

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });

  it("Cria registro", async () => {
    const res1 = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        job,
        email: "paulocreate@create.com",
        name: "Ceni",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("object");
  });

  it("Cria registro2", async () => {
    const res1 = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        job,
        email: "paulocreate2@create.com",
        name: "Ceni 01",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("object");
  });

  it("Tenta criar registro duplicado", async () => {
    const res1 = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        job,
        email: "pauloduplicate@duplicate.com",
        name: "Ceni",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("object");

    const res2 = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        job,
        email: "pauloduplicate@duplicate.com",
        name: "Ceni",
      });

    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty("errors.default");
  });

  it("Tenta criar registro com o name curto", async () => {
    const res = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        job,
        email: "paulo777@teste.com",
        name: "Pa",
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.name");
  });

  it("Tenta criar registro sem o name", async () => {
    const res = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        job,
        email: "paulo777@teste.com",
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.name");
  });

  it("Tenta criar registro sem o email", async () => {
    const res = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        job,
        name: "Paulo",
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });

  it("Tenta criar registro com o email invalido", async () => {
    const res = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        job,
        name: "Paulo",
        email: "paulo teste.com",
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });

  it("Tenta criar registro sem o job(id)", async () => {
    const res = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "Paulo",
        email: "paulo@teste.com",
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.job");
  });

  it("Tenta criar registro sem o job(id) invalido", async () => {
    const res = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        job: "teste",
        name: "Paulo",
        email: "paulo@teste.com",
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.job");
  });

  it("Tenta criar registro sem nenhuma propriedade", async () => {
    const res = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({});

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
    expect(res.body).toHaveProperty("errors.body.job");
    expect(res.body).toHaveProperty("errors.body.name");
  });
});
