import { ETableNames } from "../../database/ETableName";
import { Knex } from "../../database/knex";
import { IUser } from "../../database/models";

export const create = async (
  user: Omit<IUser, "id">
): Promise<IUser | Error> => {
  try {
    const [result] = await Knex(ETableNames.usuario)
      .insert(user)
      .returning("*");

    if (typeof result === "object") {
      return result;
    }

    return new Error("Erro ao cadastrar o registro");
  } catch (error) {
    console.error(error);

    return new Error("Erro ao cadastrar o registro");
  }
};
