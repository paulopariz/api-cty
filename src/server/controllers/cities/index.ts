import * as create from "./Create";
import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as updateById from "./UpdateById";

export const CitiesController = {
  ...create,
  ...getAll,
  ...getById,
  ...updateById,
};
