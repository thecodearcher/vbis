import { UserService } from '../services/userService';
import { BaseController } from '../../../baseController';
import { User } from '../models/userModel';

export class UserController extends BaseController {

    public search = async ({ page, limit }) => {

        const [users, meta] = await UserService.search({ page, limit });

        return this.sendResponse({ data: users, meta });
    }

    public view = async (userId: string) => {

        const user = await UserService.view(userId);

        return this.sendResponse({ data: user });
    }

    public update = async (userId: string, userInfo: User) => {

        const user = await UserService.edit(userId, userInfo);

        return this.sendResponse({ data: user, message: 'User information successfully updated' });
    }

    public delete = async (userId: string) => {

        const user = await UserService.delete(userId);

        return this.sendResponse({ data: user, message: 'User successfully deleted' });
    }
}
