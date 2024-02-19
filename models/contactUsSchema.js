import {Schema, model} from "mongoose";

const ContactUsSchema = new Schema({
  firstName: {type: String, required: true},
  email: {type: String, required: true},
 message: {type: String, required: true},

});

const contactUsSchema = model("contactUs", ContactUsSchema);

export default contactUsSchema;