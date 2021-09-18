import express from 'express';
import { BASE_PATH } from './config';
import { errorHandler, global } from './middlewares';
import { logger } from './utils';
import 'reflect-metadata';
import { initializeDb } from './db';

class App {
    public express = express();
    protected basePath = BASE_PATH || '';

    constructor() {
        this.boot();
    }

    private boot() {
        initializeDb();
        this.registerMiddlewares();
        this.mountRoutes();
        this.handleUncaughtErrorEvents();

    }

    private mountRoutes() {

    }

    private registerMiddlewares() {
        global(this.express);
    }

    // Error handlers
    private handleUncaughtErrorEvents() {
        process.on('unhandledRejection', (reason, promise) => {
            throw reason;
        });

        process.on('uncaughtException', (error) => {
            logger.error(`Uncaught Exception: ${500} - ${error.message}, Stack: ${error.stack}`);
            process.exit(1);
        });

        process.on('SIGINT', () => {
            logger.info(' Alright! Bye bye!');
            process.exit();
        });

        this.express.use(errorHandler);

    }
}

const app = new App().express;
export default app;
