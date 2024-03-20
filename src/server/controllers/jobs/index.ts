import * as getAll from "./GetAll";
import * as create from "./Create";
import * as getById from "./GetById";
import * as updateById from "./UpdateById";
import * as deleteById from "./DeleteById";

export const JobsController = {
  ...create,
  ...getAll,
  ...getById,
  ...updateById,
  ...deleteById,
};
