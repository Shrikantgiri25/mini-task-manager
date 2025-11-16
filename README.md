# Mini Task Manager 🚀

A full-stack task management application with user authentication, built with React and Django REST Framework.

![Task Manager Screenshot](screenshot.png)

## ✨ Features

- ✅ User Authentication (Signup/Login) with JWT
- ✅ Create, Read, Update, Delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Responsive and modern UI
- ✅ Protected API routes
- ✅ Docker support for easy deployment

## 🛠️ Tech Stack

### Frontend
- React 18
- Axios
- Lucide React (Icons)
- CSS-in-JS

### Backend
- Django 4.2
- Django REST Framework
- JWT Authentication
- SQLite (Development) / PostgreSQL (Production ready)
- CORS Headers

## 🚀 Quick Start

### Using Docker (Recommended)

1. **Clone the repository**
```bash
   git clone https://github.com/YOUR_USERNAME/mini-task-manager.git
   cd mini-task-manager
```

2. **Run with Docker Compose**
```bash
   docker-compose up --build
```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api
   - Admin Panel: http://localhost:8000/admin

### Manual Setup

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

## 📁 Project Structure
```
mini-task-manager/
├── backend/
│   ├── taskmanager/          # Django project settings
│   ├── tasks/                # Tasks app
│   ├── manage.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── services/         # API services
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
├── docker-compose.yml
├── .gitignore
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup/` - Register new user
- `POST /api/auth/login/` - Login user

### Tasks (Protected)
- `GET /api/tasks/` - Get all tasks
- `POST /api/tasks/` - Create new task
- `PUT /api/tasks/:id/` - Update task
- `DELETE /api/tasks/:id/` - Delete task

## 🔐 Environment Variables

### Backend (.env)
```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:8000/api
```

## 🧪 Testing
```bash
# Backend tests
cd backend
python manage.py test

# Frontend tests
cd frontend
npm test
```

## 📦 Docker Commands
```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# Rebuild containers
docker-compose up --build

# View logs
docker-compose logs -f

# Remove volumes
docker-compose down -v
```

```
