import { createConnection } from 'typeorm-plus';
import { ENVIRONMENT, DB_HOST, DB_USER, DB_NAME } from '../config';
import { logger } from '../utils';

export async function initializeDb() {

    if (ENVIRONMENT === 'test') {

        return;

    }

    try {
        await createConnection({
            type: 'mongodb',
            host: DB_HOST,
            port: 27017,
            username: DB_USER,
            database: DB_NAME,
            synchronize: false,
            migrations: ['/src/db/migrations/*.ts'],
            entities: ['**/api/**/*Model.js'],
            useUnifiedTopology: true,
            logging: true,
        });

        logger.info('Database connection has been established successfully.');
    } catch (err) {

        throw new Error(('Unable to connect to the database:' + err));

    }
}
