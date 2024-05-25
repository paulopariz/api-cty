import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { IJob } from "../../database/models";
import { JobsProvider } from "../../services/jobs";

interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<IJob, "id" | "favorite_id"> {}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      title: yup.string().required().min(5).max(70),
      description: yup.string().required().min(20).max(350),
      urgency_level: yup.string().nullable().oneOf(["low", "average", "urgent"]),
      languages: yup.string().required(),
      location_type: yup.string().required().oneOf(["company", "remote"]),
      city: yup.string().nullable(),
      min_salary: yup.number().required().positive(),
      max_salary: yup.number().positive().nullable(),
      labels: yup.string().required(),
      contact: yup.string().required(),
      status: yup.string().required().oneOf(["opened", "closed"]),
    })
  ),

  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().required().integer().moreThan(0),
    })
  ),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "O id é obrigatório",
      },
    });
  }

  const result = await JobsProvider.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(result);
};
