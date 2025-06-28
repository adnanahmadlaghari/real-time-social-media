import { Box } from "@mui/material";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatFooter from "./ChatFooter";
import { useState } from "react";

interface Props{
    SelectedUserData: () => void,
    Selected: string
}

const MessageBox: React.FC<Props> = ({SelectedUserData, Selected}) => {
      const [oneToOne, setOneToOne] = useState<any[]>([])
    return (
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Header */}
            <Box>
                <ChatHeader SelectedUserData={SelectedUserData}/>
            </Box>
            {/* Messages Area */}
            <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                <ChatMessages  Selected={Selected} setOneToOne={setOneToOne} oneToOne={oneToOne}/>
            </Box>

            {/* Footer sticks to bottom */}
            <Box>
                <ChatFooter Selected={Selected}/>
            </Box>
        </Box>
    );
};

export default MessageBox;
