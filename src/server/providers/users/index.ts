import * as GetByEmail from "./GetByEmail";
import * as create from "./Create";

export const UsersProvider = {
  ...GetByEmail,
  ...create,
};
