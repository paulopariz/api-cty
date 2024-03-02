import * as getAll from "./GetAll";
import * as create from "./Create";

export const PersonsController = {
  ...create,
  ...getAll,
};
