import type React from "react";
import { Avatar, Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import Search from "../components/Search/Search";
import { SearchIconWrapper } from "../components/Search/SearchIconWrapper";
import { StyledInputBase } from "../components/Search/StyledInputBase";
import SearchIcon from "@mui/icons-material/Search";
import { instance } from "./Instance/Instance";
import { useEffect, useState } from "react";

interface Props {
    setSelected: (id: string) => void,
    Selected: string,
    AllUsers: any[],
    setSelectedUserData: () => void
}

const ListOfChatUser: React.FC<Props> = ({ setSelected, AllUsers, Selected, setSelectedUserData }) => {
    const theme = useTheme();
    const [SearchTerm, setSearchTerm] = useState("")
    const [IsLoading, setIsLoading] = useState(false)
    const [FilteredUsers, setFilteredUsers] = useState<any[]>([]);


    const searchContacts = async() => {
        setIsLoading(true)
        const token = localStorage.getItem("accessToken")
        try {
            const res = await instance.post("/users/search", { search: SearchTerm } , {
                headers: {
                    "Authorization" : `Bearer ${token}`
                }
            })
            setFilteredUsers(res.data.contact)
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        searchContacts()
    }, [SearchTerm])
    return (
        <Box
            // minHeight="100%"
            height={"100vh"}
            width="100%"
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
                        value={SearchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Search>

                {/* Chat Card */}
                {
                   IsLoading ? (<Stack>
                    <Typography>
                        Loading...
                    </Typography>
                   </Stack>) : (
                   (SearchTerm ? FilteredUsers :  AllUsers).map((user) => {
                        return <Paper
                            key={user._id}
                            elevation={1}
                            sx={{
                                borderRadius: 2,
                                p: 1.5,
                                cursor: "pointer",
                                "&:hover": { backgroundColor: Selected === user._id ? theme.palette.primary.main : theme.palette.action.hover },
                                backgroundColor: Selected === user._id ? theme.palette.primary.main : theme.palette.background.default,
                                color: Selected === user._id ? "#000" : "inherit",
                            }}
                            onClick = {() => {setSelected(user._id), setSelectedUserData(user)}}
                        >
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Avatar src={`http://localhost:3000${user.profile}`}/>
                                    <Typography variant="body1" fontWeight="medium"  >
                                        {user.username}
                                    </Typography>
                                </Stack>
                                <Typography variant="caption" sx={{color: Selected === user._id ? "#000" : "inherit"}}>
                                    12:34 PM
                                </Typography>
                            </Stack>
                        </Paper>
                    })
                   )
                }
            </Box>
        </Box>
    );
};



export default ListOfChatUser