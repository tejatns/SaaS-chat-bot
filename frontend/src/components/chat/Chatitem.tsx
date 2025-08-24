import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
function extractCodeFromString(message: string) {
    const regex = /```([\s\S]*?)```/g;
    const blocks: string[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(message)) !== null) {
        if (match.index > lastIndex) {
            blocks.push(message.slice(lastIndex, match.index));
        }
        blocks.push("```" + match[1] + "```");
        lastIndex = regex.lastIndex;
    }
    if (lastIndex < message.length) {
        blocks.push(message.slice(lastIndex));
    }

    return blocks;
}

function isCodeBlock(str: string) {
    return str.startsWith("```") && str.endsWith("```");
}

const Chatitem = ({
    content,
    role,
}: {
    content: string;
    role: "user" | "assistant";
}) => {
    const auth = useAuth();
    const messageBlocks = extractCodeFromString(content);
    return (
        role === "assistant" ? (
            <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5612", my: 1,borderRadius:2, gap: 2 }}>
                <Avatar sx={{ ml: "0" }}>
                    <img src="openai.png" alt="openai" width={"30px"} />
                </Avatar>
                <Box>
                    {!messageBlocks && (
                    <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
                )}
                {messageBlocks && messageBlocks.length && messageBlocks.map((block, index) =>
                    isCodeBlock(block) ? (
                        <SyntaxHighlighter
                            style={coldarkDark}
                            language="javascript"
                            key={index}
                        >
                            {block.replace(/```/g, "").trim()}
                        </SyntaxHighlighter>
                    ) : (
                        <Typography sx={{ fontSize: "20px" }} key={index}>
                            {block.trim()}
                        </Typography>
                    )
                )}
                </Box>
            </Box>
        ) : (
            <Box sx={{ display: "flex", p: 2, bgcolor: "#004d56",borderRadius:2, gap: 2 }}>
                <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
                    {auth?.user?.name[0]}
                </Avatar>
                <Box> 
                    {!messageBlocks && (
                    <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
                )}
                {messageBlocks && messageBlocks.length && messageBlocks.map((block, index) =>
                    isCodeBlock(block) ? (
                        <SyntaxHighlighter
                            style={coldarkDark}
                            language="javascript"
                            key={index}
                        >
                            {block.replace(/```/g, "").trim()}
                        </SyntaxHighlighter>
                    ) : (
                        <Typography sx={{ fontSize: "20px" }} key={index}>
                            {block.trim()}
                        </Typography>
                    )
                )}
                </Box>
            </Box>
        )
    );
};

export default Chatitem;
