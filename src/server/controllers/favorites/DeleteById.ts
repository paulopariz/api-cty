import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { FavoritesProvider } from "../../services/favorites";

import { IFavorite } from "./../../database/models/Favorite";

interface IDataFavorite extends Omit<IFavorite, "job_id" | "job"> {}

interface IParamProps {
  id?: number;
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().required().integer().moreThan(0),
    })
  ),
}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
  try {
    if (!req.params.id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          default: "O id é obrigatório",
        },
      });
    }

    const userId = Number(req.headers["idUser"]);

    const favoriteAndUser: IDataFavorite = {
      user_id: userId,
      id: req.params.id,
    };

    const result = await FavoritesProvider.deleteById(favoriteAndUser);

    if (result instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: result.message,
        },
      });
    }

    return res.status(StatusCodes.OK).json({ message: "Registro deletado com sucesso" });
  } catch (error) {
    console.error("e", error);
  }
};
