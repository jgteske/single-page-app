import { Box, List, SxProps, Theme, Toolbar, Typography } from '@mui/material';

export interface RouterNavigationProps {
  title: string;
  sx?: SxProps<Theme>;
  classes?: string;
  children?: React.ReactNode;
}

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
