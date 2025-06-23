import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import PostCard from "./Card";
import UserProfile from "./UserProfile";
import { useState } from "react";
import { useGlobalVar } from "./Global/Global";




const Posts: React.FC = () => {

    const [selectedUser, setSelectedUser] = useState<any | null>(() => {
        const stored = localStorage.getItem("selectedUser");
        return stored ? JSON.parse(stored) : null;
    });

    const {
        posts,
        setPage,
        limit,
        setLimit,
        currentPage,
        setCurrentPage,
        totalPages,
        Next,
        prev,
        total,
        page
    } = useGlobalVar()

    const handleUserClick = (_id: string) => {
        const user = posts.find((post) => post._id === _id);
        if (user) {
            setSelectedUser(user);
            localStorage.setItem("selectedUser", JSON.stringify(user));
        }
    };

    const handleBack = () => {
        setSelectedUser(null);
        localStorage.removeItem("selectedUser");
    };

    return (

        <Box>
           
            {
                posts.length <= 0 ? (
                    <Stack width={"100%"} height={"100vh"} justifyContent={"center"} alignItems={"center"}>
                        <Typography >No Posts</Typography>
                    </Stack>
                ) : (
                    <Box sx={{ width: '100vw', height: '100vh', }}>

                        {
                            selectedUser ? (
                                <UserProfile username={selectedUser.author.username} onBack={handleBack} />
                            ) : (
                                <>
                                 <Stack direction={"row"} spacing={2}>
                                    <Typography variant="h6">Total Pages: {totalPages}</Typography>
                                    <Typography variant="h6">Total Posts: {total}</Typography>
                                    <Typography variant="h6">Current Page: {currentPage}</Typography>
                                 </Stack>
                                    <Grid container spacing={7} wordwrap="wrap" justifyContent="center" alignItems="center" sx={{ p: 2 }}>
                                        {
                                            posts.map((post) => {
                                                return <Grid key={post._id} sx={{ display: 'flex', justifyContent: 'center' }}>
                                                    <PostCard {...post} handleClick={handleUserClick} />
                                                </Grid>
                                            })
                                        }
                                    </Grid>
                                    <Stack direction={"row"} spacing={2} justifyContent={"center"} p={3}>
                                        <Button variant="contained" disabled={!prev} onClick={() => setPage(page -1)}>Previous</Button>
                                        <Button variant="contained" disabled={!Next} onClick={() => setPage(page + 1)}>Next</Button>
                                    </Stack>
                                </>

                            )
                        }
                    </Box>
                )
            }
        </Box>

    );
}

export default Posts