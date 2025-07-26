
🌐 Live Link : https://abhiwan-tech.onrender.com

⚙️ Tech Stack
Frontend: React, TypeScript, Tailwind CSS, Axios, React Router DOM

Backend: Node.js, Express.js, MongoDB, Mongoose

Authentication: JWT, bcrypt

Deployment: Render

🚀 Features
User authentication (Signup/Login/Logout)

JWT-protected routes

Create, edit, delete tasks

Dashboard with all user tasks

Responsive design with Tailwind CSS

Protected routes and session handling


📁 Folder Structure
bash
Copy
Edit
.
├── client/                # Frontend (React + TypeScript)
├── server/                # Backend (Node.js + Express + MongoDB)
🔐 API Routes & Endpoints
🔑 Auth Routes (/api/auth)
Method	Route	Description
POST	/signup	Register new user
POST	/login	Login existing user
GET	/profile	Get current user profile
POST	/logout	Logout user

📝 Task Routes (/api/tasks)
(All routes are protected by JWT)

Method	Route	Description
GET	/dashboard	Get all tasks of user
POST	/create	Create a new task
PUT	/update/:id	Update a task
DELETE	/delete/:id	Delete a task

🧪 Example Request Bodies
✅ Register User
json
Copy
Edit
POST /api/auth/signup
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secret123"
}
✅ Login
json
Copy
Edit
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "secret123"
}
✅ Create Task
json
Copy
Edit
POST /api/tasks/create
{
  "title": "Finish assignment",
  "description": "Complete math homework by 8PM"
}
✅ Update Task
json
Copy
Edit
PUT /api/tasks/update/:id
{
  "title": "Updated title",
  "description": "Updated description"
}
🛠️ How to Run Locally
1. Clone Repo
bash
Copy
Edit
git clone https://github.com/your-username/task-manager.git
cd task-manager
2. Start Backend (Server)
bash
Copy
Edit
cd server
npm install
npm run dev
Create .env file inside /server:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
3. Start Frontend (Client)
bash
Copy
Edit
cd client
npm install
npm run dev


📄 License
This project is open-source and available under the MIT License.



