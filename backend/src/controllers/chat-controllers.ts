import { Request, Response, NextFunction } from "express";
import User from "../models/user.js";
import { configureOpenAI } from "../config/openai-config.js";
import { ChatCompletionMessageParam } from "openai/resources";

export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) return res.status(401).json({ message: "User not registered or Token malfunctioned" });
        //grab chats of user
        const chats = user.chats.map(({ role, content }) => ({ role, content })) as ChatCompletionMessageParam[];
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });

        //send al chats with new one to opeaI API
        const openai = configureOpenAI();
        let assistantMessage;
        try {
            const chatResponse = await openai.chat.completions.create({
                model: "openai/gpt-oss-20b:free",
                messages: chats,
            });
            assistantMessage = chatResponse?.choices?.[0]?.message;
        } catch (err) {
            console.error("OpenAI request failed:", err);
        }

        if (assistantMessage) user.chats.push(assistantMessage);

        await user.save();
        return res.status(200).json({ chats: user.chats });
        //get latest response

    } catch (error) {
        console.log(error);
        return res.status(500).json({ chats: [], error: "something went wrong" });
    }

};

export const sendChatsToUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        //user token check

        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or token malfunctioned");
        }
        console.log(user._id.toString(), res.locals.jwtData.id);

        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didnt match");
        }


        return res.status(200).json({ message: "OK", chats: user.chats });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};

export const deleteCHats = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        //user token check

        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or token malfunctioned");
        }
        console.log(user._id.toString(), res.locals.jwtData.id);

        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didnt match");
        }
        //@ts-ignore
        user.chats =[];
        await user.save();
        return res.status(200).json({ message: "OK"});
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};