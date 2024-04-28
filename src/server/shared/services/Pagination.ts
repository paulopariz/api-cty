export { attachPaginate } from "knex-paginate";

export interface IPaginationResponse<T> {
  current_page: number;
  data: T[];
  total: number;
  to: number;
  per_page: number;
}
