import Image from '../models/imageSchema.js';

export async function approveImage(imageId, adminId) {
  try {
    const image = await Image.findById(imageId);

    if (!image) {
      throw new Error("Image not found");
    }

    if (image.status !== "pending") {
      throw new Error("Image status is not pending");
    }

    image.status = "approved";
    image.admin_id = adminId;
    image.approved_at = new Date();

    await image.save();
    return image;
  } catch (error) {
    console.error(error);
    throw new Error("Error approving image");
  }
}

export async function handleImageApproval(req, res) {
  const { imageId, adminId } = req.body; // Assuming imageId and adminId are in the request body

  try {
    const approvedImage = await approveImage(imageId, adminId);
    res.json(approvedImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
