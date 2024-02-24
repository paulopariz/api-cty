import { ETableNames } from "../../database/ETableName";
import { Knex } from "../../database/knex";
import { ICity } from "../../database/models";

export const create = async (
  city: Omit<ICity, "id">
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.cidade)
      .insert(city)
      .returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    return Error("Erro ao cadastrar o registro");
  } catch (error) {
    console.error(error);

    return Error("Erro ao cadastrar o registro");
  }
};
