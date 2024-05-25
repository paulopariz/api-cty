import * as getByEmail from "./GetByEmail";
import * as getByUser from "./GetByUser";
import * as create from "./Create";

export const UsersProvider = {
  ...getByEmail,
  ...getByUser,
  ...create,
};
