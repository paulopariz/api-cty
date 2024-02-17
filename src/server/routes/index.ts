import { Router } from "express";
// import { StatusCodes } from "http-status-codes";

import { CitiesController } from "./../controllers";

const router = Router();

router.get("/cities", CitiesController.getAllValidation, CitiesController.getAll); // prettier-ignore
router.post("/cities",CitiesController.createValidation, CitiesController.create); // prettier-ignore
router.get("/cities/:id", CitiesController.getByIdValidation, CitiesController.getById); // prettier-ignore
router.put("/cities/:id", CitiesController.updateByIdValidation, CitiesController.updateById); // prettier-ignore

export { router };
