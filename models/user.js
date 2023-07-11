import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  desc: String,
  aboutMe: String,
  aboutPic: {
    public_id: String,
    url: String,
  },
});

export const User = mongoose.model("User", userSchema);
