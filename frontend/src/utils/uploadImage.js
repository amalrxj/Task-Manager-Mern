import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGES.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Destructure imageUrl directly if your backend returns { imageUrl }
    const { imageUrl } = response.data;

    return imageUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export default uploadImage;
