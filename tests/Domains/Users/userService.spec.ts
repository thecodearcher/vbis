import { UserService } from './../../../src/api/Domains/User/services/userService';
import { UserFactory } from './../../factories/user.factory';

describe('UserService', () => {

    it('should return all users', async () => {
        await UserFactory.make().save();

        const users = await UserService.search({});
        expect(users.length).toBe(1);
    });
});
