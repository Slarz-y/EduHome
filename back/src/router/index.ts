import { Router } from "express";
import userRouter from "./others/userRouter";
import appointmetRouter from "./others/appointmetRouter";
import usersRouter from "./others/usersRouter";

const router : Router = Router();

router.use("/users", usersRouter);
router.use("/user", userRouter);
router.use("/turns", appointmetRouter);

export default router;