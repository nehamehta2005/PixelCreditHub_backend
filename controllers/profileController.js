import User from "../models/userSchema.js";
import { Readable } from "stream";

//`http://localhost:5500/profile/profile-image/${foundUser.profileImage.filename}

export const getUserProfileImage = async (req, res, next) => {
  try {
    const { filename } = req.params;
    const user = await User.findOne({ "profileImage.filename": filename });
    if (!user || !user.profileImage) {
      return res.status(404).json({ message: "Profile image not found." });
    }

    const readStream = Readable.from([user.profileImage.data]);
    // Set the appropriate headers for the response
    res.setHeader("Content-Type", "image/*"); // Set the appropriate content type

    // Pipe the stream to the response
    readStream.pipe(res);
  } catch (error) {}
};

export const updateProfileImage = async (req, res, next) => {
  //console.log(req.files);

  try {
    const userId = req.params.userid;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const { name, data } = req.files.profileImage;
    const timestamp = Date.now();
    const profileImageUrl = `http://localhost:5500/profile/profile-image/${name}?t=${timestamp}`;

    const result = await User.findByIdAndUpdate(userId, {
      $set: {
        "profileImage.filename": name,
        "profileImage.data": data,
        profileImageUrl: profileImageUrl,
      },
    });

    if (result) res.send("all good");
  } catch (error) {
    next(error);
  }
};
export const deleteProfileImage = async (req, res, next) => {
  try {
    const userId = req.params.userid;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const profileImageUrl = null;

    const result = await User.findByIdAndUpdate(userId, {
      $set: {
        profileImageUrl: profileImageUrl,
      },
    });

    return res.status(200).send("Profile image deleted successfully");

  } catch (error) {
    next(error);
  } 
};
