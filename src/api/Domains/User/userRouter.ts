import { authorize } from 'middlewares/authorization';
import express from 'express';
import { validation } from 'middlewares';
import { controllerHandler as call } from '../../../utils/controllerHandler';
import { UserController } from './controllers/userController';
import { UpdateUserValidationSchema } from './utils/userValidation';
import { authorizeAdmin } from 'middlewares/authorizeAdmin';

const router = express.Router();

const User = new UserController();

router.use(authorize);

router.get('/me', call(User.view, (req, _res, _next) => [req.user.id]));

router.patch('/me', [validation(UpdateUserValidationSchema)], call(User.update, (req, _res, _next) => [req.user.id, req.body]));

router.use(authorizeAdmin);

router.get('/', call(User.search, (req, _res, _next) => [req.query]));

router.get('/:id', call(User.view, (req, _res, _next) => [req.params.id]));

router.patch('/:id', [validation(UpdateUserValidationSchema)], call(User.update, (req, _res, _next) => [req.params.id, req.body]));

router.delete('/:id', call(User.delete, (req, _res, _next) => [req.params.id]));

export const userRouter = router;
