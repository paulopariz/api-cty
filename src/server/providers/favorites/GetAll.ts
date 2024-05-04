import { ETableNames } from "../../database/ETableName";
import { Knex } from "../../database/knex";
import { IFavorite } from "../../database/models";

export const getAll = async (
  page: number,
  limit: number
  //   filter: string,
): Promise<IFavorite[] | Error> => {
  try {
    const result = await Knex(ETableNames.favorites)
      .join(ETableNames.job, `${ETableNames.favorites}.job_id`, `${ETableNames.job}.id`)
      .where(`${ETableNames.favorites}.user_id`, 2)
      .select(`${ETableNames.favorites}.id as favoriteId`, `${ETableNames.job}.*`)
      .offset((page - 1) * limit)
      .limit(limit);

    const favorites = result.map((row) => ({
      id: row.favoriteId,
      job: { ...row },
    }));

    return favorites;
  } catch (error) {
    console.error(error);

    return new Error("Erro ao buscar registros");
  }
};
