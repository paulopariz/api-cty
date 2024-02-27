import { ETableNames } from "../../database/ETableName";
import { Knex } from "../../database/knex";
import { ICity } from "../../database/models";

export const create = async (
  city: Omit<ICity, "id">
): Promise<ICity | Error> => {
  try {
    const [result] = await Knex(ETableNames.cidade).insert(city).returning("*");

    if (typeof result === "object") {
      return result;
    }

    return Error("Erro ao cadastrar o registro");
  } catch (error) {
    console.error(error);

    return Error("Erro ao cadastrar o registro");
  }
};
