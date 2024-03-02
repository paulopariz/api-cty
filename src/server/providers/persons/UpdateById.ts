import { ETableNames } from "../../database/ETableName";
import { Knex } from "../../database/knex";
import { IPerson } from "./../../database/models/Person";

export const updateById = async (
  id: number,
  person: Omit<IPerson, "id">
): Promise<IPerson | Error> => {
  console.log("person", person);

  try {
    const [{ count }] = await Knex(ETableNames.cidade)
      .where("id", "=", person.city)
      .count<[{ count: number }]>("* as count");

    if (count === 0) {
      return new Error("Cidade não encontrada");
    }

    const result = await Knex(ETableNames.person)
      .update(person)
      .where("id", id);

    console.log("result", result);

    if (result > 0) {
      const updatedPerson = await Knex(ETableNames.person)
        .where("id", "=", id)
        .first();

      if (updatedPerson) {
        return updatedPerson;
      } else {
        throw new Error("Pessoa não encontrada após atualização");
      }
    }

    return new Error("Nenhum registro foi atualizada");
  } catch (error) {
    console.error(error);
    return new Error("Erro ao atualizar o registro");
  }
};
