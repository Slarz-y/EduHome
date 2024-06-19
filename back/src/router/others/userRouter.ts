import { Router } from "express";
import { registerUser, getUser } from "../../controllers/usersController";
import validateId from "../../middleware/thisIsId";

const userRouter : Router = Router();

userRouter.get("/:id", validateId, getUser);

userRouter.post("/register", registerUser);

export default userRouter;