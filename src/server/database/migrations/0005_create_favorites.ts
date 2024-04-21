import { Knex } from "knex";
import { ETableNames } from "../ETableName";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(ETableNames.favorites, (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable(ETableNames.usuario)
      .onDelete("CASCADE");
    table.bigint("job_id").unsigned().references("id").inTable(ETableNames.job).onDelete("CASCADE");
    table.unique(["user_id", "job_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("favorites");
}
