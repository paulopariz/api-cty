import { IJob } from "./Job";

export interface IFavorite {
  id: number;
  job_id?: number;
  user_id?: number;
  job?: IJob;
}
