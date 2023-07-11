import { Project } from "../models/project.js";
import { showError } from "../utils/showError.js";
import cloudinary from "cloudinary";

export const allProject = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json({ success: true, projects });
  } catch (error) {
    showError(res, 400, error.message);
  }
};

export const addProject = async (req, res) => {
  try {
    const { name, image, video, desc, projectLink, technology } = req.body;
    const img = await cloudinary.v2.uploader.upload(image, {
      folder: "portfolio",
    });

    
    const uploadedVideo = await cloudinary.v2.uploader.upload(video, {
      resource_type: "video",
      folder: "portfolio",
    });

    await Project.create({
      name,
      projectLink,
      desc,
      technology,
      image: { public_id: img.public_id, url: img.secure_url },
      video: {
        public_id: uploadedVideo.public_id,
        url: uploadedVideo.secure_url,
      },
    });

    res.json({ success: true, message: "Project added successfully" });
  } catch (error) {
    showError(res, 400, error.message);
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    cloudinary.v2.uploader.destroy(project.image.public_id);
    project.deleteOne();
    res.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    showError(res, 400, error.message);
  }
};
