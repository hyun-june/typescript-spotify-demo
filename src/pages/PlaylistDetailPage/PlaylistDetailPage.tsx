import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import { Grid, styled, Typography } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import theme from "./../../theme";
import { Box, maxWidth } from "@mui/system";
import DefaultImage from "../../common/components/DefaultImage/DefaultImage";

const PlaylistHeader = styled(Grid)({
  display: "flex",
  alignItems: "center",
  background: " linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)",
  padding: "16px",
});

const ImageGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));

const AlbumImage = styled("img")(({ theme }) => ({
  borderRadius: "8px",
  height: "auth",
  width: "100%",

  [theme.breakpoints.down("md")]: {
    maxWidth: "200px",
  },
}));

const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  textAlign: "left",

  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
}));

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  if (id === undefined) return <Navigate to="/" />;
  const { data: playlist } = useGetPlaylist({ playlist_id: id });
  console.log("🚀 ~ PlaylistDetailPage ~ playlist:", playlist);

  return (
    <PlaylistHeader container spacing={7}>
      <ImageGrid item sm={12} md={10}>
        {playlist?.images ? (
          <AlbumImage src={playlist?.images[0].url} />
        ) : (
          <DefaultImage>
            <MusicNoteIcon fontSize="large" />
          </DefaultImage>
        )}
      </ImageGrid>
      <Grid item sm={12} md={10}>
        <Box>
          <ResponsiveTypography variant="h1" color="white">
            {playlist?.name}
          </ResponsiveTypography>

          <Box display="flex" alignItems="center">
            <img
              src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"
              width="20px"
            />
            <Typography
              variant="subtitle1"
              color="white"
              ml={1}
              fontWeight={700}
            >
              {playlist?.owner?.display_name
                ? playlist?.owner.display_name
                : "unknown"}
            </Typography>
            <Typography variant="subtitle1" color="white">
              • {playlist?.tracks?.total} songs
            </Typography>
          </Box>
        </Box>
      </Grid>
    </PlaylistHeader>
  );
};

export default PlaylistDetailPage;
