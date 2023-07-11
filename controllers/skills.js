import { Skill } from "../models/skills.js";
import { showError } from "../utils/showError.js";
import cloudinary from "cloudinary";

export const allSkills = async (req, res) => {
  try {
    const skills = await Skill.find({});
    res.json({ success: true, skills });
  } catch (error) {
    showError(res, 400, error.message);
  }
};

export const addSkill = async (req, res) => {
  try {
    const { name, image } = req.body;
    const img = await cloudinary.v2.uploader.upload(image, {
      folder: "portfolio",
    });

    await Skill.create({
      name,
      image: { public_id: img.public_id, image_url: img.secure_url },
    });

    res.json({ success: true, message: "skill added successfully" });
  } catch (error) {
    showError(res, 400, error.message);
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findById(id);    
    cloudinary.v2.uploader.destroy(skill.image.public_id);
    skill.deleteOne();
    res.json({ success: true, message: "skill deleted successfully" });
  } catch (error) {
    showError(res, 400, error.message);
  }
};
