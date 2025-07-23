import { Track } from "../../../models/track";
import {
  Box,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import LoadingSpinner from "../../../common/components/LoadingSpinner/LoadingSpinner";

import { useParams } from "react-router";
import useAddplaylist from "../../../hooks/useAddPlaylist";

import ErrorMessage from "../../../common/components/ErrorMessage/ErrorMessage";

interface SearchResultListProps {
  list: Track[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  width: "100%",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiTableCell-root": {
    border: "none",
  },
}));

const AlbumImage = styled("img")({
  width: "40px",
  borderRadius: "4px",
  marginRight: "12px",
});
const SearchResultList = ({
  list,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: SearchResultListProps) => {
  const [ref, inView] = useInView();
  const { id } = useParams<{ id: string }>();

  const { mutate: addPlaylist, error } = useAddplaylist();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  const handleAddPlaylist = (track: Track) => {
    if (!id) return;

    addPlaylist({ playlist_id: id, uris: [track.uri], position: 0 });
    console.log("🚀 ~ handleAddPlaylist ~ track:", track);
  };

  return (
    <Table>
      <TableBody>
        {list.map((track) => (
          <StyledTableRow key={track.id}>
            <TableCell>
              <Box display="flex">
                <AlbumImage src={track.album?.images[0].url} alt="" />
                <Box flexDirection="column">
                  <Typography fontWeight={700}>{track.name}</Typography>
                  <Typography color="text.secondary">
                    {track.artists ? track.artists[0].name : "Unknown Artist"}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>{track.album?.name}</TableCell>
            <TableCell>
              <Button onClick={() => handleAddPlaylist(track)}>Add</Button>
            </TableCell>
          </StyledTableRow>
        ))}
        <TableRow ref={ref}>
          <TableCell>
            <LoadingSpinner />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default SearchResultList;
