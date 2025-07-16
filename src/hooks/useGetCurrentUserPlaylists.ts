import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
} from "@tanstack/react-query";

import {
  GetCurrentUserPlaylistRequest,
  GetCurrentUserPlaylistResponse,
} from "../models/playlist";
import { getCurrentUserPlaylists } from "../apis/playlistApi";

const useGetCurrentUserPlaylists = ({
  limit,
  offset,
}: GetCurrentUserPlaylistRequest) => {
  return useInfiniteQuery({
    queryKey: ["current-user-playlists"],
    queryFn: ({ pageParam = 0 }) => {
      {
        return getCurrentUserPlaylists({ limit, offset: pageParam });
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextoffset = url.searchParams.get("offset");
        return nextoffset ? parseInt(nextoffset) : undefined;
      }
      return undefined;
    },
  });
};

export default useGetCurrentUserPlaylists;
