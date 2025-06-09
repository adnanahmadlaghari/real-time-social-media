
import { Box } from "@mui/material";
import ListOfChatUser from "../components/ListOfChatUser";

const Chat = () => {

    return (
        <Box
            sx={{
                // flexGrow: 1,
                height: "100%",
                border: "2px solid blue",
                overflow: "hidden",

            }}
        >
            <ListOfChatUser />
        </Box>
    );
};

export default Chat;
