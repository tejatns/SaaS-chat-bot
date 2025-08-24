import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { red } from '@mui/material/colors';
import Chatitem from '../components/chat/Chatitem';
import { IoMdSend } from 'react-icons/io';
import { deleteUserChats, getUserChats, sendChatRequest } from '../helpers/api-communicator';
import toast from 'react-hot-toast';
import { data, useNavigate } from 'react-router-dom';
type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const navigate =useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([
    // { role: "assistant", content: "Hello! How can I assist you today?" },
    // { role: "user", content: "Can you show me a JavaScript example?" },
    // { role: "assistant", content: "Sure! Here's how to log a message:\n```javascript\nconsole.log('Hello World');\n```" },
    // { role: "user", content: "Great, how do I create a function?" },
    // { role: "assistant", content: "Here's a simple function in JavaScript:\n```javascript\nfunction greet(name) {\n  return `Hello, ${name}`;\n}\nconsole.log(greet('Alice'));\n```" },
    // { role: "user", content: "Nice! How about a Python example?" },
    // { role: "assistant", content: "Sure, here is a Python function:\n```python\ndef greet(name):\n    return f\"Hello, {name}\"\n\nprint(greet(\"Alice\"))\n```" },
    // { role: "user", content: "Can you show me how to use an array in JavaScript?" },
    // { role: "assistant", content: "Absolutely! Here's an example:\n```javascript\nconst numbers = [1, 2, 3, 4, 5];\nnumbers.forEach(num => console.log(num));\n```" },
    // { role: "user", content: "What about a loop in Python?" },
    // { role: "assistant", content: "Here's a Python `for` loop:\n```python\nfor i in range(1, 6):\n    print(i)\n```" },
    // { role: "user", content: "Can you show a simple API call in JavaScript?" },
    // { role: "assistant", content: "Sure! Here's how to fetch data from an API:\n```javascript\nfetch('https://api.example.com/data')\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error(error));\n```" },
    // { role: "user", content: "Awesome, thanks for all the help!" },
    // { role: "assistant", content: "You're welcome! Let me know if you need more examples." }
  ]);
  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    try {
      const chatData = await sendChatRequest(content);
      if (chatData?.chats && Array.isArray(chatData.chats)) {
        setChatMessages([...chatData.chats]); // overwrite with backend saved messages
      } else {
        console.warn("Chats not returned from backend:", chatData);
      }
    } catch (err) {
      console.error("Failed to send chat request:", err);
    }
    //
  };
  const handleDeleteChats = async() => {
    try {
      toast.loading("Deleting chats",{id:"deletechats"})
      await deleteUserChats ();
      setChatMessages([]);
      toast.success("Deleted chats successfully",{id:"deletechats"});
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed",{id:"deletechats"});
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      const loadChats = async () => {
        toast.loading("Loading Chats", { id: "loadchats" });
        try {
          const data = await getUserChats();
          // overwrite state with backend saved messages
          setChatMessages(data.chats && Array.isArray(data.chats) ? [...data.chats] : []);
          toast.success("Successfully Loaded Chats", { id: "loadchats" });
        } catch (err) {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        }
      };
      loadChats();
    }
  }, [auth]);

  useEffect(() => {
    if(!auth?.user) {
      navigate("/login");
    }
  },[auth,navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box sx={{ display: { md: "flex", xs: "none", sm: "none" }, flex: 0.2, flexDirection: 'column' }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            vorderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a ChatBOT
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information
          </Typography>
          <Button
          onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Converstation
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flex: { md: 0.8, xs: 1, sm: 1 }, flexDirection: 'column', px: 3 }}>
        <Typography
          sx={{ textAlign: "center", fontSize: "40px", color: "white", mb: 2, mx: "auto", fontWeight: "600", }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => <Chatitem
            content={chat.content} role={chat.role} key={index} />)}
        </Box>
        <div style={{
          width: "100%",
          borderRadius: 8,
          backgroundColor: "rgb(17,27,39)",
          display: "flex",
          margin: "auto",
        }}
        >
          {""}
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ ml: "auto", color: "white",mx:1 }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box >
  );
};

export default Chat