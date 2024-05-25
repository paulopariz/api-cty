import * as getAll from "./GetAll";
import * as deleteById from "./DeleteById";
import * as updateById from "./UpdateById";
import * as getById from "./GetById";
import * as create from "./Create";
import * as count from "./Count";

export const JobsProvider = {
  ...getAll,
  ...getById,
  ...deleteById,
  ...updateById,
  ...create,
  ...count,
};
