import cors = require('cors');
import { Express, json, urlencoded } from 'express';
import logger from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { trimInput } from './trimInputs';
import passport from 'passport';
import { jwtStrategy } from './passport';

export default (app: Express) => {
    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
        }),
    );
    app.use(helmet());
    app.use(cors({ maxAge: 1728000 }));
    app.use(urlencoded({ extended: false }));
    app.use(json());
    app.use(logger('dev'));
    app.use(trimInput);

    app.use(passport.initialize());
    passport.use('jwt', jwtStrategy);
};
