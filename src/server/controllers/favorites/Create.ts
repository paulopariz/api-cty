import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { IFavorite } from "../../database/models";
import { FavoritesProvider } from "../../providers/favorites";

interface IBodyProps extends Omit<IFavorite, "id" | "job"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      job_id: yup.number().required(),
      user_id: yup.number().required(),
    })
  ),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await FavoritesProvider.create(req.body);

  if (result instanceof Error) {
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    if (result.message === "Already in your favorites") {
      statusCode = StatusCodes.CONFLICT;
    }

    return res.status(statusCode).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
