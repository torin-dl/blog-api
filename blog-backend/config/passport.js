import passport from "passport";
import { JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { prisma } from "../lib/prisma";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "cerulean",
};

passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: jwt_payload.id,
                },
            });

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    }),
);
