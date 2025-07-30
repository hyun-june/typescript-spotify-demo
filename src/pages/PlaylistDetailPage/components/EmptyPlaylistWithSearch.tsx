import {
  Box,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import SearchResultList from "./SearchResultList";
import LoadingSpinner from "./../../../common/components/LoadingSpinner/LoadingSpinner";
import SearchIcon from "@mui/icons-material/Search";

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",

  "& .MuiInputBase-root": {
    borderRadius: "4px",
    backgroundColor: theme.palette.action.active,
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "gray",
    },
    "&.Mui-focused fieldset": {
      borderColor: "gray",
    },
  },
}));

const EmptyPlaylistWithSearch = () => {
  const [keyword, setKeyword] = useState<string>("");
  const {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track],
  });

  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e) return;
    setKeyword(e.target.value);
  };
  const tracks = data?.pages.flatMap((page) => page.tracks?.items ?? []) ?? [];
  const hasResults = tracks.length > 0;

  return (
    <Box>
      <Typography variant="h1" my="10px">
        Let's find something for your playlist
      </Typography>
      <StyledTextField
        value={keyword}
        onChange={handleSearchKeyword}
        autoComplete="off"
        variant="outlined"
        placeholder="Search for songs or episodes"
        sx={{ width: "50%" }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "white" }} />
              </InputAdornment>
            ),
          },
        }}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : hasResults ? (
        <SearchResultList
          list={tracks}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      ) : keyword === "" ? (
        <></>
      ) : (
        <div>{`No Result for "${keyword}"`}</div>
      )}
    </Box>
  );
};

export default EmptyPlaylistWithSearch;
