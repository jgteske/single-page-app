import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Sidebar } from './DynamicSidebar';
import { Box, CssBaseline } from '@mui/material';
import LocaleSwitcher from '../i18n/LocaleSwitcher';

export const RootLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Box sx={{ m: 3 }}>
        <Outlet />
      </Box>
      <TanStackRouterDevtools />
      <LocaleSwitcher sx={{ position: 'absolute', top: 0, right: 0, m: 2 }} />
    </Box>
  );
};

export default RootLayout;
