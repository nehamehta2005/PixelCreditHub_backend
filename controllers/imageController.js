import { v4 as uuidv4 } from "uuid";
import MemberImage from "../models/memberImageSchema.js";
import Upload from "../models/uploadSchema.js";
import { Readable } from "stream";
import sharp from "sharp";

//import fileUpload from "express-fileupload";

export const uploadImages = async (req, res, next) => {
  try {
    console.log("Tags and Categories:", req.body.tags, req.body.categories);

    // Check if files were uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    // Assuming "foo" is the field name in your form

    const uploadedFile = req.files.foo; //try to make it array and console to check if it can allows to upload multiple files

    const resizedImageBuffer = await sharp(uploadedFile.data)
      .resize({ width: 1200 }) // Resize image to 800 pixels width (adjust as needed)
      .jpeg({ quality: 70 }) // Compress image to 70% quality JPEG (adjust as needed)
      .toBuffer();

    const tags = req.body.tags;
    const categories = req.body.categories;
    // Accessing file properties
    let timestamp = Date.now();
    const uniqueFilename = `${timestamp}-${uuidv4()}`;

    // Save the file details to the database (replace this with your actual database logic)
    const image = new Upload({
      fileName: uniqueFilename,
      fileSize: resizedImageBuffer.length, //uploadedFile.size,
      data: resizedImageBuffer, //uploadedFile.data,
      imageURL: `http://localhost:5500/images/allimages/${uniqueFilename}`,
      tags: tags.split(" "),
      categories: categories.split(" "),
    });

    await image.save();

    res.send("File uploaded successfully");
  } catch (error) {
    console.error("Error in uploadImages controller:", error);
    next(error);
  }
};

//this code is serving images back to client
export const getAllImages = async (req, res, next) => {
  //console.log(req.params.filename);
  try {
    const image = await Upload.findOne({ fileName: req.params.filename });
    if (image) {
      const readStream = Readable.from(image.data);
      readStream.pipe(res);
    } else {
      res.status(404).send("Image not found");
    }
  } catch (error) {
    res.status(500).send("Error fetching image");
    next(error);
  }
};

//this code is serving images back to client
export const getMemberImage = async (req, res, next) => {
  try {
    const image = await MemberImage.findOne({ filename: req.params.filename });
    if (image) {
      const readStream = Readable.from(image.data);
      readStream.pipe(res);
    }
  } catch (error) {
    res.status(500).send("Error fetching image");
    next(error);
  }
};

export const getAllUploadedImages = async (req, res, next) => {
  const status = req.params.status || "pending";
  try {
    const pendingUploads = await Upload.find({ status });
    if (pendingUploads) {
      res.json(pendingUploads);
      // console.log(pendingUploads);
    }
  } catch (error) {
    console.log("not working");
  }
};

// approveUpload in the database | Status: "approved";
export const approveUpload = async (req, res, next) => {
  const uploadId = req.params.id;
  console.log(req.params);
  try {
    const upload = await Upload.findById(uploadId);

    if (!upload) {
      return res.status(404).json({ error: "Upload not found" });
    }

    upload.status = "approved";
    await upload.save();
    res.json(upload);
  } catch (err) {
    console.log("approv eUpload failed", err);
  }
};

export const denyUpload = async (req, res, next) => {
  const uploadId = req.params.id;

  try {
    const upload = await Upload.findById(uploadId);

    if (!upload) {
      return res.status(404).json({ error: "Upload not found" });
    }
    const deleteUser = await Upload.findByIdAndDelete(upload._id);
    res.json(upload);
  } catch (err) {
    console.log("deny upload failed", err);
  }
};

export const getSearchedImages = async (req, res, next) => {
  const status = "approved";
  const tagsOrCategories = req.params.tag;
  try {
    const searchResult = await Upload.find({
      $or: [
        { tags: { $in: [tagsOrCategories] } },
        { categories: { $in: [tagsOrCategories] } },
      ],
      status,
    });

    if (searchResult) {
      res.json(searchResult);
    } else {
      res.status(400).json({ error: "Invalid tag or category" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};


export const singleImage = async (req, res, next) => {
   
/*   const singleMember = await Member.findOne({name:req.params.singlemember});*/
  console.log(req.params ) 

  try {

    const imageId = req.params.filename;
    const result = await Upload.findOne({ fileName: imageId });

    if (!result || !result.data) {
      res.status(404).send('Image not found');
      return;
    }

    const imageBuffer = Buffer.from(result.data, 'base64');

    res.contentType('image/png');
    res.setHeader('Content-Disposition', `attachment; filename=${imageId}.png`);
    res.send(imageBuffer);
    /* const singleMember = await Member.findOne({
      name: capitalize(req.params.singlemember)
    });

  
    if (singleMember) {
      res.status(200).json(singleMember);
 
    } else {
      res.status(404).json({ error: "Member not found" });
    } */
  } catch (error) {
    next(error);
  }
};


export const updateLikes = async (req, res, next) => {
  console.log(req.body)
  try {
    console.log("like it")
  } catch (error) {
    
  }
}