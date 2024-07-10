import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Sidebar } from './DynamicSidebar';
import { Box, CssBaseline } from '@mui/material';

export const RootLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Box sx={{ m: 3 }}>
        <Outlet />
      </Box>
      <TanStackRouterDevtools />
    </Box>
  );
};

export default RootLayout;
