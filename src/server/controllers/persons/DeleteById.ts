import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";

import { PersonProvider } from "../../services/persons/index";

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

    const result = await PersonProvider.deleteById(req.params.id);

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
