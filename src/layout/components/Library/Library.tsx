import { styled } from "@mui/material";
import useGetCurrentUserPlaylists from "../../../hooks/useGetCurrentUserPlaylists";
import EmptyPlaylist from "../EmptyPlaylist/EmptyPlaylist";
import Playlist from "../Playlist/Playlist";

const PlaylistContainer = styled("div")({});

const Library = () => {
  const { data: userPlaylists } = useGetCurrentUserPlaylists({
    limit: 10,
    offset: 0,
  });

  console.log("🚀 ~ Library ~ data:", userPlaylists);
  return userPlaylists ? (
    userPlaylists.items.length > 0 ? (
      <PlaylistContainer>
        <Playlist playlists={userPlaylists.items} />
      </PlaylistContainer>
    ) : (
      <EmptyPlaylist />
    )
  ) : null; // 로딩 전에는 아무것도 안 보이게
};

export default Library;
