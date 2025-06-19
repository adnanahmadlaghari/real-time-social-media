import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Search from './Search/Search';
import { SearchIconWrapper } from './Search/SearchIconWrapper';
import { StyledInputBase } from './Search/StyledInputBase';
import { Button, Stack, useTheme } from '@mui/material';
import IOSSwitch from "./IOSSwitch"
import { useGlobalVar } from './Global/Global';
import { useNavigate } from 'react-router-dom';


const PrimarySearchAppBar: React.FC = () => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { setTheme, setIsToken } = useGlobalVar()
  const theme = useTheme()
  const navigation = useNavigate()
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };


  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleTheme = () => {
    setTheme((prev) => prev === "light" ? "dark" : "light")
  }

  const Logout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("user")
    localStorage.removeItem("selectedUser")
    setIsToken(false)

  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => { navigation("/profile"), setAnchorEl(null) }}>Profile</MenuItem>
      <MenuItem onClick={Logout}>LogOut</MenuItem>
    </Menu>
  );



  return (
    <AppBar position="static">
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Social
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Stack sx={{ display: { xs: 'none', sm: 'block', marginLeft: 10 } }} spacing={1} direction="row" alignItems="center">
            <Button variant={theme.palette.mode === "dark" ? "contained" : ""} color={theme.palette.mode === "dark" ? "secondary" : "primary"} onClick={() => navigation("/")}>
              Dashboard
            </Button>
            <Button variant={theme.palette.mode === "dark" ? "contained" : ""} color={theme.palette.mode === "dark" ? "secondary" : "primary"} onClick={() => navigation("/chat")}>
              Chat
            </Button>

            <IOSSwitch onClick={toggleTheme} />

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Stack>
        </Toolbar>
        {renderMenu}
      </Box>
    </AppBar>
  );
}

export default PrimarySearchAppBar