import { ETableNames } from "../../database/ETableName";
import { Knex } from "../../database/knex";

export const count = async (): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.favorites).count<[{ count: number }]>("* as count");

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error("Erro ao buscar a quantidade total de favoritos");
  } catch (error) {
    console.error(error);

    return new Error("Erro ao buscar a quantidade total de favoritos");
  }
};
