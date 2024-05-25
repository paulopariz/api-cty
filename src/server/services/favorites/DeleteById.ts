import { IFavorite } from "../../database/models/Favorite";
import { ETableNames } from "../../database/ETableName";
import { Knex } from "../../database/knex";

export const deleteById = async (fav: IFavorite): Promise<void | Error> => {
  try {
    // verifica se pertence ao usuário
    const favorite = await Knex(ETableNames.favorites)
      .where({ id: fav.id, user_id: fav.user_id })
      .first();

    if (!favorite) {
      return new Error("Favorite not found or does not belong to the user");
    }

    const result = await Knex(ETableNames.favorites)
      .where({ id: fav.id, user_id: fav.user_id })
      .del();

    if (result > 0) {
      return;
    }

    return new Error("Error deleting the record");
  } catch (error) {
    console.error(error);
    return new Error("Error deleting the record");
  }
};
