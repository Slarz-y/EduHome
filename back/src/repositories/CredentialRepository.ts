import { AppDataSource } from "../config/appDataSource";
import { Credential } from "../entities/Credential";

const CredentialRepository = AppDataSource.getRepository(Credential).extend({
    async findByUsername (username: string) {
        const credential = await this.findOneBy({ username: username });
        return credential
    },

    async thisUsernameExist (username: string) {
        const credential = await this.findOneBy({ username: username});
        if (credential) return true
        else return false
    },
})

export default CredentialRepository;