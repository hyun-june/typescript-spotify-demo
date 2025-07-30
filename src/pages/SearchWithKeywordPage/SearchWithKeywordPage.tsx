import { Box, InputAdornment, styled, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import { useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  position: "absolute",
  top: "22px",

  "& .MuiInputBase-root": {
    borderRadius: "30px",
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

const SearchWithKeywordPage = () => {
  const { keyword } = useParams<{ keyword: string }>();

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current && keyword) {
      inputRef.current.value = keyword;
    }
  }, [keyword]);

  if (!keyword) {
    navigate("/search");
    return null;
  }

  const handleSearchKeyword = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const value = inputRef.current?.value.trim();
      if (!value) {
        navigate("/search");
        return;
      }
      navigate(`/search/${value}`);
    }
  };

  const { data, isLoading, error } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Album, SEARCH_TYPE.Artist],
  });

  const searchData = data?.pages[0];

  const tracks = searchData?.tracks;
  console.log("🚀 ~ SearchWithKeywordPage ~ tracks:", tracks);
  const albums = searchData?.albums;
  console.log("🚀 ~ SearchWithKeywordPage ~ albums:", albums);
  const artists = searchData?.artists;
  console.log("🚀 ~ SearchWithKeywordPage ~ artists:", artists);

  return (
    <Box>
      <StyledTextField
        placeholder="What do you want to play?"
        sx={{ width: "30%" }}
        onKeyDown={handleSearchKeyword}
        inputRef={inputRef}
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
    </Box>
  );
};

export default SearchWithKeywordPage;
