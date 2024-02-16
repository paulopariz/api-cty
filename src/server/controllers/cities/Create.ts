import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import * as yup from "yup";

interface ICity {
  name: string;
}

const bodyValidation: yup.Schema<ICity> = yup.object().shape({
  name: yup.string().required().min(3),
  state: yup.string().required().min(3),
});

export const create = async (req: Request<{}, {}, ICity>, res: Response) => {
  let validatedData: ICity | undefined = undefined;
  try {
    validatedData = await bodyValidation.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach((error) => {
      if (!error.path) return;
      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ errors });
  }

  console.log("va", validatedData);

  return res.send("Create");
};
