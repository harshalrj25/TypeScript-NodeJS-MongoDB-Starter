import { User, UserDocument } from "../../../models/user.model";
import _ from "lodash";

const updateUser = async (params: Object, update: Object) => {
  const updatedUser = await User.findOneAndUpdate(params, update, {
    new: true,
  });
  return updatedUser;
};

export const updateSessionId = async (
  user: UserDocument,
  sessionId: string
) => {
  const { _id } = user;
  const params = { _id };
  const update = { $set: { sessionId } };
  return await updateUser(params, update);
};

export const filterUserData = (userData: UserDocument) => {
  const keys = [
    "_id",
    "firstName",
    "lastName",
    "email",
    "role",
    "isActive",
    "sessionId",
  ];
  return _.pick(userData, keys);
};

export const removeSessionId = async (_id: string) => {
  const params = { _id };
  const update = { $unset: { sessionId: "" } };
  return await updateUser(params, update);
};
