import { ENVIRONMENT } from '../config';

import { logger } from '../utils';

export default (err, req, res, next) => {
    if (!err.isOperational || err.status >= 500) {
        if (ENVIRONMENT == 'production') {
            logger.error(
                'An unexpected error occurred please restart the application!',
                '\nError: ' + err.message + ' Stack: ' + err.stack,
            );
            process.exit(1);
        } else {
            logger.error(
                `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${
                req.ip
                } - Stack: ${err.stack}`);
        }
    }

    const errorDetails = {
        status: false,
        message: err.message,
        data: err.data,
        stack: err?.stack,
    };

    if (ENVIRONMENT === 'production') {
        delete (errorDetails.stack);
    }

    res.status(err.statusCode || 500);
    return res.json(errorDetails);
};
