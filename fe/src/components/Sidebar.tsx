import { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Box,
  Tooltip,
  Switch,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  BarChart as BarChartIcon,
  Layers as LayersIcon,
  Menu as MenuIcon,
  ArrowBackIosNew,
} from '@mui/icons-material';

const drawerWidth = 240;
const collapsedWidth = 80;

const navigationItems = [
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    title: 'Reports',
    icon: <BarChartIcon />,
  },
  {
    title: 'Integrations',
    icon: <LayersIcon />,
  },
  {
    title: 'Theme',
    icon: <Switch />,
  },
];

const CustomSidebar = () => {
  const [open, setOpen] = useState<boolean>(false);


  const toggleSidebar = () => {
    setOpen((prev) => !prev);
  };


  return (
    <Box sx={{ display: { xs: 'block', sm: 'none' }}}>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : collapsedWidth,
            transition: 'width 0.3s',
            overflowX: 'hidden',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: open ? 'flex-end' : 'center', p: 1 }}>
          <IconButton onClick={toggleSidebar}>
            {
              open ? <ArrowBackIosNew /> : <MenuIcon />  
            }
          </IconButton>
        </Box>

        <List>
          {navigationItems.map((item) => {

            return (
              <Box key={item.title}>
                <Tooltip title={!open ? item.title : ''} placement="right">
                  <ListItemButton
                    sx={{
                      flexDirection: open ? 'row' : 'column',
                      alignItems: 'center',
                      justifyContent: open ? 'flex-start' : 'center',
                      px: 2,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 2 : 0,
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body2" textAlign={open ? 'left' : 'center'}>
                          {item.title}
                        </Typography>
                      }
                      sx={{ display: open ? 'block' : 'block' }}
                    />
                  </ListItemButton>
                </Tooltip>
              </Box>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
}


export default CustomSidebar