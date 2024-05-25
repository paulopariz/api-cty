import { Request, Response } from "express";
import { UsersProvider } from "../../services/users";
import { StatusCodes } from "http-status-codes";

export const getMyUser = async (req: Request, res: Response) => {
  const userId = Number(req.headers.idUser);

  const user = await UsersProvider.getByUser(userId);

  if (user instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Usuário não encontrado!",
      },
    });
  }

  return res.status(StatusCodes.OK).json(user);
};
