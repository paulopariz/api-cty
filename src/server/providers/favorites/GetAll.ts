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
      .select(`${ETableNames.favorites}.id as favorite_id`, `${ETableNames.job}.*`)
      .paginate({
        perPage: limit,
        currentPage: page,
        isLengthAware: true,
      });

    const transformResult = result.data.map((fav) => {
      const parseArrayString = (string: string) => {
        try {
          return JSON.parse(string.replace(/'/g, '"'));
        } catch (e) {
          return [];
        }
      };

      const labels = parseArrayString(fav?.labels);
      const languages = parseArrayString(fav?.languages);
      const favId = Number(fav.favorite_id);

      return {
        id: favId,
        job: {
          ...fav,
          labels,
          languages,
        },
      };
    });

    const response: IPaginationResponse<IFavorite> = {
      current_page: result.pagination.currentPage,
      to: result.pagination.to,
      data: transformResult,
      total: result.pagination.total,
      per_page: result.pagination.perPage,
    };

    return response;
  } catch (error) {
    console.error("Erro ao buscar registros:", error);
    throw new Error("Erro ao buscar registros");
  }
};
