import React from 'react';

import { Button, Drawer } from '@mui/material';
import RouterNavigation from '../components/RouterNavigation/RouterNavigation';
import RouterItem from '../components/RouterNavigation/RouterItem';
import AcUnitIcon from '@mui/icons-material/AcUnit';

export function Sidebar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <>
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer
        variant='temporary'
        open={open}
        onClose={toggleDrawer(false)}
      >
        <RouterNavigation title='Testrouter'>
          <RouterItem
            label='Home'
            to='/'
            icon={<AcUnitIcon />}
          ></RouterItem>
          <RouterItem
            label='About'
            to='/about'
          ></RouterItem>
        </RouterNavigation>
      </Drawer>
    </>
  );
}
