import { ETableNames } from "../../database/ETableName";
import { Knex } from "../../database/knex";
import { IJob } from "../../database/models";

export const updateById = async (
  id: number,
  job: Omit<IJob, "id">
): Promise<IJob | Error> => {
  try {
    const result = await Knex(ETableNames.job).update(job).where("id", "=", id);

    if (result > 0) {
      const updatedJob = await Knex(ETableNames.job)
        .where("id", "=", id)
        .first();

      if (updatedJob) {
        return updatedJob;
      } else {
        throw new Error("Job não encontrada após atualização");
      }
    }

    return new Error("Nenhuma job atualizada");
  } catch (error) {
    console.error(error);
    return new Error("Erro ao atualizar o registro");
  }
};
