import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
    unique: true,
  },
  pin: { type: String, required: true, minlength: 4, maxlength: 99999, unique: true },
});

const User = mongoose.model("User", userSchema);
const ApplicationUserModel = User;
export { ApplicationUserModel as User };
