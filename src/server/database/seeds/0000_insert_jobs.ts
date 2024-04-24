import { ETableNames } from "../ETableName";
import { Knex } from "knex";

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.job).count<[{ count: number }]>("* as count");
  if (!Number.isInteger(count) || Number(count) > 0) return;

  const jobsToInsert = jobsAll.map((jobName) => ({
    title: jobName,
    description: "Descrição padrão para o job.",
    urgency_level: "normal",
    languages: "Português",
    location_type: "remoto",
    city: null,
    min_salary: null,
    max_salary: null,
    labels: "N/A",
    contact: "email@example.com",
    status: "ativo",
  }));
  await knex(ETableNames.job).insert(jobsToInsert);
};

const jobsAll = [
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
