import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as create from "./Create";
import * as updateById from "./UpdateById";

export const PersonsController = {
  ...getAll,
  ...getById,
  ...create,
  ...updateById,
};
