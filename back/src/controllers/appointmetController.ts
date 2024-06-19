import { Request, Response } from "express";
import { getAllAppointmetsService, getAppointmetService, createAppointmetService, cancelAppointmetService } from "../services/appointmetService";
import { Appointmet } from "../entities/Appointmet";

export const getAllAppointmets = async (req:Request, res:Response) => {
    const appointmets: Appointmet[] = await getAllAppointmetsService();

    if (appointmets.length === 0) {
        res.status(404).json({ error: "No se encontraron citas" })
    } else {
        res.status(200).json(appointmets);
    }
}

export const getAppointmet = async (req:Request, res:Response) => {
    const id = req.params.id;

    const appointmet: Appointmet | null = await getAppointmetService(parseInt(id));

    if (appointmet) {
        res.status(200).json(appointmet);
    } else {
        res.status(404).json({ error: "Cita no encontrada" })
    }
}

export const createAppointmet = async (req:Request, res:Response) => {
    try {
        const { id , date, time, status } = req.body;
        const newAppointmet = await createAppointmetService(id, { date, time, status });
    
        if (newAppointmet) {
            res.status(201).json(newAppointmet);
        } else {
            res.status(400).json({ error: "No se pudo crear la cita"});
        }
    } catch (error) {
        res.status(400).json({ error: "Algunos parametros ingresados no son validos" });
    }
}

export const cancelAppointmet = async (req:Request, res:Response) => {
    const id = req.params.id;

    if(await cancelAppointmetService(parseInt(id))) res.status(200).json({ message: "Cita cancelada con exito" })  
    else res.status(404).json({ error: "La accion no pudo ser realizada, intentalo de nuevo" })
}