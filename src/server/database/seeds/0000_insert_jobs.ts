import { ETableNames } from "../ETableName";
import { Knex } from "knex";

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.job).count<[{ count: number }]>("* as count");
  if (!Number.isInteger(count) || Number(count) > 0) return;

  const jobsToInsert = {
    title: "Vaga para desenvolvedor Nodejs",
    description: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    urgency_level: "low",
    languages: JSON.stringify(["js", "node", "vue"]),
    location_type: "remote",
    city: "sdf",
    labels: JSON.stringify(["Jùnior", "Node", "Back-End"]),
    contact: "4499941525512",
    status: "opened",
  };

  await knex(ETableNames.job).insert(jobsToInsert);
};
