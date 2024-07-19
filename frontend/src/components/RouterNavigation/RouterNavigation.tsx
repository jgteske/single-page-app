/**
 * @module RouterNavigation
 * @group Component
 * @category Category
 */
import { Box, List, SxProps, Theme, Toolbar, Typography } from '@mui/material';

/**
 * Props for the RouterNavigation component.
 */
export interface RouterNavigationProps {
  /**
   * The title to display in the toolbar.
   */
  title: string;
  /**
   * The styling to apply to the Box component.
   */
  sx?: SxProps<Theme>;
  /**
   * Optional CSS classes to apply.
   */
  classes?: string;
  /**
   * Optional children elements, typically RouterItem components.
   * {@link RouterItem}
   */
  children?: React.ReactNode;
}

/**
 * RouterNavigation component provides a styled navigation sidebar with a title and a list of children items.
 *
 * @param props - Props passed to the RouterNavigation component.
 * @returns A React component that renders a navigation sidebar.
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import RouterNavigation from './RouterNavigation';
 * import RouterItem from './RouterItem';
 * import HomeIcon from '@mui/icons-material/Home';
 * import SettingsIcon from '@mui/icons-material/Settings';
 *
 * function App() {
 *   return (
 *     <RouterNavigation title="My App Navigation">
 *       <RouterItem label="Home" to="/" icon={<HomeIcon />} />
 *       <RouterItem label="Settings" to="/settings" icon={<SettingsIcon />} />
 *     </RouterNavigation>
 *   );
 * }
 *
 * export default App;
 * ```
 */
export default function RouterNavigation({
  title = '',
  sx,
  ...props
}: RouterNavigationProps) {
  return (
    <Box
      sx={[
        {
          width: '350px',
        },
        // You cannot spread `sx` directly because `SxProps` (typeof sx) can be an array.
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Toolbar>
        <Typography
          variant='h6'
          noWrap
          component='div'
        >
          {title}
        </Typography>
      </Toolbar>
      <List>{props.children}</List>
    </Box>
  );
}
