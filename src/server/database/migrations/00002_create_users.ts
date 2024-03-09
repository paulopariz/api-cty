import { Knex } from "knex";
import { ETableNames } from "../ETableName";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.user, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("name").notNullable().checkLength(">", 3);
      table.string("email").index().unique().notNullable().checkLength(">", 5);
      table.string("password").notNullable().checkLength(">", 6);

      table.comment("Tabela para armazenar usuarios no sistema");
    })
    .then(() => {
      console.log(`🔥 Created tables ${ETableNames.user}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.user).then(() => {
    console.log(`# Dropped tables ${ETableNames.user}`);
  });
}
