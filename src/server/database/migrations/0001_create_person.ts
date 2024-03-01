import { Knex } from "knex";
import { ETableNames } from "../ETableName";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.person, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("name").index().notNullable();
      table.string("email").unique().notNullable();
      table
        .bigInteger("city_id")
        .index()
        .notNullable()
        .references("id")
        .inTable(ETableNames.cidade)
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");

      table.comment("Tabela para armazenar pessoa no sistema");
    })
    .then(() => {
      console.log(`# Created tables ${ETableNames.person}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.person).then(() => {
    console.log(`# Dropped tables ${ETableNames.person}`);
  });
}
