import { ETableNames } from "../../database/ETableName";
import { Knex } from "../../database/knex";
import { IJob } from "../../database/models";

import { IPaginationResponse, attachPaginate } from "../../shared/services";

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
  id = 0
): Promise<IPaginationResponse<IJob> | Error> => {
  try {
    attachPaginate();

    const result = await Knex(ETableNames.job)
      .select("*")
      .where("id", Number(id))
      .orWhere("title", "like", `%${filter}%`)
      .paginate({
        perPage: Number(limit),
        currentPage: Number(page),
        isLengthAware: true,
      });

    const response: IPaginationResponse<IJob> = {
      current_page: result.pagination.currentPage,
      to: result.pagination.to,
      data: result.data,
      total: result.pagination.total,
      per_page: result.pagination.perPage,
    };

    return response;
  } catch (error) {
    console.error(error);
    return new Error("Erro ao buscar registros");
  }
};
