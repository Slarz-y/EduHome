import { AppDataSource } from "../config/appDataSource";
import { Appointmet } from "../entities/Appointmet";

const AppointmetRepository = AppDataSource.getRepository(Appointmet).extend({
    async findById(id: number) {
        const appointmet = this.findOneBy({ id });
        return appointmet;
    }
})

export default AppointmetRepository;