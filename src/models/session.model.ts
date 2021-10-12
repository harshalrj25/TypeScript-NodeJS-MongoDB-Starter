import mongoose from "mongoose";

const session = new mongoose.Schema({
  _id: { type: String },
  session: { type: String },
  expires: { type: Date },
});
const Session = mongoose.model("sessions", session);
export default Session;
