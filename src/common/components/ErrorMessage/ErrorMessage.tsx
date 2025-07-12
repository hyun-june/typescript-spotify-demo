import { Alert } from "@mui/material";

interface ErrorMessageProps {
  errorMessage: string;
}

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return <Alert severity="error">{errorMessage}</Alert>;
};

export default ErrorMessage;
