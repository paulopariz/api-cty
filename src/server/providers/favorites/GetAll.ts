import { ETableNames } from "../../database/ETableName";
import { Knex } from "../../database/knex";
import { IFavorite } from "../../database/models";
import { IPaginationResponse } from "../../shared/services";

export const getAll = async (
  page: number,
  limit: number,
  idUser: number
): Promise<IPaginationResponse<IFavorite> | Error> => {
  try {
    const result = await Knex(ETableNames.favorites)
      .join(ETableNames.job, `${ETableNames.favorites}.job_id`, `${ETableNames.job}.id`)
      .where(`${ETableNames.favorites}.user_id`, idUser)
      .select(`${ETableNames.favorites}.id as favoriteId`, `${ETableNames.job}.*`)
      .paginate({
        perPage: limit,
        currentPage: page,
        isLengthAware: true,
      });

    const favorite = result.data.map((job) => ({
      id: 1,
      job: {
        ...job,
      },
    }));

    const response: IPaginationResponse<IFavorite> = {
      current_page: result.pagination.currentPage,
      to: result.pagination.to,
      data: favorite,
      total: result.pagination.total,
      per_page: result.pagination.perPage,
    };

    return response;
  } catch (error) {
    console.error("Erro ao buscar registros:", error);
    throw new Error("Erro ao buscar registros");
  }
};
