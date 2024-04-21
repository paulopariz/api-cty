import { Knex } from "knex";
import { ETableNames } from "../ETableName";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(ETableNames.job, (table) => {
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(ETableNames.job, (table) => {
    table.dropColumn("created_at");
  });
}
