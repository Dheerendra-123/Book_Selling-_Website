import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useIsMobile = () => {
  const theme = useTheme();
  // Match strictly less than 600px (mobile screen)
  return useMediaQuery(theme.breakpoints.down('sm'));
};

export default useIsMobile;
