import { useMutation, useQueryClient } from "@tanstack/react-query";
import useGetCurrentUserProfile from "./useGetCurrentUserProfile";
import { addPlaylist } from "../apis/playlistApi";
import { AddPlaylistRequest } from "../models/playlist";

const useAddplaylist = () => {
  const { data: user } = useGetCurrentUserProfile();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: AddPlaylistRequest) => {
      if (user) {
        return addPlaylist(params);
      }

      return Promise.reject(new Error("user is not defined"));
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["current-user-playlists"],
      });
      queryClient.invalidateQueries({
        queryKey: ["playlist-detail", variables.playlist_id],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "playlist-items",
          { playlist_id: variables.playlist_id, limit: 10 },
        ],
      });
    },
  });
};

export default useAddplaylist;
