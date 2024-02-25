import { ETableNames } from "../../database/ETableName";
import { Knex } from "../../database/knex";

export const count = async (filter = ""): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.cidade)
      .where("name", "like", `%${filter}%`)
      .count<[{ count: number }]>("* count");

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error("Erro ao buscar a quantidade total de registros");
  } catch (error) {
    console.log(error);

    return new Error("Erro ao buscar a quantidade total de registros");
  }
};
