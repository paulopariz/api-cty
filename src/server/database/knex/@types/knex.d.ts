import { IJob, IPerson, IUser, IFavorite } from "../../models";

declare module "knex/types/tables" {
  interface Tables {
    job: IJob;
    favorites: IFavorite;
    pessoa: IPerson;
    usuario: IUser;
  }
}
