import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { IJob } from "../../database/models";
import { JobsProvider } from "../../services/jobs";

interface IBodyProps extends Omit<IJob, "id" | "favorite_id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      title: yup.string().required().min(5).max(70),
      description: yup.string().required().min(20).max(350),
      urgency_level: yup
        .string()
        .nullable()
        .oneOf(["low", "average", "urgent"] as const),
      languages: yup.string().required(),
      location_type: yup.string().required().oneOf(["company", "remote"]),
      city: yup.string().when("location_type", {
        is: (val: string) => val === "company",
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.nullable().oneOf([null, undefined]),
      }),
      min_salary: yup.number().positive().nullable(),
      max_salary: yup.number().positive().nullable(),
      labels: yup.string().required(),
      contact: yup.string().required(),
      status: yup
        .string()
        .required()
        .oneOf(["opened", "closed"] as const),
    })
  ),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await JobsProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  const transformResult = {
    ...req.body,
    min_salary: req.body.min_salary ? req.body.min_salary : undefined,
    max_salary: req.body.max_salary ? req.body.max_salary : undefined,
    city: req.body.location_type === "company" ? req.body.city : undefined,
  };

  return res.status(StatusCodes.CREATED).json(transformResult);
};
