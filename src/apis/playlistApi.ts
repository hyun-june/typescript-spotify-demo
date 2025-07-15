import {
  GetCurrentUserPlaylistRequest,
  GetCurrentUserPlaylistResponse,
} from "../models/playlist";
import api from "../utils/api";

const getCurrentUserPlaylists = async ({
  limit,
  offset,
}: GetCurrentUserPlaylistRequest): Promise<GetCurrentUserPlaylistResponse> => {
  try {
    const response = await api.get(`/me/playlists`, {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    throw new Error("Fail to fetch current user playlists");
  }
};

export default getCurrentUserPlaylists;
