import { AuthService } from 'api/Domains/Auth/services/authService';
import { BasePaginatedMeta } from 'api/baseInterface';
import { HttpStatusCode } from 'enums';
import { toNumber } from 'lodash';
import { ObjectID } from 'typeorm-plus';
import { AppError } from 'utils';
import { convertToObjectID } from 'utils/helpers';
import { User } from './../models/userModel';

export class UserService {

    public static async find(identifier: ObjectID | string, throwException: boolean = false): Promise<User> {

        let user: User;

        if (typeof identifier === 'string') {

            user = await User.findOne({ email: identifier });

        } else {

            user = await User.findOne({ where: { _id: identifier } });
        }

        if (!user && throwException) {

            throw new AppError('User not found', identifier, HttpStatusCode.NOT_FOUND);

        }

        return user;
    }

    public static async create(userInfo: User): Promise<User> {

        const existingUser = await this.find(userInfo.email);

        if (existingUser) {

            throw new AppError('User already registered', userInfo, HttpStatusCode.CONFLICT);

        }

        return await User.create(userInfo).save();
    }

    public static async view(departmentId: string): Promise<User> {

        return await this.find(convertToObjectID(departmentId), true);

    }

    public static async search({ limit = 10, page = 1 }): Promise<[User[], BasePaginatedMeta]> {

        const currentPage = toNumber(page);

        const take = toNumber(limit);

        const skip = take * (currentPage - 1);

        const [departments, total] = await User.findAndCount({
            order: { createdAt: 'DESC' },
            take, skip: skip >= 0 ? skip : take,
        });

        const totalPages = Math.ceil(total / limit);

        return [departments, {
            currentPage,
            total,
            limit: take,
            nextPage: totalPages > currentPage ? currentPage + 1 : null,
            prevPage: currentPage > 1 ? currentPage - 1 : null,
            totalPages,
        }];

    }

    public static async edit(departmentId: string, userInfo: Partial<User>): Promise<User> {
        const user = await this.find(convertToObjectID(departmentId), true);

        if (userInfo.password) {

            userInfo.password = AuthService.generatePasswordHash(userInfo.password);

        }

        await User.update(user, userInfo, { reload: true });

        await user.reload();

        return user;
    }

    public static async delete(departmentId: string): Promise<void> {
        const user = await this.find(convertToObjectID(departmentId), true);

        await User.delete(user);

        return;
    }

}
