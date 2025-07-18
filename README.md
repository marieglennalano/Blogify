## 🛠️ Building Blogify: My Journey with the MERN Stack

**Date:** July 17, 2025  
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

### 🔐 Authentication & User Management

One of the first challenges was implementing **user authentication**. I chose **JWT (JSON Web Tokens)** for secure login sessions. Users can register, log in, and manage their own posts. Passwords are hashed using `bcrypt`, and tokens are stored securely.

---

### ✍️ Creating & Managing Posts

I designed a simple **Post schema** in MongoDB with fields like title, content, author, and timestamps. The frontend includes:

- A **rich text editor** for writing posts
- A **dashboard** to manage published content
- A **public feed** to browse all posts

CRUD operations are handled via RESTful API endpoints, and everything is connected seamlessly using Axios.

---

### 🎨 Styling the UI

For styling, I went with **Tailwind CSS** to keep things clean and responsive. Blogify has a minimalist aesthetic, focusing on readability and user experience. I also added dark mode support for those late-night writing sessions.

---

### 🌐 Deployment

I deployed the frontend on **Vercel** and the backend on **Render**, with MongoDB hosted on **MongoDB Atlas**. Environment variables are managed securely, and the app is live and accessible from anywhere.

---

### 💡 Lessons Learned

- **Modularity is key**: Keeping components and routes organized made scaling easier.
- **Security matters**: Even in small projects, protecting user data is crucial.
- **Keep iterating**: Blogify is still evolving, and I’m excited to add features like comments, tags, and image uploads.

---

### 📌 What’s Next?

I plan to add:

- **User profiles**
- **Post categories and tags**
- **Commenting system**
- **Admin dashboard**

Blogify is more than just a project—it’s a platform for expression, learning, and growth. If you're building something similar or want to collaborate, feel free to reach out!
