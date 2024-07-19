/**
 * @module RouterItem
 * @group Component
 * @category ComponentCat
 */
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemProps,
  ListItemText,
} from '@mui/material';
import { Link } from '@tanstack/react-router';

/**
 * Props for the RouterItem component.
 */
export interface RouterItemProps extends ListItemProps {
  /**
   * The label to display for the list item.
   */
  label: string;
  /**
   * The path to navigate to when the list item is clicked.
   */
  to: string;
  /**
   * An optional icon to display alongside the label.
   */
  icon?: React.ReactNode;
  /**
   * Optional children elements.
   */
  children?: React.ReactNode;
}

/**
 * RouterItem component creates a navigable list item using @mui/material ListItem and @tanstack/react-router Link.
 *
 * @param props - Props passed to the RouterItem component.
 * @returns A React component that renders a list item with navigation capability.
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import HomeIcon from '@mui/icons-material/Home';
 * import RouterItem from './RouterItem';
 *
 * function App() {
 *   return (
 *     <div>
 *       <RouterItem
 *         label="Home"
 *         to="/"
 *         icon={<HomeIcon />}
 *       />
 *     </div>
 *   );
 * }
 *
 * export default App;
 * ```
 */
export default function RouterItem(props: RouterItemProps) {
  const { label, to, icon, ...other } = props;
  return (
    <ListItem {...other}>
      <ListItemButton
        component={Link}
        to={to}
      >
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={label}></ListItemText>
      </ListItemButton>
    </ListItem>
  );
}
