import { ETableNames } from "../../database/ETableName";
import { Knex } from "../../database/knex";
import { ICity } from "../../database/models";

export const updateById = async (
  id: number,
  city: Omit<ICity, "id">
): Promise<ICity | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
      .update(city)
      .where("id", "=", id);

    if (result > 0) {
      const updatedCity = await Knex(ETableNames.cidade)
        .where("id", "=", id)
        .first();

      if (updatedCity) {
        return updatedCity;
      } else {
        throw new Error("Cidade não encontrada após atualização");
      }
    }

    return new Error("Nenhuma cidade atualizada");
  } catch (error) {
    console.error(error);
    return new Error("Erro ao atualizar o registro");
  }
};
