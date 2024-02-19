import { Schema, model } from "mongoose";
import User from "./userSchema.js";

const LikeSchema = new Schema({
  image: { type: Schema.Types.ObjectId, ref: "Upload", required: true  },
  likesCount: { type: Number, default: 0 }, 
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const uploadSchema = new Schema({
  fileName: { type: String, required: true },
  data: { type: Buffer, required: true },
  timestamp: { type: Date, default: Date.now },
  fileSize: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  imageURL: { type: String },
  tags: [{ type: String }],
  categories: [{ type: String }], //add validator so atleast one categgories is there.
  likes: [{ type: Schema.Types.ObjectId, ref: 'Likes' }],
  likesCount: { type: Number, default: 0 },
  likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }] 
  /*  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, */
});
const Likes = model("Like", LikeSchema);
const Upload = model("Upload", uploadSchema);

export { Likes };
export default Upload;

/* likes: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
      // Add any additional fields related to like such as date/time if needed
    }
  ],
  publisher: { type: Schema.Types.ObjectId, ref: 'User' } // Reference to User model for publisher */
