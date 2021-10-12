import mongoose from "mongoose";
import bcrypt from "bcrypt";

export type UserDocument = mongoose.Document & {
  email: string;
  password: string;
  role: string;
  sessionId: string;
  comparePassword: Function;
};

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    sessionId: { type: String, required: false },
  },
  { timestamps: true }
);

userSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

async function comparePassword(password: string, passwordHash: string) {
  const match = await bcrypt.compare(password, passwordHash);
  if (match) {
    return true;
  } else {
    return false;
  }
}

userSchema.methods.comparePassword = comparePassword;
export const User = mongoose.model<UserDocument>("User", userSchema);
