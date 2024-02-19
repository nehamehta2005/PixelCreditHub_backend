import { Schema, model } from "mongoose";

const downloadSchema = new Schema({
  fileName: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  fileSize: { type: Number, required: true },
  // Other properties related to downloads
});
const Download = model('Download', downloadSchema);

export default Download;
