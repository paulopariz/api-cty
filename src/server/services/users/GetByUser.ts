import { ETableNames } from "../../database/ETableName";
import { Knex } from "../../database/knex";
import { IUser } from "../../database/models";

interface IDataUser extends Omit<IUser, "password"> {}

export const getByUser = async (idUser: number): Promise<IDataUser | Error> => {
  try {
    const result = await Knex(ETableNames.usuario).where("id", "=", idUser).first();

    if (result) {
      const { name, email, id } = result;
      return { name, email, id };
    }

    return new Error("Registro não encontrado");
  } catch (error) {
    console.error(error);

    return new Error("Erro ao buscar o registro");
  }
};
