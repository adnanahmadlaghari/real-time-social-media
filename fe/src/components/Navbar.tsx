import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import Search from './Search/Search';
import { SearchIconWrapper } from './Search/SearchIconWrapper';
import { StyledInputBase } from './Search/StyledInputBase';
import { Avatar, Stack } from '@mui/material';
import BasicSelect from './Select';



 const Navbar: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
           Sauran
          </Typography>
          <Stack sx={{ display: { xs: 'none', sm: 'block' } }}>
          <BasicSelect />
          </Stack>
          <Stack spacing={2} direction={"row"}>
            <Stack sx={{ flexGrow: 1, alignItems: "center" }}>
              <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
            </Stack>
          <Stack sx={{display: { xs: 'none', sm: 'block' } }}>
            <Avatar /> 
          </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Navbar;