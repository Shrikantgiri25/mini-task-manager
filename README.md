# Mini Task Manager 🚀

A full-stack task management application with user authentication, built with React and Django REST Framework.

---

## ✨ Features

### 🔐 Authentication System
- ✅ **User Registration (Signup)**: Create account with username, email, and password
- ✅ **User Login**: Secure JWT-based authentication
- ✅ **Token Management**: Automatic token storage in localStorage
- ✅ **Protected Routes**: Redirect to login for unauthenticated users
- ✅ **Logout**: Complete session cleanup and token removal

### 📝 Task Management (CRUD Operations)
- ✅ **View Tasks**: Display all tasks for the logged-in user
- ✅ **Create Tasks**: Add new tasks with title, description, and status
- ✅ **Edit Tasks**: Update task details via modal interface
- ✅ **Delete Tasks**: Remove tasks with confirmation dialog
- ✅ **Toggle Status**: Quick switch between pending and completed states
- ✅ **User Isolation**: Each user only sees their own tasks

### 🎨 User Interface & Experience
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile devices
- ✅ **Loading Indicators**: Visual feedback during API calls
- ✅ **Error Handling**: User-friendly error messages for all operations
- ✅ **Status Badges**: Color-coded badges (pending/completed)
- ✅ **Visual Feedback**: Strike-through text for completed tasks
- ✅ **Modal Interface**: Clean modal for adding and editing tasks
- ✅ **Empty State**: Helpful message when no tasks exist
- ✅ **Smooth Transitions**: Loading spinners and hover effects

### 🔒 Security Features
- ✅ **Password Hashing**: Django's built-in secure password hashing
- ✅ **JWT Authentication**: Stateless token-based authentication (7-day expiration)
- ✅ **Protected API Endpoints**: All task routes require authentication
- ✅ **CORS Configuration**: Whitelist configuration for frontend-backend communication
- ✅ **SQL Injection Protection**: Django ORM prevents SQL injection attacks

### 🛠️ Technical Implementation
- ✅ **RESTful API**: Well-structured API with proper HTTP methods
- ✅ **Axios Interceptors**: Automatic JWT token attachment to requests
- ✅ **Error Interceptors**: Handle 401 errors and redirect to login
- ✅ **Database Migrations**: Django migration system
- ✅ **Docker Support**: Full containerization for both frontend and backend
- ✅ **Environment Variables**: Configuration via .env files

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2 | UI library for building component-based interfaces |
| **Axios** | 1.6.2 | HTTP client for API requests with interceptors |
| **Lucide React** | 0.263.1 | Modern icon library for UI elements |
| **CSS-in-JS** | - | Inline styling for component encapsulation |

**Why React?**
- Component-based architecture promotes code reusability
- Virtual DOM ensures optimal rendering performance
- Large ecosystem with excellent community support
- React Hooks provide clean and simple state management
- Seamless integration with REST APIs

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Django** | 4.2.7 | Robust Python web framework |
| **Django REST Framework** | 3.14.0 | RESTful API development toolkit |
| **PyJWT** | 2.8.0 | JWT token generation and validation |
| **django-cors-headers** | 4.3.1 | CORS handling for frontend communication |
| **SQLite** | 3.x | Development database (PostgreSQL ready) |

**Why Django?**
- Batteries-included framework with ORM, admin panel, and authentication
- Django REST Framework accelerates API development
- Built-in security features (SQL injection protection, XSS prevention, CSRF protection)
- Excellent documentation and large community
- Production-ready and highly scalable

### DevOps

| Technology | Purpose |
|------------|---------|
| **Docker** | Containerization for consistent development and deployment |
| **Docker Compose** | Multi-container orchestration |

---
---

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **Docker** and Docker Compose (for containerized setup)
- **Git**

### Option 1: Using Docker (Recommended) ⚡

This is the fastest way to get the application running with a single command.

1. **Clone the repository**
```bash
   git clone https://github.com/YOUR_USERNAME/mini-task-manager.git
   cd mini-task-manager
```

2. **Start the application**
```bash
   docker-compose up --build
```

