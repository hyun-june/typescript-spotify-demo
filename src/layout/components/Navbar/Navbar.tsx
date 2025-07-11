import { Box } from "@mui/material";
import LoginButton from "../../../common/components/LoginButton/LoginButton";

const Navbar = () => {
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      height="64px"
    >
      <LoginButton />
    </Box>
  );
};

export default Navbar;
