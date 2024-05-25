import { ETableNames } from "../../database/ETableName";
import { Knex } from "../../database/knex";

export const count = async (user_id: number): Promise<object | Error> => {
  try {
    const count = await Knex(ETableNames.favorites)
      .count("* as count")
      .where("user_id", "=", user_id)
      .first();

    if (typeof count === "object") {
      return count;
    }

    return new Error("Erro ao buscar a quantidade total de favoritos");
  } catch (error) {
    console.error(error);

    return new Error("Erro ao buscar a quantidade total de favoritos");
  }
};