3. **Access the application**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:8000/api
   - **Django Admin**: http://localhost:8000/admin

4. **Stop the application**
```bash
   docker-compose down
```

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend directory**
```bash
   cd backend
```

2. **Create and activate virtual environment**
```bash
   # On macOS/Linux
   python -m venv venv
   source venv/bin/activate

   # On Windows
   python -m venv venv
   venv\Scripts\activate
```

3. **Install dependencies**
```bash
   pip install -r requirements.txt
```

4. **Set up environment variables**
```bash
   cp .env.example .env
   # Edit .env with your configuration if needed
```

5. **Run database migrations**
```bash
   python manage.py migrate
```

6. **Create superuser (optional, for admin panel access)**
```bash
   python manage.py createsuperuser
```

7. **Start the development server**
```bash
   python manage.py runserver
```

   Backend will be available at **http://localhost:8000**

#### Frontend Setup

1. **Navigate to frontend directory (in a new terminal)**
```bash
   cd frontend
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**
```bash
   cp .env.example .env
   # Edit .env if needed (default values should work)
```

4. **Start the development server**
```bash
   npm start
```

   Frontend will be available at **http://localhost:3000**

---

## 🔌 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Authentication Endpoints

#### 1. User Signup
**Endpoint:** `POST /api/auth/signup/`

**Request:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:** `201 Created`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

#### 2. User Login
**Endpoint:** `POST /api/auth/login/`

**Request:**
```json
{
  "username": "john_doe",
  "password": "securepassword123"
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### Task Endpoints (Authentication Required)

**Authentication Header Required:**
```
Authorization: Bearer <your-jwt-token>
```

#### 3. Get All Tasks
**Endpoint:** `GET /api/tasks/`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive docs for the task manager",
    "status": "pending",
    "created_at": "2024-11-16T10:30:00Z",
    "updated_at": "2024-11-16T10:30:00Z"
  },
  {
    "id": 2,
    "title": "Review pull requests",
    "description": "Review and merge pending PRs",
    "status": "completed",
    "created_at": "2024-11-15T14:20:00Z",
    "updated_at": "2024-11-16T09:15:00Z"
  }
]
```

#### 4. Create Task
**Endpoint:** `POST /api/tasks/`

**Request:**
```json
{
  "title": "New Task",
  "description": "Task description here",
  "status": "pending"
}
```

**Response:** `201 Created`
```json
{
  "id": 3,
  "title": "New Task",
  "description": "Task description here",
  "status": "pending",
  "created_at": "2024-11-16T11:00:00Z",
  "updated_at": "2024-11-16T11:00:00Z"
}
```

#### 5. Update Task
**Endpoint:** `PUT /api/tasks/{id}/`

**Request:**
```json
{
  "title": "Updated Task Title",
  "description": "Updated description",
  "status": "completed"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Updated Task Title",
  "description": "Updated description",
  "status": "completed",
  "created_at": "2024-11-16T10:30:00Z",
  "updated_at": "2024-11-16T12:00:00Z"
}
```

#### 6. Delete Task
**Endpoint:** `DELETE /api/tasks/{id}/`

**Response:** `204 No Content`

---

## 🔐 Environment Variables

### Backend (.env)

Create a `.env` file in the `backend/` directory:
```env
SECRET_KEY=your-secret-key-here-change-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend (.env)

Create a `.env` file in the `frontend/` directory:
```env
REACT_APP_API_URL=http://localhost:8000/api
```

---

## ⏱️ Time Spent & Development Process

### Total Time: ~2.5 - 3 hours

| Phase | Time | Details |
|-------|------|---------|
| **Planning & Architecture** | 15 min | Database schema design, API endpoint planning, component structure |
| **Backend Development** | 1 hour | Django models, serializers, views, JWT authentication, CORS setup |
| **Frontend Development** | 1 hour | React components, API service layer, UI styling, error handling |
| **Docker Configuration** | 20 min | Dockerfile creation for both services, docker-compose.yml setup |
| **Testing & Bug Fixes** | 20 min | Manual testing, fixing CORS issues, trailing slash bugs, CSS overflow |
| **Documentation** | 20 min | README creation, code comments, API documentation |

