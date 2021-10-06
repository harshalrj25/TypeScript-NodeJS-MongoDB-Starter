import mongoose from "mongoose";

export type RoleModel = {
  name: string;
};

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Role = mongoose.model("Role", roleSchema);
export default Role;
