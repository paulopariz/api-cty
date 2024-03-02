import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as create from "./Create";

export const PersonsController = {
  ...getAll,
  ...getById,
  ...create,
};
