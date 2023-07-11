import { Coding } from "../models/coding.js";
import { showError } from "../utils/showError.js";
import cloudinary from "cloudinary";

export const allCodingProfiles = async (req, res) => {
  try {
    const codingProfiles = await Coding.find({});
    res.json({ success: true, codingProfiles });
  } catch (error) {
    showError(res, 400, error.message);
  }
};

export const addCodingProfile = async (req, res) => {
  try {
    const { name, image ,profileLink} = req.body;
    const img = await cloudinary.v2.uploader.upload(image, {
      folder: "portfolio",
    });

    await Coding.create({
      name,
      profileLink,
      image: { public_id: img.public_id, image_url: img.secure_url },
    });

    res.json({ success: true, message: "Coding Profile added successfully" });
  } catch (error) {
    showError(res, 400, error.message);
  }
};

export const deleteCodingsProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Coding.findById(id);    
    cloudinary.v2.uploader.destroy(profile.image.public_id);
    profile.deleteOne();
    res.json({ success: true, message: "Coding Profile deleted successfully" });
  } catch (error) {
    showError(res, 400, error.message);
  }
};
