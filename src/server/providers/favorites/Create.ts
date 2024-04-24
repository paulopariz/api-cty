import { ETableNames } from "../../database/ETableName";
import { Knex } from "../../database/knex";
import { IFavorite, IJob } from "../../database/models";

interface ICreateResponse {
  id: number;
  job: IJob;
}

export const create = async (fav: Omit<IFavorite, "id">): Promise<ICreateResponse | Error> => {
  try {
    const [result] = await Knex(ETableNames.favorites).insert(fav).returning("*");

    if (typeof result === "object" && result.job_id) {
      const job: IJob | undefined = await Knex(ETableNames.job).where("id", result.job_id).first();

      if (job) {
        return {
          id: result.id,
          job: job,
        };
      }
    }

    return new Error("Erro ao adicionar ao favoritos");
  } catch (error) {
    console.error(error);

    return new Error("Erro ao adicionar ao favoritos");
  }
};
