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
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Layers as LayersIcon,
  Menu as MenuIcon,
  ArrowBackIosNew,
  AccountCircle,
  Chat,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 240;

const navigationItems = [
  { title: 'Profile', icon: <AccountCircle /> },
  { title: 'Dashboard', icon: <DashboardIcon /> },
  { title: 'Chat', icon: <Chat /> },
  { title: 'Integrations', icon: <LayersIcon /> },
];

const CustomSidebar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleSidebar = () => setOpen((prev) => !prev);

  // Only render sidebar on mobile
  if (!isMobile) return null;

  return (
    <>
      {/* Menu button to open sidebar */}
     {
      open ? (
        <IconButton onClick={toggleSidebar} sx={{ position: 'absolute', top: 16, left: 16 }}>
          <ArrowBackIosNew />
        </IconButton>
      ) : (
        <IconButton onClick={toggleSidebar} sx={{ position: 'absolute', top: 16, left: 16 }}>
          <MenuIcon />
        </IconButton>
      )
     }
      {/* </IconButton> */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={toggleSidebar}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            transition: 'width 0.3s',
            overflowX: 'hidden',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={toggleSidebar}>
            <ArrowBackIosNew />
          </IconButton>
        </Box>
        <List>
          {navigationItems.map((item) => (
            <Box key={item.title}>
              <Tooltip title={item.title} placement="right">
                <ListItemButton>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 2,
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" textAlign="left">
                        {item.title}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </Tooltip>
            </Box>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default CustomSidebar