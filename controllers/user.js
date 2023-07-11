import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { setCookie } from "../utils/setCookies.js";
import { showError } from "../utils/showError.js";
import cloudinary from "cloudinary";
import { SendMail } from "../middleware/sendMail.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      const id = jwt.sign(user.id, process.env.SECRET_KEY);
      setCookie(res, 200, "token", id, 6000000, "Welcome back admin ");
    } else {
      showError(res, 400, "Wrong email or password");
    }
  } catch (error) {
    showError(res, 400, error.message);
  }
};

const logout = (req, res) => {
  setCookie(res, 200, "token", "", 0, "Logged out successfully");
};

const getUserDetails = async (req, res) => {
  const user = await User.findOne({}).select("-email -password");
  res.json({ success: true, user });
};

const addDesc = async (req, res) => {
  try {
    const { desc } = req.body;
    const user = await User.findById(req.user.id);
    user.desc = desc;
    user.save();

    res.json({ success: true, message: "Description updated successfully" });
  } catch (error) {
    showError(res, 400, error.message);
  }
};

const addAbout = async (req, res) => {
  try {
    const { aboutMe } = req.body;
    const user = await User.findById(req.user.id);
    user.aboutMe = aboutMe;
    user.save();

    res.json({
      success: true,
      message: "About Description updated successfully",
    });
  } catch (error) {
    showError(res, 400, error.message);
  }
};

const addProfile = async (req, res) => {
  try {
    const { profile } = req.body;
    const user = await User.findById(req.user.id);

    cloudinary.v2.uploader.destroy(user.aboutPic.public_id);
    const image = await cloudinary.v2.uploader.upload(profile, {
      folder: "portfolio",
    });
    user.aboutPic = image;

    user.save();

    res.json({ success: true, message: "Profile image added successfully" });
  } catch (error) {
    showError(res, 400, error.message);
  }
};

const contactMe = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await SendMail(name, email, message);
    res.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    showError(res, 400, error.message);
  }
};

export {
  login,
  logout,
  getUserDetails,
  addDesc,
  addAbout,
  addProfile,
  contactMe,
};
