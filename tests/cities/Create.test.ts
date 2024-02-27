import { StatusCodes } from "http-status-codes";
import { testServer } from "./../jest.setup";

describe("Cities - Create", () => {
  it("Cria registro", async () => {
    const res1 = await testServer.post("/cities").send({
      name: "São Paulo",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("object");
  });

  it("Quantidade de caracteres invalidos", async () => {
    const res1 = await testServer.post("/cities").send({
      name: "Sã",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
  });
});
