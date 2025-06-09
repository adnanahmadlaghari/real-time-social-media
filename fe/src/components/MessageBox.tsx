import { Box } from "@mui/material";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatFooter from "./ChatFooter";

const MessageBox = () => {
    return (
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Header */}
            <Box>
                <ChatHeader />
            </Box>

            {/* Chat Messages (fills available space) */}
            <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                <ChatMessages />
            </Box>

            {/* Footer sticks to bottom */}
            <Box>
                <ChatFooter />
            </Box>
        </Box>
    );
};

export default MessageBox;
