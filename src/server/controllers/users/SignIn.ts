import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

import { validation } from "../../shared/middlewares";
import { IUser } from "../../database/models";
import { UsersProvider } from "../../services/users";
import { JWTService, PasswordCrypto } from "../../shared/services";

interface IBodyProps extends Omit<IUser, "id" | "name"> {}

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().email().min(5),
      password: yup.string().required().min(6),
    })
  ),
}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const { email, password } = req.body;

  const user = await UsersProvider.getByEmail(email);

  if (user instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha inválidos",
      },
    });
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(password, user.password);

  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha inválidos",
      },
    });
  } else {
    const accessToken = JWTService.sign({ uid: user.id });

    if (accessToken === "JWT_SECRETE_NOT_FOUND") {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: "Erro ao gerar token de acesso",
        },
      });
    }

    return res.status(StatusCodes.OK).json({ accessToken });
  }
};
