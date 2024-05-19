import * as create from "./Create";
import * as getAll from "./GetAll";
import * as deleteById from "./DeleteById";
import * as count from "./Count";

export const FavoritesController = {
  ...create,
  ...getAll,
  ...deleteById,
  ...count,
};
