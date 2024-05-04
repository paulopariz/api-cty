import * as signIn from "./SignIn";
import * as signUp from "./SignUp";
import * as me from "./Me";

export const UsersController = {
  ...signIn,
  ...signUp,
  ...me,
};
