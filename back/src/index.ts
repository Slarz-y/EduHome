import server from "./server";
import { PORT } from "./config/envs";
import { AppDataSource } from "./config/appDataSource";
import { preloadCredentialsData, preloadUsersData } from "./helpers/preloadData";


const initializeApp = async () => {
    await AppDataSource.initialize();

    await preloadCredentialsData();
    await preloadUsersData();
    
    server.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    })
}

initializeApp();
