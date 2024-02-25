import { ETableNames } from "../../database/ETableName";
import { Knex } from "../../database/knex";
import { ICity } from "../../database/models";

export const updateById = async (
  id: number,
  city: Omit<ICity, "id">
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
      .update(city)
      .where("id", "=", id);

    if (result > 0) return;

    return new Error("Erro ao atualizar o registro");
  } catch (error) {
    console.error(error);

    return new Error("Erro ao atualizar o registro");
  }
};
