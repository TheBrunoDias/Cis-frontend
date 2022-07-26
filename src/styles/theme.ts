import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#38C7AB',
      main: '#1CA78C',
      dark: '#0B5351',
    },
    secondary: {
      light: '#084C61',
      main: '#00939F',
      dark: '#29BCC8',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
    },
    warning: {
      light: '#ffb74d',
      main: '#ffa726',
      dark: '#f57c00',
    },
    info: {
      light: '#4fc3f7',
      main: '#29b6f6',
      dark: '#0288d1',
    },
    success: {
      light: '#81c784',
      main: '#66bb6a',
      dark: '#388e3c',
    },
    background: {
      paper: '#F6F7EB',
      default: '#EFEFEF',
    },
    divider: '#1CA78C',
  },
});
