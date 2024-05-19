import * as create from "./Create";
import * as getAll from "./GetAll";
import * as deleteById from "./DeleteById";

export const FavoritesController = {
  ...create,
  ...getAll,
  ...deleteById,
};
