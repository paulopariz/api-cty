import { knex } from "knex";
import { development, production, test } from "./Environment";

const getEnvironmente = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return production;

    case "teste":
      return test;

    default:
      return development;
  }
};

export const Knex = knex(getEnvironmente());
