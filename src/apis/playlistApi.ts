import { isAxiosError } from "axios";
import {
  AddPlaylistRequest,
  CreatePlaylistRequest,
  GetCurrentUserPlaylistRequest,
  GetCurrentUserPlaylistResponse,
  GetPlaylistItemsRequest,
  GetPlaylistItemsResponse,
  GetPlaylistRequest,
  Playlist,
} from "../models/playlist";
import api from "../utils/api";

export const getCurrentUserPlaylists = async ({
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

export const getPlaylist = async (
  params: GetPlaylistRequest
): Promise<Playlist> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error("Fail to fetch playlist detail");
  }
};

export const getPlaylistItems = async (
  params: GetPlaylistItemsRequest
): Promise<GetPlaylistItemsResponse> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}/tracks`, {
      params,
    });
    return response.data;
  } catch (error) {
    // throw new Error("Fail to fetch playlist items");

    throw error;
  }
};

export const createPlaylist = async (
  user_id: string,
  params: CreatePlaylistRequest
): Promise<Playlist> => {
  try {
    const { name, playPublic, collaborative, description } = params;
    const response = await api.post(`/users/${user_id}/playlists`, {
      name,
      public: playPublic,
      collaborative,
      description,
    });
    return response.data;
  } catch (error) {
    throw new Error("Fail to create playlist");
  }
};

export const addPlaylist = async (
  params: AddPlaylistRequest
): Promise<{ snapshot_id: string }> => {
  try {
    const { playlist_id, uris, position } = params;
    const response = await api.post(`/playlists/${playlist_id}/tracks`, {
      uris,
      position,
    });
    return response.data;
  } catch (error) {
    throw new Error("Fail to add playlist");
  }
};
