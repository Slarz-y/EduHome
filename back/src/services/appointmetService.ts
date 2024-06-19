import { AppDataSource } from "../config/appDataSource";
import appointmentDto from "../dto/appointmetDto";
import { Appointmet } from "../entities/Appointmet";
import { User } from "../entities/User";
import AppointmetRepository from "../repositories/AppointmetRepository";
import { getUserService } from "./userService";

export const getAllAppointmetsService = async (): Promise<Appointmet[]> => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const appointmets: Appointmet[] = await queryRunner.manager.find(Appointmet);
        await queryRunner.commitTransaction();
        return appointmets;
    } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
    } finally {
        await queryRunner.release();
    }
};

export const getAppointmetService = async (id: number): Promise<Appointmet | null> => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const appointmet: Appointmet | null = await AppointmetRepository.findById(id);
        await queryRunner.commitTransaction();
        return appointmet;
    } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
    } finally {
        await queryRunner.release();
    }
};

export const createAppointmetService = async (id: number, appointmetData: appointmentDto): Promise<Appointmet | null> => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const user: User | null = await getUserService(id);
        
        if (user) {
            const newAppointmet: Appointmet = queryRunner.manager.create(Appointmet, appointmetData);
            newAppointmet.user = user;
            const result: Appointmet = await queryRunner.manager.save(newAppointmet);
            await queryRunner.commitTransaction();
            return result;
        } else {
            await queryRunner.rollbackTransaction();
            return null;
        }
    } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
    } finally {
        await queryRunner.release();
    }
};

export const cancelAppointmetService = async (id: number): Promise<boolean> => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const appointmet: Appointmet | null = await getAppointmetService(id);
        
        if (appointmet) {
            appointmet.status = false;
            await queryRunner.manager.save(appointmet);
            await queryRunner.commitTransaction();
            return true;
        } else {
            await queryRunner.rollbackTransaction();
            return false;
        }
    } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
    } finally {
        await queryRunner.release();
    }
};
