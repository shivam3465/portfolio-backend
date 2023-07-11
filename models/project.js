import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  projectLink: String,
  desc: String,
  technology: [String],
  image: {
    public_id: String,
    url: String,
  },
  video: {
    public_id: String,
    url: String,
  },
});

export const Project = mongoose.model("projects", projectSchema);
