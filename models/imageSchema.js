  import { Schema, model } from "mongoose";

const imageSchema = new Schema({
  filename: String,
  data: Buffer,
  /* user_id: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  }, */
  image_url: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
 /*  admin_id: {
    type: Schema.Types.ObjectId,
    ref: "Admin", // Reference to the Admin model
    default: null,
  }, */
  tags: [
    {
      type: String,
    },
  ],
  uploaded_at: {
    type: Date,
    default: Date.now,
  },
/*   approved_at: {
    type: Date,
    default: null,
  },
  rejected_at: {
    type: Date,
    default: null,
  },
    */
});

const Image = model("Image", imageSchema);

export default Image;