import { Response, Request, NextFunction, Router } from "express";
import { UserDocument } from "../../models/user.model";
import { info } from "../../models/info.model";
import passport from "passport";
import * as signUpService from "./services/signup.service";
import * as signInService from "./services/signin.service";

export const signIn = async (req: Request, res: Response) => {
  try {
    let user: UserDocument;
    user = <UserDocument>await _promisifiedPassportAuthentication(req, res);
    const { sessionID } = req;
    const updatedUser: UserDocument = await signInService.updateSessionId(
      user,
      sessionID
    );
    const filteredData = signInService.filterUserData(updatedUser);
    return res.send(filteredData);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const _promisifiedPassportAuthentication = (req: Request, res: Response) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "local",
      (err: Error, user: UserDocument, info: info) => {
        if (err) reject(err);
        if (!user) reject(info);
        req.logIn(user, function (err) {
          if (err) {
            return reject(err);
          }
          return resolve(user);
        });
      }
    )(req, res);
  });
};

export const signUp = async (req: Request, res: Response) => {
  const user: UserDocument = req.body;
  try {
    const count: number = await signUpService.isEmailAvailable(user.email);
    if (count) {
      return res.status(500).send();
    }
    const response: UserDocument = await signUpService.saveUserToDb(user);
    if (!response) {
      return res.status(500).send();
    }
    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
  }
};

export const signOut = async (req: Request, res: Response) => {
  try {
    const _id = req.body._id as string;
    if (_id) {
      await signInService.removeSessionId(_id);
      req.logout();
      return res.send({ message: "logged out succesfully" });
    } else {
      return res.status(500).send({ message: "something went wrong" });
    }
  } catch (e) {
    return res.status(500).send({ message: "something went wrong" });
  }
};
