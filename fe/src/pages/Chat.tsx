
import { Box, Stack, Typography } from "@mui/material";
import ListOfChatUser from "../components/ListOfChatUser";
import MessageBox from "../components/MessageBox";
import { useEffect, useState } from "react";
import { instance } from "../components/Instance/Instance";
import { useGlobalVar } from "../components/Global/Global";

const Chat = () => {

    const {Selected, setSelected} = useGlobalVar()
    const [AllUsers, setAllUsers] = useState<any[]>([])
    const [SelectedUserData, setSelectedUserData] = useState()

    const getAllUsers = async () => {
        const token = localStorage.getItem("accessToken")
        try {
            const res = await instance.get("/users", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            setAllUsers(res.data.users)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [])
    return (
        <Box
            sx={{
                // flexGrow: 1,
                height: "100%",
                width: "100%",
                overflow: "hidden",
                display: "flex",

            }}
        >
            <Stack width={"300px"}>
                <ListOfChatUser setSelected={setSelected} Selected={Selected} setSelectedUserData={setSelectedUserData} AllUsers={AllUsers} />
            </Stack>
            {
                Selected ? <MessageBox SelectedUserData={SelectedUserData} Selected={Selected}/> : (<Stack width={"100%"} justifyContent={"center"} textAlign={"center"}>

                    <Typography>
                        No Chat Selected. Select Chat to Continue
                    </Typography>
                </Stack>)
            }

        </Box>
    );
};

export default Chat;
