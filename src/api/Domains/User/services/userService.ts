
import { HttpStatusCode } from 'enums';
import { ObjectID } from 'typeorm-plus';
import { AppError } from 'utils';
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

}
