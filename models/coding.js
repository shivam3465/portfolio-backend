import mongoose from "mongoose";

const codingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image:{
    public_id: String,
    image_url: String,
  },
  profileLink: {
    type: String,
    required: true,
  },
});

export const Coding = mongoose.model("codingProfile", codingSchema);
