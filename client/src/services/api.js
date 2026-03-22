import axios from "axios";

export const getLotteryData = async (gameName) => {
  try {
    const response = await axios.get(`/api/lotto/${encodeURIComponent(gameName)}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message);
  }
};