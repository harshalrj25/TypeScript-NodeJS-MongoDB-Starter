import passport, { use } from "passport";
import passportLocal from "passport-local";
import { User, UserDocument } from "../models/user.model";
import { NativeError } from "mongoose";

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user: any, done) => {
  done(null, user["_id"] ?? user);
});

passport.deserializeUser(async (userId, done) => {
  const user = await User.findById(userId);
  done(null, user);
});

export const local = new LocalStrategy(
  { usernameField: "email" },
  (email, password, done) => {
    User.findOne(
      { email: email.toLowerCase() },
      (err: NativeError, user: UserDocument) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(undefined, false, {
            message: `Email ${email} not found.`,
          });
        }
        user.comparePassword(password, user.password).then((res: Boolean) => {
          if (res) {
            return done(undefined, user);
          } else {
            return done(undefined, false, {
              message: `Password is incorrect.`,
            });
          }
        });
      }
    );
  }
);
passport.use("local", local);
export default passport;
