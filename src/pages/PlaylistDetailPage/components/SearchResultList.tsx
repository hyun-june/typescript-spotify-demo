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

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);
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
              <Button>Add</Button>
            </TableCell>
          </StyledTableRow>
        ))}
        {/* {isFetchingNextPage && (
          <TableRow ref={ref} sx={{ height: "1px" }}>
            <TableCell>
              무한스크롤
              <LoadingSpinner />
            </TableCell>
          </TableRow>
        )} */}
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
