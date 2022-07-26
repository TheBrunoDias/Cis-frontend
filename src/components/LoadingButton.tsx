import { Button, ButtonProps, CircularProgress } from '@mui/material';

type LoadingButtonProps = ButtonProps & {
  children: React.ReactNode;
  loading: boolean;
};

export const LoadingButton: React.FC<LoadingButtonProps> = ({ children, loading, ...props }) => {
  return (
    <Button {...props} disabled={loading}>
      {loading ? <CircularProgress /> : <>{children}</>}
    </Button>
  );
};
