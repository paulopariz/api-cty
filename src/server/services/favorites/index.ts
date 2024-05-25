import * as create from "./Create";
import * as getAll from "./GetAll";
import * as count from "./Count";
import * as deleteById from "./DeleteById";

export const FavoritesProvider = {
  ...create,
  ...getAll,
  ...count,
  ...deleteById,
};
