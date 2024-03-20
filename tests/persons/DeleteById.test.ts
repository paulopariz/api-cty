import { StatusCodes } from "http-status-codes";
import { testServer } from "./../jest.setup";

describe("Persons - DeleteById", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "delete-person@gmail.com";

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
      .send({ name: "Teste12" });

    job = jobCreated.body.id;
  });

  it("Tenta apagar o registro sem o token de autenticação", async () => {
    const res = await testServer.delete(`/persons/1`).send();

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });

  it("Apaga o registro", async () => {
    const res = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        job,
        email: "paulodelete@del.com",
        name: "Paulo delete",
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resDeleted = await testServer
      .delete(`/persons/${res.body.id}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resDeleted.statusCode).toEqual(StatusCodes.OK);
  });

  it("Tenta apagar um registro que não existe", async () => {
    const res = await testServer
      .delete("/persons/9423042304")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});
