import { Router } from "express";
import { getAllUsers, loginUser } from "../../controllers/usersController";

const usersRouter : Router = Router();

usersRouter.get("/", getAllUsers);

usersRouter.post("/login", loginUser);

export default usersRouter;