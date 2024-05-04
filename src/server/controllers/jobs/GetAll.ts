import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { JobsProvider } from "../../providers/jobs";

interface IQueryProps {
  id?: number;
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      id: yup.number().integer().optional().default(0),
      page: yup.number().optional().moreThan(0),
      limit: yup.number().optional().moreThan(0),
      filter: yup.string().optional(),
    })
  ),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  const result = await JobsProvider.getAll(
    req.query.page || 1,
    req.query.limit || 10,
    req.query.filter || "",
    Number(req.query.id || 0)
  );

  const count = await JobsProvider.count(req.query.filter);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: count.message,
      },
    });
  }

  res.setHeader("access-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", count);

  const transformResult = result.data.map((job) => {
    let labels;
    if (job?.labels) {
      try {
        labels = JSON.parse(job?.labels.replace(/'/g, '"'));
      } catch (e) {
        console.error("Error parsing labels:", e);
        labels = [];
      }
    } else {
      labels = [];
    }
    let languages;
    try {
      languages = JSON.parse(job?.languages.replace(/'/g, '"'));
    } catch (e) {
      console.error("Error parsing languages:", e);
      languages = [];
    }

    return {
      ...job,
      labels,
      languages,
    };
  });

  const response = {
    ...result,
    data: transformResult,
  };

  return res.status(StatusCodes.OK).json(response);
};
