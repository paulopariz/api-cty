import { ETableNames } from "../../database/ETableName";
import { Knex } from "../../database/knex";
import { IPerson } from "../../database/models";

export const create = async (
  person: Omit<IPerson, "id">
): Promise<IPerson | Error> => {
  try {
    const [result] = await Knex(ETableNames.person)
      .insert(person)
      .returning("*");

    const [{ count }] = await Knex(ETableNames.cidade)
      .where("id", "=", person.city_id)
      .count<[{ count: number }]>("* as count");

    if (count === 0) {
      return new Error("Cidade não encontrada");
    }

    if (typeof result === "object") {
      return result;
    }

    return new Error("Erro ao cadastrar");
  } catch (error) {
    console.error(error);

    return new Error("Erro ao cadastrar");
  }
};
