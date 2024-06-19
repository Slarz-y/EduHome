import { AppDataSource } from "../config/appDataSource";
import UserDto from "../dto/userDto";
import { Credential } from "../entities/Credential";
import { User } from "../entities/User";

export const getAllUsersService = async (): Promise<User[]> => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const users: User[] = await queryRunner.manager.find(User);
        await queryRunner.commitTransaction();
        return users;
    } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
    } finally {
        await queryRunner.release();
    }
};

export const getUserService = async (id: number): Promise<User | null> => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const user = await queryRunner.manager.findOne(User, { where: { id } });
        await queryRunner.commitTransaction();
        return user;
    } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
    } finally {
        await queryRunner.release();
    }
};

export const registerUserService = async (credentials: Credential, userData: UserDto): Promise<User> => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const newUser: User = queryRunner.manager.create(User, userData);
        newUser.credential = credentials;
        
        const result: User = await queryRunner.manager.save(newUser);
        await queryRunner.commitTransaction();
        return result;
    } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
    } finally {
        await queryRunner.release();
    }
};