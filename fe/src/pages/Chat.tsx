
import { Box } from "@mui/material";
import ListOfChatUser from "../components/ListOfChatUser";
import MessageBox from "../components/MessageBox";

const Chat = () => {

    return (
        <Box
            sx={{
                // flexGrow: 1,
                height: "100%",
                border: "2px solid blue",
                overflow: "hidden",
                display: "flex",

            }}
        >
            <ListOfChatUser />
            <MessageBox />
        </Box>
    );
};

export default Chat;
