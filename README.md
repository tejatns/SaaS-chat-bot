# MERN AI Chatbot 🤖

A fully responsive, intelligent chatbot application built with the MERN stack (MongoDB, Express, React, Node.js) and integrated with the OpenAI API. This project is inspired by modern AI assistants like ChatGPT, providing a seamless, real-time conversational experience.

Users can sign up, log in, and engage in conversations with an advanced AI. All chat history is securely stored, allowing users to revisit their conversations at any time.


## ✨ Key Features

- **Full User Authentication**: Secure user registration and login system with password encryption and persistent sessions.
- **Real-time AI Conversations**: Engage in dynamic, intelligent conversations powered by OpenAI's GPT models.
- **Persistent Chat History**: All conversations are stored in a MongoDB database, linked to the user's account.
- **Code Syntax Highlighting**: The chatbot can understand and display formatted code blocks in its responses.
- **Fully Responsive Design**: A modern and intuitive user interface built with Material-UI that works flawlessly on all devices.
- **Secure Sessions**: Utilizes HTTP-only cookies and JWT (JSON Web Tokens) to keep user sessions active for up to 7 days.
- **Scalable Architecture**: The backend is designed for future expansion, allowing for easy integration of new AI features like image or audio generation.

---

## 🛠️ Technology Stack

| Category          | Technology                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| **Frontend** | React, TypeScript, Vite, React Router, Axios, Material-UI                                                    |
| **Backend** | Node.js, Express.js, TypeScript                                                                              |
| **Database** | MongoDB with Mongoose                                                                                        |
| **AI Integration**| OpenAI API                                                                                    |
| **Authentication**| JWT, bcrypt, cookie-parser, express-validator                                                                |
| **Styling & UI** | Material-UI, React-Icons, React-Type-Animation, React-Syntax-Highlighter                                   |
| **Utilities** | CORS, Morgan (for logging), React Hot Toast (for notifications)                                              |

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- **Node.js and npm**: Make sure you have the latest stable versions installed. You can download them from [nodejs.org](https://nodejs.org/).
- **MongoDB**: You need a MongoDB database. You can use a local installation or a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a free database cluster.

### Setup & Installation

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Configure Backend**
    - Navigate to the backend directory:
      ```bash
      cd backend
      ```
    - Install backend dependencies:
      ```bash
      npm install
      ```
    - Create a `.env` file in the `backend` folder. Copy the structure from `/backend/.env.example` and fill in your secret keys 
    - Using OpenRouter (Optional):
      This project is configured to work with an **OpenRouter** API key out of the box, which provides access to various models for free (like `google/gemini-pro`). The API structure is compatible.

      If you are using a standard **OpenAI** API key, you may need to make a small change in the backend configuration.

      1.  Open the file: `backend/src/config/openai-config.js`
      2.  Update the `Configuration` object to include your organization ID if required by OpenAI:
      ```javascript
      export const configureOpenAI = () => {
        const config = new Configuration({
          apiKey: process.env.OPENAI_API_KEY,
          // Add your organization ID here if needed
          // organization: process.env.OPENAI_ORGANIZATION_ID, 
        });
        return config;
      };
      ```

3.  **Configure Frontend**
    - Navigate to the frontend directory from the root:
      ```bash
      cd frontend
      ```
    - Install frontend dependencies:
      ```bash
      npm install
      ```

4.  **Run the Application**
    - **Start the Backend Server**: Open a terminal in the `/backend` directory and run:
      ```bash
      npm run dev
      ```
      The server should now be running on `http://localhost:5000`.

    - **Start the Frontend Client**: Open a second terminal in the `/frontend` directory and run:
      ```bash
      npm run dev
      ```
      The React application will open in your browser at `http://localhost:5173`.

You can now register a new user and start chatting with the AI!
