import { ETableNames } from "../../database/ETableName";
import { Knex } from "../../database/knex";
import { IPerson } from "./../../database/models/Person";

export const getAll = async (
  page: number,
  limit: number,
  filter: string
): Promise<IPerson[] | Error> => {
  try {
    const result = await Knex(ETableNames.person)
      .select("*")
      .where("name", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    console.error(error);

    return new Error("Erro ao buscar registros");
  }
};
