import { StatusCodes } from "http-status-codes";
import { testServer } from "./../jest.setup";

describe("Persons - GetById", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "getById-person@gmail.com";

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
      .send({ name: "Teste2" });

    city = cityCreated.body.id;
  });

  it("Tenta buscar registro por id sem o token de acesso", async () => {
    const res = await testServer.get(`/persons/1`).send();

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });

  it("Busca registro por id", async () => {
    const res = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        city,
        email: "paulogetbyid@get.com",
        name: "Paulo getbyid",
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resget = await testServer
      .get(`/persons/${res.body.id}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resget.statusCode).toEqual(StatusCodes.OK);
    expect(resget.body).toHaveProperty("name");
  });

  it("Tenta buscar um registro que não existe", async () => {
    const res = await testServer
      .get("/persons/9423042304")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});
