import { Knex } from "knex";
import { ETableNames } from "../ETableName";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.cidade, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("name", 150).checkLength("<=", 150).index().notNullable();
      table.comment("Tabela para armazenar cidades do sistema");
    })
    .then(() => {
      console.log(`🔥 Created tables ${ETableNames.cidade}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.cidade).then(() => {
    console.log(`# Dropped tables ${ETableNames.cidade}`);
  });
}
