import {
  Box,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import SearchCategoryCard from "./components/SearchCategoryCard";
import SearchIcon from "@mui/icons-material/Search";
import { useRef, useState } from "react";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import { useNavigate } from "react-router";

const category = {
  playlist: {
    label: "Made for you",
    img: "https://t.scdn.co/images/728ed47fc1674feb95f7ac20236eb6d7.jpeg",
  },
  new_releases: {
    label: "New Release",
    img: "https://t.scdn.co/images/728ed47fc1674feb95f7ac20236eb6d7.jpeg",
  },
  pop: {
    label: "Pop",
    img: "https://t.scdn.co/media/derived/pop-274x274_447148649685019f5e2a03a39e78ba52_0_0_274_274.jpg",
  },
  kpop: {
    label: "K-pop",
    img: "https://t.scdn.co/images/2078afd91e4d431eb19efc5bee5ab131.jpeg",
  },
  toplists: {
    label: "Top Lists",
    img: "https://t.scdn.co/images/728ed47fc1674feb95f7ac20236eb6d7.jpeg",
  },
  hiphop: {
    label: "Hip Hop",
    img: "https://t.scdn.co/images/728ed47fc1674feb95f7ac20236eb6d7.jpeg",
  },
  rock: {
    label: "Rock",
    img: "https://t.scdn.co/media/derived/rock_9ce79e0a4ef901bbd10494f5b855d3cc_0_0_274_274.jpg",
  },
  chill: {
    label: "Chill",
    img: "https://t.scdn.co/media/derived/chill-274x274_4c46374f007813dd10b37e8d8fd35b4b_0_0_274_274.jpg",
  },
  mood: {
    label: "Mood",
    img: "https://t.scdn.co/media/original/mood-274x274_976986a31ac8c49794cbdc7246fd5ad7_274x274.jpg",
  },
  focus: {
    label: "Focus",
    img: "https://t.scdn.co/media/original/genre-images-square-274x274_5e50d72b846a198fcd2ca9b3aef5f0c8_274x274.jpg",
  },
  party: {
    label: "Party",
    img: "/category-party.jpg",
  },
  sleep: {
    label: "Sleep",
    img: "https://t.scdn.co/media/derived/sleep-274x274_0d4f836af8fab7bf31526968073e671c_0_0_274_274.jpg",
  },
  jazz: {
    label: "Jazz",
    img: "/category-jazz.jpg",
  },
  classical: {
    label: "Classical",
    img: "https://t.scdn.co/media/derived/classical-274x274_abf78251ff3d90d2ceaf029253ca7cb4_0_0_274_274.jpg",
  },
  edm_dance: {
    label: "EDM/Dance",
    img: "https://t.scdn.co/media/derived/edm-274x274_0ef612604200a9c14995432994455a6d_0_0_274_274.jpg",
  },
  country: {
    label: "Country",
    img: "https://t.scdn.co/images/a2e0ebe2ebed4566ba1d8236b869241f.jpeg",
  },
  metal: {
    label: "Metal",
    img: "https://t.scdn.co/media/original/metal_27c921443fd0a5ba95b1b2c2ae654b2b_274x274.jpg",
  },
  rnb: {
    label: "R&B",
    img: "https://t.scdn.co/media/derived/r-b-274x274_fd56efa72f4f63764b011b68121581d8_0_0_274_274.jpg",
  },
};
const colorList = [
  "#afb1fe",
  "#fed97e",
  "#ff7163",
  "#96efb5",
  "#73baab",
  "#fde54f",
  "#66c0ff",
  "#a8c0ff",
  "#ffd6a5",
  "#ff9a9e",
  "#c3f0ca",
  "#a3cef1",
  "#f9d5e5",
  "#c7ecee",
  "#ffb3ba",
  "#fef3bd",
  "#b5ead7",
];

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

const SearchPage = () => {
  const [keyword, setKeyword] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { data } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track],
  });

  const handleSearchKeyword = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const value = inputRef.current?.value.trim();
      if (!value) return;
      setKeyword(value);
      navigate(`/search/${value}`);
    }
  };

  const shuffleArray = (arr: [string, { label: string; img: string }][]) => {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const categoryArray = Object.entries(category);

  const randomCategory = shuffleArray(categoryArray).slice(0, 9);

  const tracks = data?.pages.flatMap((page) => page.tracks?.items ?? []) ?? [];
  console.log("🚀 ~ SearchPage ~ tracks:", tracks);

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
      <Typography variant="h1" my="10px">
        Browse all
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1em",
        }}
      >
        {randomCategory.map(([key, value]) => {
          const randomColor =
            colorList[Math.floor(Math.random() * colorList.length)];
          return (
            <SearchCategoryCard
              key={key}
              label={value.label}
              bgcolor={randomColor}
              img={value.img}
              category={key}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default SearchPage;
