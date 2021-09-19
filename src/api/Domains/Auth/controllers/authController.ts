
import { AuthService } from '../services/authService';
import { BaseController } from 'api/baseController';
import { User } from '../../User/models/userModel';

export class AuthController extends BaseController {

    public login = async (body: { email: string; password: string; }) => {
        const data = await AuthService.login(body);

        return this.sendResponse({ data, message: 'Logged In' });
    }

    public signup = async (user: User) => {
        const data = await AuthService.register(user);

        return this.sendResponse({ data, message: 'User registration successful' });
    }

}
