import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";

const searchItemBykeyword = async (token, params) => {
  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}/search?${keyword}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new Error("fail to search by keyword");
  }
};
