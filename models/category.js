import { Schema, model } from "mongoose";
 
const CategorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    }

}, {versionKey: false});

const Category = model("Category", CategorySchema);

export default Category;

