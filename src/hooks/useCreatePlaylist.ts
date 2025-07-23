import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlaylist } from "../apis/playlistApi";
import useGetCurrentUserProfile from "./useGetCurrentUserProfile";
import { CreatePlaylistRequest } from "../models/playlist";

const useCreatePlaylist = () => {
  const { data: user } = useGetCurrentUserProfile();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreatePlaylistRequest) => {
      if (!user || !user.id) {
        return Promise.reject(new Error("user is not defined"));
      }

      return createPlaylist(user.id, params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
    },
  });
};

export default useCreatePlaylist;
