import { Knex } from "knex";
import { ETableNames } from "../ETableName";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.pessoa, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("name").index().notNullable();
      table.string("email").unique().notNullable();
      table
        .bigInteger("job")
        .index()
        .notNullable()
        .references("id")
        .inTable(ETableNames.job)
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");

      table.comment("Tabela para armazenar pessoa no sistema");
    })
    .then(() => {
      console.log(`🔥 Created tables ${ETableNames.pessoa}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.pessoa).then(() => {
    console.log(`# Dropped tables ${ETableNames.pessoa}`);
  });
}
