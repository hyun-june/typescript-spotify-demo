import { Box } from "@mui/material";
import LoginButton from "../../../common/components/LoginButton/LoginButton";
import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      height="64px"
    >
      {userProfile ? (
        userProfile.images.length > 0 ? (
          <img src={userProfile.images[0]?.url} />
        ) : (
          <AccountCircleIcon />
        )
      ) : (
        <LoginButton />
      )}
    </Box>
  );
};

export default Navbar;
