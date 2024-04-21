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
      urgency_level: yup.string().nullable().oneOf(["low", "average", "urgent"]),
      languages: yup.string().required(),
      location_type: yup.string().required().oneOf(["company", "remote"]),
      city: yup.string().when("location_type", {
        is: (val: string) => val === "company",
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      }),
      min_salary: yup.number().required().positive(),
      max_salary: yup.number().positive().nullable(),
      labels: yup.string().required(),
      contact: yup.string().required(),
      status: yup.string().required().oneOf(["opened", "closed"]),
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
    city: req.body.location_type === "company" ? req.body.city : undefined,
  };

  return res.status(StatusCodes.CREATED).json(transformResult);
};
