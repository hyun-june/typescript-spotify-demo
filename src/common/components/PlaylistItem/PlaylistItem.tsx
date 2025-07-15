import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";

const PlaylistItemContainer = styled(ListItemButton)({});

const PlaylistName = styled(Typography)({
  fontWeight: "bold",
  color: "#1db954",
});

const PlaylistItem = ({ item }) => {
  console.log("🚀 ~ PlaylistItem ~ item:", item);
  return (
    <PlaylistItemContainer>
      <ListItemAvatar>
        <Avatar src={item.images[0].url} />
      </ListItemAvatar>
      <div>
        <ListItemText
          primary={<PlaylistName>{item.name}</PlaylistName>}
          secondary={"Playlist •" + item.owner?.display_name}
        />
      </div>
    </PlaylistItemContainer>
  );
};

export default PlaylistItem;
