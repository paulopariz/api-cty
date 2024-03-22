import { Knex } from "knex";
import { ETableNames } from "../ETableName";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(ETableNames.job, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("title", 70).checkLength("<=", 70).notNullable().index();
      table.string("description", 350).checkLength("<=", 350).notNullable();
      table
        .enum("urgency_level", ["low", "average", "urgent"])
        .defaultTo("low");
      table.specificType("languages", "TEXT ARRAY").notNullable();
      table.enum("location_type", ["company", "remote"]).notNullable();
      table.string("city").nullable();
      table.decimal("min_salary", 8, 2).notNullable();
      table.decimal("max_salary", 8, 2).nullable();
      table.specificType("labels", "TEXT ARRAY").nullable();
      table.string("contact").notNullable();
      table
        .enum("status", ["opened", "closed"])
        .notNullable()
        .defaultTo("opened");

      table.comment("Tabela para armazenar jobs do sistema");
    })
    .then(() => {
      console.log(`🔥 Created table ${ETableNames.job}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.job).then(() => {
    console.log(`# Dropped tables ${ETableNames.job}`);
  });
}
