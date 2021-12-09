import mongoose from 'mongoose';
import config from './config';

(async () => {

    try {
        const options = {
            "authSource": "admin",
            "user": `${config.DB_USER}`,
            "pass": `${config.DB_PASSWORD}`
        };
    
        const db = await mongoose.connect(`mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`, 
            options
        );
        console.log('DATABASE CONNECTED', db.connection.name)
    } catch (error) {
        console.log(error);
    }
})()