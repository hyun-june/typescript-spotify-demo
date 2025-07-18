import { styled, TableCell, TableRow } from "@mui/material";
import { PlaylistTrack } from "../../../models/playlist";
import { Episode, Track } from "../../../models/track";
import moment from "moment";

interface DesktopPlaylistItemProps {
  index: number;
  item: PlaylistTrack;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
}));

const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
  const isEpisode = (track: Track | Episode): track is Episode => {
    return "description" in track;
  };
  return (
    <StyledTableRow>
      <TableCell>{index}</TableCell>
      <TableCell>{item.track.name || "no name"}</TableCell>
      <TableCell>
        {isEpisode(item.track) ? "N/A" : item.track.album?.name}
      </TableCell>

      <TableCell>
        {item.added_at ? moment(item.added_at).format("YYYY-MM-DD") : "Unknown"}
      </TableCell>
      <TableCell>{moment(item.track.duration_ms).format("mm:ss")}</TableCell>
    </StyledTableRow>
  );
};

export default DesktopPlaylistItem;
