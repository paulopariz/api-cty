import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { IJob } from "../../database/models";
import { JobsProvider } from "../../providers/jobs";

interface IBodyProps extends Omit<IJob, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      title: yup.string().required().min(5).max(70),
      description: yup.string().required().min(20).max(350),
      urgency_level: yup
        .string()
        .nullable()
        .oneOf(["low", "average", "urgent"]),
      languages: yup.array().of(yup.string().required()).required(),
      location_type: yup.string().required().oneOf(["company", "remote"]),
      city: yup.string().nullable(),
      min_salary: yup.number().required().positive(),
      max_salary: yup.number().positive().nullable(),
      labels: yup.array().of(yup.string().required()).required(),
      contact: yup.string().required(),
      status: yup.string().required().oneOf(["opened", "closed"]),
    })
  ),
}));

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const result = await JobsProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
