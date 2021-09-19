import { convertToObjectID } from 'utils/helpers';
import { UserService } from 'api/Domains/User/services/userService';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { AppError } from 'utils';
import { HttpStatusCode } from 'enums';

/**
 * middleware for checking authorization with jwt
 */
export const authorize = (req: Request, res: Response, next: NextFunction) => {

    passport.authenticate('jwt', { session: false }, async (error, token) => {

        if (error || !token) {
            return next(new AppError('Unauthorized', null, HttpStatusCode.UNAUTHORIZED));
        }

        try {
            const user = await UserService.find(convertToObjectID(token.id));

            if (!user) {

                return next(new AppError('Unauthorized', null, HttpStatusCode.UNAUTHORIZED));

            }

            req.user = user;

            next();

        } catch (error) {

            return next(error);

        }

    })(req, res, next);
};
