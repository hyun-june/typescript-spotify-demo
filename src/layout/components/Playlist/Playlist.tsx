import PlaylistItem from "../../../common/components/PlaylistItem/PlaylistItem";

const Playlist = ({ playlists }) => {
  console.log("🚀 ~ Playlist ~ playlists:", playlists);

  return (
    <div>
      {playlists.map((item) => (
        <PlaylistItem item={item} />
      ))}
    </div>
  );
};

export default Playlist;
