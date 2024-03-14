import { StatusCodes } from "http-status-codes";
import { testServer } from "./../jest.setup";

describe("Persons - Create", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "create-person@gmail.com";

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
    const cityCreated = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: "Teste12" });

    console.log(
      "cityCreatedcityCreatedcityCreatedcityCreated",
      cityCreated.body
    );

    city = cityCreated.body.id;
  });

  it("Tenta criar registro sem o token de autenticação", async () => {
    const res = await testServer.post("/persons").send({
      city,
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
        city,
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
        city,
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
        city,
        email: "pauloduplicate@duplicate.com",
        name: "Ceni",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("object");

    const res2 = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        city,
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
        city,
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
        city,
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
        city,
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
        city,
        name: "Paulo",
        email: "paulo teste.com",
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });

  it("Tenta criar registro sem o city(id)", async () => {
    const res = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "Paulo",
        email: "paulo@teste.com",
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.city");
  });

  it("Tenta criar registro sem o city(id) invalido", async () => {
    const res = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        city: "teste",
        name: "Paulo",
        email: "paulo@teste.com",
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.city");
  });

  it("Tenta criar registro sem nenhuma propriedade", async () => {
    const res = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({});

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
    expect(res.body).toHaveProperty("errors.body.city");
    expect(res.body).toHaveProperty("errors.body.name");
  });
});
