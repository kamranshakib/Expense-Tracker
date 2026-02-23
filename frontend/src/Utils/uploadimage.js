// Utils/uploadImage.js
import { API_PATHS } from "./apiPaths";
import axiosinstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axiosinstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data; // { imageUrl: "uploads/filename.jpg" }
  } catch (error) {
    console.error("Error uploading the image:", error);
    throw error;
  }
};

export default uploadImage;
