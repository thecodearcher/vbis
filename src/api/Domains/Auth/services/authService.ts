
import { UserService } from 'api/Domains/User/services/userService';
import jwt from 'jsonwebtoken';
import { AppError } from 'utils';
import { JWT_SECRET, JWT_EXPIRY_TIME, APP_URL } from 'config';
import bcrypt from 'bcrypt';
import { HttpStatusCode } from 'enums';
import { User } from '../../User/models/userModel';

export class AuthService {

    public static login = async ({ email, password }) => {

        const user = await UserService.find(email);

        if (!user) {

            throw new AppError('Invalid email or password entered!', { email, password }, HttpStatusCode.NOT_FOUND);

        }

        /* Compare password against hash */
        if (!bcrypt.compareSync(password, user.password)) {

            throw new AppError('Invalid email or password entered!', null, HttpStatusCode.NOT_FOUND);

        }

        const accessToken = this.generateAccessToken(user);

        await UserService.edit(user.id as unknown as string, { lastLogIn: new Date() });

        return { accessToken, user };
    }

    public static async register(userData: User) {

        const exEmailUser = await UserService.find(userData.email);

        if (exEmailUser) {

            throw new AppError(`An account with ${exEmailUser.email} already exists!`);

        }

        userData.password = this.generatePasswordHash(userData.password);

        const user = await UserService.create(userData);

        const accessToken = this.generateAccessToken(user);

        return { accessToken, user };

    }

    private static generatePasswordHash(password: string): string {
        return bcrypt.hashSync(password, 10);
    }

    private static generateAccessToken(user: User) {

        const payload = {
            sub: user.id,
            iss: APP_URL,
            user: { id: user.id },
        };

        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY_TIME });

    }

}
