import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Users - SignIn", () => {
  beforeAll(async () => {
    const res = await testServer.post("/signup").send({
      name: "pariz",
      email: "paulo@gmail.com",
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual("object");
  });

  it("Faz login", async () => {
    const res = await testServer.post("/signin").send({
      password: "123456",
      email: "paulo@gmail.com",
    });
    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body).toHaveProperty("accessToken");
  });

  it("Senha errada", async () => {
    const res = await testServer.post("/signin").send({
      email: "paulo@gmail.com",
      password: "123456789",
    });

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });

  it("Email errado", async () => {
    const res = await testServer.post("/signin").send({
      email: "pauloprzzzz@gmail.com",
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });

  it("Email com o formato inválido", async () => {
    const res = await testServer.post("/signin").send({
      email: "pauloprz gmail.com",
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });

  it("Senha curta", async () => {
    const res = await testServer.post("/signin").send({
      email: "paulo@gmail.com",
      password: "123",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.password");
  });

  it("Senha não informada", async () => {
    const res = await testServer.post("/signin").send({
      email: "paulo@gmail.com",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.password");
  });

  it("Email não informado", async () => {
    const res = await testServer.post("/signin").send({
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });
});
