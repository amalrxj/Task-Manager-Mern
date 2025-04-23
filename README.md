# 📝 Task Manager - MERN Stack

A full-stack task management application built with the **MERN** stack (MongoDB, Express.js, React.js, Node.js). This app allows users to manage their daily tasks effectively with features like task creation, updating, deletion, and completion status tracking.

---

## 🔍 Description

The **Task Manager MERN** project is designed to help users organize their tasks efficiently with a simple and responsive user interface. It supports full CRUD operations and real-time updates, making it ideal for both personal and collaborative task tracking.

---

## 🚀 Features

- ✅ Create, edit, and delete tasks
- 📋 Mark tasks as completed or pending
- 🔄 Real-time updates and task status management
- 📱 Responsive UI for desktop and mobile
- 🧩 Modular architecture for scalability
- 📦 RESTful API integration with error handling
- ⚙️ Clean separation of frontend and backend code

---

## 🛠️ Tech Stack / Frameworks

### 🌐 Frontend
- [React.js](https://reactjs.org/)
- [Axios](https://axios-http.com/)
- CSS3

### 🖥️ Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

---

## 🧪 Installation & Setup

### ✅ Prerequisites
- Node.js (v16 or higher)
- MongoDB (local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- npm or yarn

### 📥 Step 1: Clone the Repository

```bash
git clone https://github.com/amalrxj/Task-Manager-Mern.git
cd Task-Manager-Mern
```

### 🔧 Step 2: Backend Setup
```bash
cd backend
npm install
```

#### Create a .env file inside the server folder with the following content:
```bash
PORT = 8000
CLIENT_URL = https://task-manager********.com
DB_URI = mongodb+srv://<user>:<passwd>@taskmanager.aphl07l.mongodb.net/?retryWrites=true&w=majority&appName=taskManager
JWT_SECRET = *****
ADMIN_INVITE_TOKEN = 1234567
CLOUDINARY_API_KEY = 51*****
CLOUDINARY_API_SECRET = 0ymO****
CLOUDINARY_CLOUD_NAME = da*****
```

Start the backend server:
```
npm start
```

The backend API will run on:
http://localhost:8000

### 🎨 Step 3: Frontend Setup
```
cd ../frontend
npm install
npm start
```

The frontend will run on:
http://localhost:5173