---

## 🤔 Design Decisions & Trade-offs

### Technology Choices & Reasoning

#### 1. **Django + Django REST Framework**

**Why Chosen:**
- **Rapid Development**: Built-in ORM eliminates need for raw SQL
- **Security First**: Built-in protection against SQL injection, XSS, CSRF
- **Admin Panel**: Free admin interface for data management
- **DRF**: Simplifies API creation with serializers and viewsets
- **Scalability**: Production-ready and battle-tested
- **Documentation**: Excellent official docs and large community

**Trade-offs:**
- Heavier framework compared to Flask or FastAPI
- Python's GIL can be a bottleneck for CPU-intensive tasks (not applicable here)
- More opinionated structure (good for consistency, less flexibility)

#### 2. **JWT Authentication**

**Why Chosen:**
- **Stateless**: No server-side session storage required
- **Scalability**: Works seamlessly across multiple servers
- **Mobile-Ready**: Perfect for SPAs and mobile applications
- **Cross-Domain**: Easier to implement cross-domain authentication

**Trade-offs:**
- Cannot invalidate tokens before expiration (implemented 7-day expiry as mitigation)
- Token size is larger than session cookies
- Need to implement refresh tokens for production (not done due to time constraint)

#### 3. **SQLite (Development) → PostgreSQL (Production-Ready)**

**Why Chosen:**
- **SQLite**: Zero configuration, file-based, perfect for development
- **Easy Migration**: Django ORM makes switching to PostgreSQL trivial
- **Development Speed**: No database setup required to start coding

**Trade-offs:**
- SQLite lacks some advanced PostgreSQL features (full-text search, advanced indexing)
- Not suitable for high-concurrency production environments
- Limited concurrent write operations

#### 4. **React with Hooks**

**Why Chosen:**
- **Modern Approach**: Hooks are the recommended way to write React
- **Cleaner Code**: Functional components are more concise than class components
- **Local State**: useState/useEffect sufficient for this app size
- **No Redux Needed**: Avoided complexity for small-scale state management

**Trade-offs:**
- Context API or Redux might be better for larger applications
- No built-in state persistence (using localStorage for auth token)
- Could benefit from React Query for server state management

#### 5. **Inline Styles (CSS-in-JS)**

**Why Chosen:**
- **Fast Development**: No need to switch between files
- **Component Scoping**: Styles are encapsulated per component
- **No Build Step**: No CSS preprocessor or Tailwind compilation needed
- **Dynamic Styling**: Easy to pass props for conditional styles

**Trade-offs:**
- **Less Maintainable**: Hard to share common styles across components
- **No Class Reusability**: Each component redefines similar styles
- **Performance**: Slight overhead compared to static CSS
- **Better Alternatives**: Tailwind CSS or styled-components for production

#### 6. **Function-Based Views (Django)**

**Why Chosen:**
- **Simplicity**: Easier to read and understand for straightforward CRUD
- **Less Boilerplate**: Direct function calls instead of class inheritance
- **Debugging**: Simpler stack traces
- **Sufficient**: Adequate for basic REST operations

**Trade-offs:**
- Class-Based Views (CBVs) offer more code reusability
- Generic views would reduce code for standard CRUD patterns
- Less DRY (Don't Repeat Yourself) compared to ViewSets

---

## 🐳 Docker Commands
```bash
# Start all services
docker-compose up

# Start in detached mode (background)
docker-compose up -d

# Start with rebuild
docker-compose up --build

# View logs (all services)
docker-compose logs -f

# View logs (specific service)
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop services
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop and remove containers + volumes
docker-compose down -v

# Restart services
docker-compose restart

# Execute commands in running containers
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser
docker-compose exec backend python manage.py shell

# View running containers
docker ps

# View all containers (including stopped)
docker ps -a

# Remove unused Docker resources
docker system prune -a
```

---

**Made with ❤️ using React & Django**
