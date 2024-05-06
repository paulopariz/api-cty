import { ETableNames } from "../ETableName";
import { Knex } from "knex";

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.job).count<[{ count: number }]>("* as count");
  if (!Number.isInteger(count) || Number(count) > 0) return;

  const jobsToInsert = {
    title: "Desenvolvedor Fullstack PHP Laravel",
    description:
      "Buscamos Desenvolvedor Fullstack com forte experiência em PHP e Laravel. Conhecimentos em JavaScript, Vue.js e bases de dados são essenciais. Procuramos profissionais que possam gerenciar projetos de ponta a ponta, com foco em inovação e soluções escaláveis.",
    urgency_level: "urgent",
    languages: "['php', 'laravel', 'javascript', 'vue']",
    location_type: "remote",
    labels: "['Fullstack', 'PHP', 'Laravel', 'JavaScript']",
    contact: "4499941525512",
    status: "opened",
  };

  console.log("jobsToInsert", jobsToInsert);

  await knex(ETableNames.job).insert(jobsToInsert);
};
