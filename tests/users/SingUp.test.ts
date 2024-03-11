import { StatusCodes } from "http-status-codes";
import { testServer } from "./../jest.setup";

describe("Users - SignUp", () => {
  it("Cadastro usuário 1", async () => {
    const res = await testServer.post("/signup").send({
      name: "Paulo",
      email: "paulo@signup.com",
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual("object");
  });

  it("Cadastro usuário 2", async () => {
    const res = await testServer.post("/signup").send({
      name: "pariz",
      email: "pariz@signup.com",
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual("object");
  });

  it("Cadastro do usuário com email duplicado", async () => {
    const res1 = await testServer.post("/signup").send({
      name: "Ceni",
      email: "ceni@signup.com",
      password: "123456",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("object");

    const res2 = await testServer.post("/signup").send({
      name: "Buffon",
      email: "ceni@signup.com",
      password: "123456",
    });

    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty("errors.default");
  });

  it("Cadastro do usuário sem o email", async () => {
    const res = await testServer.post("/signup").send({
      name: "Ceni",
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });

  it("Cadastro do usuário sem o name", async () => {
    const res = await testServer.post("/signup").send({
      password: "123456",
      email: "teste@signup.com",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.name");
  });

  it("Cadastro do usuário sem a senha", async () => {
    const res = await testServer.post("/signup").send({
      name: "teste",
      email: "teste@signup.com",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.password");
  });

  it("Cadastro do usuário com o email invalido", async () => {
    const res = await testServer.post("/signup").send({
      name: "Paulo",
      email: "paulo teste.com",
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });

  it("Cadastro do usuário com a senha curta", async () => {
    const res = await testServer.post("/signup").send({
      name: "Paulo",
      email: "paulo@teste.com",
      password: "123",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.password");
  });

  it("Cadastro do usuário com a name curto", async () => {
    const res = await testServer.post("/signup").send({
      name: "Pa",
      email: "paulo@teste.com",
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.name");
  });
});
