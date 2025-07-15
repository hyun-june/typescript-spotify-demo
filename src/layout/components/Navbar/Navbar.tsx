import { Avatar, Box, styled } from "@mui/material";
import LoginButton from "../../../common/components/LoginButton/LoginButton";
import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ProfileContainer = styled("div")({
  display: "flex",
  cursor: "pointer",
});

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      height="64px"
    >
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
