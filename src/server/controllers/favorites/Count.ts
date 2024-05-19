import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IFavorite } from "../../database/models";
import { FavoritesProvider } from "../../providers/favorites";

interface IHeadersProps extends Pick<IFavorite, "user_id"> {}

export const getCount = async (req: Request<{}, {}, IHeadersProps>, res: Response) => {
  const user_id = Number(req.headers["idUser"]);

  const result = await FavoritesProvider.count(user_id);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(result);
};
