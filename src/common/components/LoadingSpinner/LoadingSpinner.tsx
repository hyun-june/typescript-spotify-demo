import { keyframes, styled } from "@mui/material";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const LoadingBar = styled("div")({
  width: "100px",
  height: "100px",
  border: "4px solid #b3b3b3",
  borderRadius: "100%",
  borderTop: "4px solid #1ed760",
  animation: `${spin} 1s linear infinite`,
});

const LoadingSpinner = () => {
  return (
    <LoadingContainer>
      <LoadingBar />
    </LoadingContainer>
  );
};

export default LoadingSpinner;
