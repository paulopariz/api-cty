import { IJob, IPerson, IUser } from "../../models";

declare module "knex/types/tables" {
  interface Tables {
    job: IJob;
    pessoa: IPerson;
    usuario: IUser;
  }
}
