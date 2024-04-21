import { Knex } from "knex";
import { ETableNames } from "../ETableName";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(ETableNames.job, (table) => {
    table.decimal("min_salary", 8, 2).nullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(ETableNames.job, (table) => {
    table.decimal("min_salary", 8, 2).notNullable().alter();
  });
}
