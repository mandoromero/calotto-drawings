import axios from "axios";

export const getSuperLotto = async () => {
  try {
    const response = await axios.get("/superlotto"); // backend endpoint
    return response.data;
  } catch (error) {
    console.error("Error fetching SuperLotto data:", error);
    throw error
  }
};