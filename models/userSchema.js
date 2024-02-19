import { Schema, model } from "mongoose";
import Image from "./imageSchema.js";
import Upload from "./uploadSchema.js";
import Download from "./downloadSchema.js";

const profileImageSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  uploaded_at: {
    type: Date,
    default: Date.now,
  },
});

// User schema with references to Upload, Download, and Image
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  profileImage: {
    filename: String,
    data: Buffer,
  },
  profileImageUrl: { type: String }, //createOne here
  uploads: [{ type: Schema.Types.ObjectId, ref: "Upload" }],
  downloads: [{ type: Schema.Types.ObjectId, ref: "Download" }],
  images: [{ type: Schema.Types.ObjectId, ref: "Image" }],
  likedImages: [{ type: Schema.Types.ObjectId, ref: "Upload" }],
  recoveryEmail: { type: String }, 
  mobileNumber: { type: String },
  securityQuestion:{ type: String },
  securityAnswer: {type: String},

});
const ProfileImage = model("ProfileImage", profileImageSchema);
const User = model("User", userSchema);

export { ProfileImage };
export default User;

/* import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  basicInfo: {
    birthDate: { type: Number, required: true },
    birthMonth: { type: Number, required: true },
    birthYear: { type: Number, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
  },
  pixelAddress: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (value) {
        const existingUser = await this.constructor.findOne({
          pixelAddress: value,
        });
        return !existingUser;
      },
      message: "Pixel address is already in use.",
    },
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  profileImage: {
    filename: String,
    data: Buffer,
  },
  profileImageUrl:{ type: String},//createOne here

  uploads: [{ type: Schema.Types.ObjectId, ref: "Upload" }],
  downloads: [{ type: Schema.Types.ObjectId, ref: "Download" }],
  images: [{ type: Schema.Types.ObjectId, ref: "Image" }],
  recoveryEmail: { type: String }, // You might want to add validations for email format
  mobileNumber: { type: String },
  termsAndConditionsAccepted: { type: Boolean, required: true },
});

 
const User = model("User", userSchema);

export default User;
 */
