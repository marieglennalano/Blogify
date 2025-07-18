## 🛠️ Building Blogify: My Journey with the MERN Stack

**Author:** Marie Glenn Alano

---

### 🚀 Why I Started Blogify

As a developer passionate about both writing and coding, I wanted to create a space where I could merge those two worlds. That’s how **Blogify** was born—a blogging platform built using the **MERN stack** (MongoDB, Express.js, React, and Node.js). My goal was to build something simple, elegant, and functional, where users could share their thoughts freely.

---

### 🧱 Setting Up the Foundation

I started by scaffolding the project into two main parts:

- **Frontend**: Built with React, using functional components and hooks.
- **Backend**: Powered by Node.js and Express, connected to MongoDB via Mongoose.

I used `create-react-app` to kickstart the frontend and set up a basic Express server for the backend. The folder structure was organized to keep things modular and scalable.

---

## 🚀 Features

- ✅ Responsive UI with React Bootstrap
- ✅ Login and Registration with validation
- ✅ Google OAuth login (optional)
- ✅ Create, Edit, View, Delete blog posts
- ✅ Comment system with threaded replies
- ✅ Like functionality for blogs and comments
- ✅ Animations using Framer Motion
- ✅ Protected routes for authenticated users
- ✅ Avatar support via Google or UI Avatars
- ✅ Toast & Alert-based feedback
- ✅ Clean and elegant UI

---

## 🛠️ Technologies Used

- React (CRA)
- React Bootstrap
- Axios
- React Router
- Framer Motion
- Google OAuth (`@react-oauth/google`)
- JWT Authentication
- UI Avatars

CRUD operations are handled via RESTful API endpoints, and everything is connected seamlessly using Axios.

---

### 🎨 Styling the UI

For styling, I went with **Bootstrap** to keep things clean and responsive. Blogify has a minimalist aesthetic, focusing on readability and user experience. I also added dark mode support for those late-night writing sessions.

---

### 🌐 Deployment

I deployed the frontend on [Vercel](https://blogify-sigma-seven.vercel.app/) and the backend on [Render](https://blogifyapi-ueu8.onrender.com), with MongoDB hosted on **MongoDB Atlas**. Environment variables are managed securely, and the app is live and accessible from anywhere.

---

📁 Folder Structure
src/
│
├── api/             # Axios instance
├── components/      # Navbar, buttons, etc.
├── pages/           # Login, Register, Home, Blog Detail, Create Blog
├── App.js           # Main routing logic
└── index.js         # App entry point

---

🔐 Authentication
JWT-based login system
Google Sign-In (optional)
Tokens stored in localStorage

---

💬 Feedback
Found a bug or have a feature request? Feel free to open an issue or contribute!

---
Blogify is more than just a project—it’s a platform for expression, learning, and growth. If you're building something similar or want to collaborate, feel free to reach out!

---

Made with ❤️ by [Marie Glenn Alano](https://github.com/marieglennalano)
