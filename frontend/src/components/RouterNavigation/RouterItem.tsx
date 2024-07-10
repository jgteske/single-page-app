import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemProps,
  ListItemText,
} from '@mui/material';
import { Link } from '@tanstack/react-router';

export interface RouterItemProps extends ListItemProps {
  label: string;
  to: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

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
