import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const folder = "ecommerce_products";
    const resource_type = file.mimetype.startsWith("video") ? "video" : "image";
    return {
      folder,
      resource_type,
    };
  },
});

export const upload = multer({ storage });
