import { ETableNames } from "../../database/ETableName";
import { Knex } from "../../database/knex";

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.job).where("id", "=", id).del();

    if (result > 0) {
      return;
    }

    return new Error("Erro ao deletar o registro");
  } catch (error) {
    console.error(error);

    return new Error("Erro ao deletar o registro");
  }
};
