import { AppDataSource, CredentialModel, UserModel } from "../config/appDataSource";
import { Credential } from "../entities/Credential";
import { User } from "../entities/User";

const preloadUsers = [
    {
        name: "Angelito",
        email: "Angelito@gmail.com",
        birthdate: "2024-06-03",
        nDni: 101231231
    },
    {
        name: "Angelito",
        email: "Angelito@gmail.com",
        birthdate: "2024-06-03",
        nDni: 101231231
    },
    {
        name: "Angelito",
        email: "Angelito@gmail.com",
        birthdate: "2024-06-03",
        nDni: 101231231
    },
    {
        name: "Angelito",
        email: "Angelito@gmail.com",
        birthdate: "2024-06-03",
        nDni: 101231231
    }
];

const preloadCredentials = [
    {
        username: "angel_af01",
        password: "12345"
    },
    {
        username: "angel_af02",
        password: "12345"
    },
    {
        username: "angel_af03",
        password: "12345"
    },
    {
        username: "angel_af04",
        password: "12345"
    }
];

export const preloadCredentialsData = async () => {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();

    try {
        await queryRunner.startTransaction();

        const existingCredentials = await queryRunner.manager.find(Credential);

        if (existingCredentials.length) {
            console.log("No se realizó la precarga de credenciales: Datos ya existentes");
            await queryRunner.rollbackTransaction();
            return;
        }
    
        await Promise.all(
            preloadCredentials.map(async (credential) => {
                const newCredential = queryRunner.manager.create(Credential, credential);
                await queryRunner.manager.save(Credential, newCredential);
            })
        );

        await queryRunner.commitTransaction();
        console.log("Precarga de credenciales realizada con éxito");
    } catch (error) {
        await queryRunner.rollbackTransaction();
        console.error("Error durante la precarga de credenciales:", error);
    } finally {
        await queryRunner.release();
    }
};

export const preloadUsersData = async () => {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();

    try {
        await queryRunner.startTransaction();

        const users = await queryRunner.manager.find(User);

        if (users.length) {
            console.log("No se realizó la precarga de usuarios: Datos ya existentes");
            await queryRunner.rollbackTransaction();
            return;
        }
        
        const savedCredentials = await queryRunner.manager.find(Credential);

        if (savedCredentials.length !== preloadUsers.length) {
            console.log("No se realizó la precarga de usuarios: El número de credenciales no coincide con el número de usuarios");
            await queryRunner.rollbackTransaction();
            return;
        }

        await Promise.all(
            preloadUsers.map(async (user, index) => {
                const newUser = queryRunner.manager.create(User, user);
                newUser.credential = savedCredentials[index];
                await queryRunner.manager.save(User, newUser);
            })
        );

        await queryRunner.commitTransaction();
        console.log("Precarga de usuarios realizada con éxito");
    } catch (error) {
        await queryRunner.rollbackTransaction();
        console.error("Error durante la precarga de usuarios:", error);
    } finally {
        await queryRunner.release();
    }
};