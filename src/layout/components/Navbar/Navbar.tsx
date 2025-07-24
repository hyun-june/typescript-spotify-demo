import { Avatar, Box, InputAdornment, styled, TextField } from "@mui/material";
import LoginButton from "../../../common/components/LoginButton/LoginButton";
import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router";

const ProfileContainer = styled("div")({
  display: "flex",
  cursor: "pointer",
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",

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

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();
  const searchURL = useLocation().pathname.includes("search");

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height="64px"
    >
      {searchURL ? (
        <StyledTextField
          placeholder="What do you want to play?"
          sx={{ width: "30%" }}
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
      ) : (
        <Box flex={1} />
      )}

      <ProfileContainer>
        {userProfile ? (
          userProfile.images.length > 0 ? (
            <Avatar
              src={userProfile.images[0]?.url}
              alt={userProfile.display_name}
            />
          ) : (
            <AccountCircleIcon sx={{ fontSize: "40px" }} />
          )
        ) : (
          <LoginButton />
        )}
      </ProfileContainer>
    </Box>
  );
};

export default Navbar;
