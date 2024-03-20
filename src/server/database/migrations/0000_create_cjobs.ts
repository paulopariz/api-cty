import { Knex } from "knex";
import { ETableNames } from "../ETableName";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.job, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("name", 150).checkLength("<=", 150).index().notNullable();
      table.comment("Tabela para armazenar jobs do sistema");
    })
    .then(() => {
      console.log(`🔥 Created tables ${ETableNames.job}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.job).then(() => {
    console.log(`# Dropped tables ${ETableNames.job}`);
  });
}
