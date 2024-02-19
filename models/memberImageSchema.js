import { Schema, model } from "mongoose";

const memberImagesSchema = new Schema({
  filename: String,
  data: {
    type: Buffer,
    required: true,
  },
  // Add any other fields as needed
});

const MemberImage = model('MemberImage', memberImagesSchema);

export default MemberImage;
