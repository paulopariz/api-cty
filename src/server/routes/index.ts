import { Router } from "express";
// import { StatusCodes } from "http-status-codes";

import { CitiesController, UsersController } from "./../controllers";
import { PersonsController } from "../controllers/persons";

const router = Router();

//cidades
router.get("/cities", CitiesController.getAllValidation, CitiesController.getAll); // prettier-ignore
router.post("/cities", CitiesController.createValidation, CitiesController.create); // prettier-ignore
router.get("/cities/:id", CitiesController.getByIdValidation, CitiesController.getById); // prettier-ignore
router.put("/cities/:id", CitiesController.updateByIdValidation, CitiesController.updateById); // prettier-ignore
router.delete("/cities/:id", CitiesController.deleteByIdValidation, CitiesController.deleteById); // prettier-ignore

//pessoas
router.get("/persons", PersonsController.getAllValidation, PersonsController.getAll); // prettier-ignore
router.post("/persons", PersonsController.createValidation, PersonsController.create); // prettier-ignore
router.get("/persons/:id", PersonsController.getByIdValidation, PersonsController.getById); // prettier-ignore
router.put("/persons/:id", PersonsController.updateByIdValidation, PersonsController.updateById); // prettier-ignore
router.delete("/persons/:id", PersonsController.deleteByIdValidation, PersonsController.deleteById); // prettier-ignore

//user
router.post("/signin", UsersController.signInValidation, UsersController.signIn); // prettier-ignore
router.post("/signup", UsersController.signUpValidation, UsersController.signUp); // prettier-ignore

export { router };
