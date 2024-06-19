import { AppDataSource } from "../config/appDataSource";
import CredentialDto from "../dto/credentialDto";
import { Credential } from "../entities/Credential";
import CredentialRepository from "../repositories/CredentialRepository";

export const getAllCredentialService = async (): Promise<Credential[]> => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const credentials: Credential[] = await queryRunner.manager.find(Credential);
        await queryRunner.commitTransaction();
        return credentials;
    } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
    } finally {
        await queryRunner.release();
    }
};

export const createCredential = async (credentialData: CredentialDto): Promise<Credential> => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const newCredential: Credential = queryRunner.manager.create(Credential, credentialData);
        const result: Credential = await queryRunner.manager.save(newCredential);
        await queryRunner.commitTransaction();
        return result;
    } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
    } finally {
        await queryRunner.release();
    }
};

export const validateCredential = async (credentialData: CredentialDto): Promise<boolean> => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const userCredentials: Credential | null = await CredentialRepository.findByUsername(credentialData.username);

        if (userCredentials) {
            const isValid = userCredentials.username === credentialData.username && userCredentials.password === credentialData.password;
            await queryRunner.commitTransaction();
            return isValid;
        } else {
            await queryRunner.commitTransaction();
            return false;
        }
    } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
    } finally {
        await queryRunner.release();
    }
};
