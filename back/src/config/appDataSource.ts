import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import { Appointmet } from "../entities/Appointmet";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "eduhome_db",
    dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User, Credential, Appointmet],
    subscribers: [],
    migrations: [],
})

export const UserModel = AppDataSource.getRepository(User);
export const CredentialModel = AppDataSource.getRepository(Credential);
export const AppointmetModel = AppDataSource.getRepository(Appointmet);