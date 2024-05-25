import { ETableNames } from "../../database/ETableName";
import { Knex } from "../../database/knex";
import { IJob } from "../../database/models";

export const create = async (job: Omit<IJob, "id">): Promise<IJob | Error> => {
  try {
    const [result] = await Knex(ETableNames.job).insert(job).returning("*");

    if (typeof result === "object") {
      return result;
    }

    return new Error("Erro ao cadastrar o registro");
  } catch (error) {
    console.error(error);

    return new Error("Erro ao cadastrar o registro");
  }
};
