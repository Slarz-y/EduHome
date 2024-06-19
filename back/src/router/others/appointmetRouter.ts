import { Router } from "express";
import { cancelAppointmet, createAppointmet, getAllAppointmets, getAppointmet } from "../../controllers/appointmetController";
import validateId from "../../middleware/thisIsId";

const appointmetRouter : Router = Router();

appointmetRouter.get("/", getAllAppointmets);

appointmetRouter.get("/:id", validateId, getAppointmet);

appointmetRouter.post("/schedule", createAppointmet);

appointmetRouter.put("/cancel/:id", validateId, cancelAppointmet);

export default appointmetRouter; 