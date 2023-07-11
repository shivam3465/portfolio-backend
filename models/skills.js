import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    public_id: String,
    image_url: String,
  }
});

export const Skill = mongoose.model("Skill", skillSchema);
