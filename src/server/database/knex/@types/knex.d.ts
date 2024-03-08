import { IPerson } from "./../../models/Person";
import { ICity } from "../../models/City";

declare module "knex/types/tables" {
  interface Tables {
    cidade: ICity;
    pessoa: IPerson;
    // usuario: IUsuario
  }
}
