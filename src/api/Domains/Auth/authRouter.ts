
import { controllerHandler as call } from 'utils';
import express from 'express';
import { validation } from 'middlewares';
import { AuthController } from './controllers/authController';
import { LoginValidationSchema, SignupValidationSchema } from './utils/authValidation';

const router = express.Router();

const Auth = new AuthController();

router.post('/signup', [validation(SignupValidationSchema)],
    call(Auth.signup, (req, _res, _next) => [req.body]));

router.post('/signin', [validation(LoginValidationSchema)],
    call(Auth.login, (req, _res, _next) => [req.body]));

export const authRouter = router;
