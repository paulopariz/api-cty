import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Usuário não autenticado",
      },
    });
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Usuário não autenticado",
      },
    });
  }

  if (token !== "teste") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Usuário não autenticado",
      },
    });
  }

  return next();
};
