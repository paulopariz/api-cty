import { Router } from "express";

import { CitiesController, UsersController } from "./../controllers";
import { PersonsController } from "../controllers/persons";
import { ensureAuthenticated } from "../shared/middlewares";

const router = Router();

//cidades
router.get("/cities", ensureAuthenticated, CitiesController.getAllValidation, CitiesController.getAll); // prettier-ignore
router.post("/cities", ensureAuthenticated, CitiesController.createValidation, CitiesController.create); // prettier-ignore
router.get("/cities/:id", ensureAuthenticated, CitiesController.getByIdValidation, CitiesController.getById); // prettier-ignore
router.put("/cities/:id", ensureAuthenticated, CitiesController.updateByIdValidation, CitiesController.updateById); // prettier-ignore
router.delete("/cities/:id", ensureAuthenticated, CitiesController.deleteByIdValidation, CitiesController.deleteById); // prettier-ignore

//pessoas
router.get("/persons", ensureAuthenticated, PersonsController.getAllValidation, PersonsController.getAll); // prettier-ignore
router.post("/persons", ensureAuthenticated, PersonsController.createValidation, PersonsController.create); // prettier-ignore
router.get("/persons/:id", ensureAuthenticated, PersonsController.getByIdValidation, PersonsController.getById); // prettier-ignore
router.put("/persons/:id", ensureAuthenticated, PersonsController.updateByIdValidation, PersonsController.updateById); // prettier-ignore
router.delete("/persons/:id", ensureAuthenticated, PersonsController.deleteByIdValidation, PersonsController.deleteById); // prettier-ignore

//user
router.post("/signin", UsersController.signInValidation, UsersController.signIn); // prettier-ignore
router.post("/signup", UsersController.signUpValidation, UsersController.signUp); // prettier-ignore

export { router };
