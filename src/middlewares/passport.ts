import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { JWT_SECRET, APP_URL } from 'config';

export const jwtStrategy = new JWTStrategy({
    secretOrKey: JWT_SECRET,
    issuer: APP_URL,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}, async (token, done) => {
    // Pass the user details to the next middleware
    return done(null, token.user);
});
