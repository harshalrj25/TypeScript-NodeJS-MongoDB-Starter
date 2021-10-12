import { User, UserDocument } from "../../../models/user.model";

export const isEmailAvailable = async (email: string) => {
  const params: Object = { email };
  return await User.count(params);
};

export const saveUserToDb = async (user: UserDocument) => {
  try {
    const userSchema = new User(user);
    const db = await userSchema.save();
    return db;
  } catch (e) {
    throw e;
  }
};
