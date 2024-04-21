import { Router } from "express";

import { JobsController, UsersController, FavoritesController } from "../controllers";
import { PersonsController } from "../controllers/persons";
import { ensureAuthenticated } from "../shared/middlewares";

const router = Router();

//user
router.post("/signin", UsersController.signInValidation, UsersController.signIn); // prettier-ignore
router.post("/signup", UsersController.signUpValidation, UsersController.signUp); // prettier-ignore

//jobs
router.get("/jobs", ensureAuthenticated, JobsController.getAllValidation, JobsController.getAll); // prettier-ignore
router.post("/jobs", ensureAuthenticated, JobsController.createValidation, JobsController.create); // prettier-ignore
router.get("/jobs/:id", ensureAuthenticated, JobsController.getByIdValidation, JobsController.getById); // prettier-ignore
router.put("/jobs/:id", ensureAuthenticated, JobsController.updateByIdValidation, JobsController.updateById); // prettier-ignore
router.delete("/jobs/:id", ensureAuthenticated, JobsController.deleteByIdValidation, JobsController.deleteById); // prettier-ignore

//pessoas
router.get("/persons", ensureAuthenticated, PersonsController.getAllValidation, PersonsController.getAll); // prettier-ignore
router.post("/persons", ensureAuthenticated, PersonsController.createValidation, PersonsController.create); // prettier-ignore
router.get("/persons/:id", ensureAuthenticated, PersonsController.getByIdValidation, PersonsController.getById); // prettier-ignore
router.put("/persons/:id", ensureAuthenticated, PersonsController.updateByIdValidation, PersonsController.updateById); // prettier-ignore
router.delete("/persons/:id", ensureAuthenticated, PersonsController.deleteByIdValidation, PersonsController.deleteById); // prettier-ignore

//favorites
router.post("/favorites", ensureAuthenticated, FavoritesController.createValidation, FavoritesController.create); // prettier-ignore

export { router };
