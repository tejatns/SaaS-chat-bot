import OpenAI from "openai";

export const configureOpenAI = () => {
    const config = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPENROUTER_API_KEY,
        // organization: process.env.OPENAI_ORGANIZATION_ID,
        defaultHeaders: {
            "HTTP-Referer": "http://localhost:5173", // or your deployed frontend URL
            "X-Title": "MERN GPT"
        },
    });
    return config;
};

