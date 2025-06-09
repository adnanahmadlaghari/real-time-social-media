import { Avatar, Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import Search from "../components/Search/Search";
import { SearchIconWrapper } from "../components/Search/SearchIconWrapper";
import { StyledInputBase } from "../components/Search/StyledInputBase";
import SearchIcon from "@mui/icons-material/Search";

const ListOfChatUser = () => {
    const theme = useTheme();
    return (
        <Box
            // minHeight="100%"
            height={"100vh"}
            width="300px"
            display="flex"
            alignItems="flex-start"
            overflow={"scroll"}
            // sx={{ height: "100%" }} 

        >
            {/* Sidebar/Chat List */}
            <Box
                width="300px"
                borderRadius={2}
                boxShadow={3}
                p={2}
                display="flex"
                flexDirection="column"
                gap={2}
            >
                {/* Search Bar */}
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ "aria-label": "search" }}
                    />
                </Search>

                {/* Chat Card */}
                <Paper
                    elevation={1}
                    sx={{
                        borderRadius: 2,
                        p: 1.5,
                        cursor: "pointer",
                        "&:hover": { backgroundColor: theme.palette.action.hover },
                    }}
                >
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar />
                            <Typography variant="body1" fontWeight="medium">
                                Username
                            </Typography>
                        </Stack>
                        <Typography variant="caption" color="text.secondary">
                            12:34 PM
                        </Typography>
                    </Stack>
                </Paper>
            </Box>
        </Box>
    );
};



export default ListOfChatUser