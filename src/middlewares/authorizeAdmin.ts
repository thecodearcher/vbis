import { UserService } from 'api';
import { HttpStatusCode } from 'enums';
import { NextFunction, Request, Response } from 'express';
import { AppError } from 'utils';
import passport from 'passport';
import { convertToObjectID } from 'utils/helpers';

/**
 * middleware for authorizing admin requests
 */
export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {

    passport.authenticate('jwt', { session: false }, async (error, token) => {

        if (error || !token) {
            return next(new AppError('Unauthorized', null, HttpStatusCode.UNAUTHORIZED));
        }

        try {
            const user = await UserService.find(convertToObjectID(token.id));

            if (!user || user.role !== 'admin') {

                return next(new AppError('Unauthorized', null, HttpStatusCode.UNAUTHORIZED));

            }

            req.user = user;

            next();

        } catch (error) {

            return next(error);

        }

    })(req, res, next);
};
