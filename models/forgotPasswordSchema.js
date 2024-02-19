import {Schema, model} from "mongoose";

const ForgotPasswordSchema = new Schema({
  pasword: {type: String, required: true},
  confirmPasswordl: {type: String, required: true},


});

const forgotPasswordSchema = model("forgotPassword", ForgotPasswordSchema);

export default forgotPasswordSchema;