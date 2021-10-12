import mongoose from "mongoose";
export type RoleDocument = mongoose.Document & {
  name: string;
};

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Role = mongoose.model<RoleDocument>("Role", roleSchema);
export default Role;
