import { ETableNames } from "../../database/ETableName";
import { Knex } from "../../database/knex";
import { ICity } from "../../database/models";

export const getById = async (id: number): Promise<ICity | Error> => {
  console.log("id", id);

  try {
    const result = await Knex(ETableNames.cidade)
      .select("*")
      .where("id", "=", id)
      .first();

    if (result) return result;

    return new Error("Registro não encontrado");
  } catch (error) {
    console.error(error);

    return new Error("Erro ao buscar o registro");
  }
};
