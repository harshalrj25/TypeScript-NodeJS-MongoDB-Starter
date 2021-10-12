import passport, { use } from "passport";
import passportLocal from "passport-local";
import bearerStrategy from "passport-http-bearer";
import { User, UserDocument } from "../models/user.model";
import Session from "../models/session.model";
import { NativeError } from "mongoose";

const LocalStrategy = passportLocal.Strategy;
const BearerStrategy = bearerStrategy.Strategy;

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

export const bearer = new BearerStrategy(function (token, done) {
  process.nextTick(() => {
    Session.find({ _id: token }).then(async (docs: any) => {
      if (docs.length > 0) {
        const user = await User.findOne({ sessionId: docs[0]._id });
        if (user) {
          return done(undefined, user);
        } else {
          return done(undefined, false);
        }
      } else {
        return done(undefined, false);
      }
    });
  });
});

passport.use("local", local);
passport.use("bearer", bearer);
export default passport;
