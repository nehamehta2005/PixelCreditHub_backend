import {Schema, model} from "mongoose";

const memberSchema = new Schema({
  name: String,
  lastname: String,
  role: String,
  like: String,
  url: String,
  github: String,
  linkedin: String,
  twitter: String,
  whatsapp: String,
});

const Member = model('Member', memberSchema);

export default Member;
