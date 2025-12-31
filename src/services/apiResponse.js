import { axiosInstance } from "../libs/axiosInstance";

const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/Products");

    // Check if the response status is 200
    if (response?.status !== 200) {
      throw new Error("⚠️ Something went wrong");
    }

    // Return the data if status is 200
    return response?.data;
  } catch (error) {
    // Log any error
    console.error(error);
  }
};

export { getAllProducts };
