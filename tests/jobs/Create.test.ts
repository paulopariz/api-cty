import { StatusCodes } from "http-status-codes";
import { testServer } from "./../jest.setup";

describe("Jobs - Create", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "create-jobs@gmail.com";

    await testServer
      .post("/signup ")
      .send({ name: "Teste", email, password: "123456" });

    const signIn = await testServer
      .post("/signin")
      .send({ email, password: "123456" });

    accessToken = signIn.body.accessToken;
  });

  it("Tenta criar registro sem o token de acesso", async () => {
    const res1 = await testServer.post("/jobs").send({
      name: "São Paulo",
    });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("Cria registro", async () => {
    const res1 = await testServer
      .post("/jobs")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "São Paulo",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("object");
  });

  it("Quantidade de caracteres invalidos", async () => {
    const res1 = await testServer
      .post("/jobs")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "Sã",
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
  });
});
