import mongoose from "mongoose";
import { RoleModel } from "./role.model";

export type UserModel = {
  username: string;
  email: string;
  password: string;
  role: RoleModel;
};

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
