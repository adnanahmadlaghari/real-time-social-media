import { Box, Stack } from '@mui/material';
import MessageText from './MessageText';
import MessageFile from './MessageFile';
import { useGlobalVar } from './Global/Global';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';


const dummyMessages = [
  {
    sender: "user1",
    recipient: "user2",
    messageType: "text",
    text: "Hey! How are you doing?",
    incoming: true
  },
  {
    sender: "user2",
    recipient: "user1",
    messageType: "text",
    text: "I'm good! What about you?",
    incoming: false
  },
  {
    sender: "user1",
    recipient: "user2",
    messageType: "file",
    file: "https://example.com/uploads/image1.jpg",
    incoming: false
  },
  {
    sender: "user2",
    recipient: "user1",
    messageType: "file",
    file: "https://example.com/uploads/document.pdf",
    incoming: true
  },
];


interface Props {
  Selected: string,
  setOneToOne: React.Dispatch<React.SetStateAction<any[]>>,
  oneToOne: any[]
}

const ChatMessages: React.FC<Props> = ({ Selected, setOneToOne, oneToOne }) => {

  const { OneToOneMessages, Socket, setOneToOneMessages} = useGlobalVar()

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setOneToOne(OneToOneMessages)
        if (Socket) {
        Socket.on("received-message", (message: any) => {
            setOneToOne((prev) => [...prev, message])
        }); 
    }

    return () => {
      setOneToOne([])
        if (Socket) {
            Socket.off("received-message");
        }
    };
  }, [OneToOneMessages])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [OneToOneMessages]);

  return (
    <Box sx={{ padding: 2 }}>
      <Stack spacing={2}>
        {oneToOne.map((msg, index) => {
          switch (msg.messageType) {
            case "text":
              return <MessageText key={index} message={msg} Selected={Selected} />;
            case "file":
              return <MessageFile key={index} message={msg} />;
            default:
              return null;
          }
        })}
      </Stack>
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default ChatMessages;
