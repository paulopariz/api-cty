import { ETableNames } from "./../ETableName";
import { Knex } from "knex";

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.cidade).count<[{ count: number }]>(
    "* as count"
  );
  if (!Number.isInteger(count) || Number(count) > 0) return;

  const cidadesToInsert = citiesAll.map((nameCity) => ({
    name: nameCity,
  }));
  await knex(ETableNames.cidade).insert(cidadesToInsert);
};

const citiesAll = [
  "Rondon",
  "São Paulo",
  "Belo Horizonte",
  "Curitiba",
  "Recife",
  "Brasília",
  "Salvador",
  "Fortaleza",
  "Manaus",
  "Porto Alegre",
];
