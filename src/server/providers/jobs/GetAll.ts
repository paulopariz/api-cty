import { ETableNames } from "../../database/ETableName";
import { Knex } from "../../database/knex";
import { IJob } from "../../database/models";

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
  id = 0
): Promise<IJob[] | Error> => {
  try {
    const result = await Knex(ETableNames.job)
      .select("*")
      .where("id", Number(id))
      .orWhere("name", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every((item) => item.id !== id)) {
      const resultById = await Knex(ETableNames.job)
        .select("*")
        .where("id", "=", id)
        .first();

      if (resultById) {
        return [...result, resultById];
      }
    }

    return result;
  } catch (error) {
    console.error(error);

    return new Error("Erro ao buscar registros");
  }
};
