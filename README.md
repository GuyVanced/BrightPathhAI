# BrightPath AI  Learning Platform

An AI-powered learning platform that creates personalized learning paths and provides interactive learning experiences.

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn
- Git

### 1️⃣ Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create and activate virtual environment:
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate

   # Linux/macOS
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   # Windows
   copy .env.example .env
   
   # Linux/macOS
   cp .env.example .env
   ```
   Then edit `.env` with your settings:
   ```env
   DEBUG=True
   SECRET_KEY=your-secret-key-here
   ALLOWED_HOSTS=localhost,127.0.0.1
   CORS_ALLOWED_ORIGINS=http://localhost:5173
   MODEL_PATH=../model/
   TOKENIZER_PATH=../model/tokenizer/
   DATABASE_URL=sqlite:///db.sqlite3
   ```

5. Initialize database:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. Create admin user:
   ```bash
   python manage.py createsuperuser
   ```

7. Start Django server:
   ```bash
   python manage.py runserver
   ```
   Backend will be available at http://localhost:8000/
   Admin interface at http://localhost:8000/admin/

### 2️⃣ Frontend Setup

1. Open a new terminal and navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   Frontend will be available at http://localhost:5173/

## 🏗️ Project Structure

```
BrightPath/
├── backend/                # Django backend
│   ├── config/            # Project configuration
│   ├── core/              # Core functionality
│   ├── exercises/         # Exercise management
│   ├── roadmaps/          # Roadmap functionality
│   ├── shared/            # Shared utilities
│   ├── users/             # User management
│   ├── manage.py          # Django CLI
│   └── requirements.txt   # Python dependencies
│
├── frontend/              # React frontend
│   ├── src/              # Source code
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   └── styles/       # CSS styles
│   ├── public/           # Static files
│   └── package.json      # Node.js dependencies
│
└── model/                # ML model files
    ├── tokenizer/        # Tokenizer files
    └── weights/          # Model weights
```

## 🎯 Features

- 🤖 AI-powered learning path generation
- 📚 Interactive learning content
- 👥 User progress tracking
- 🎯 Personalized recommendations
- 📊 Progress analytics
- 🔄 Adaptive learning paths

## 🛠️ Technology Stack

### Backend
- Django 4.2+
- Django REST Framework
- SQLite (Development)
- Machine Learning:
  - TensorFlow
  - Transformers
  - PyTorch
  - TinyLlama-1.1B-Chat

### Frontend
- React 18+
- Vite
- Tailwind CSS
- Axios

## 📝 API Documentation

Access the API documentation at:
- Swagger UI: http://localhost:8000/api/docs/
- ReDoc: http://localhost:8000/api/redoc/

## 🔧 Development Commands

### Backend
```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Run tests
python manage.py test

# Shell
python manage.py shell
```

### Frontend
```bash
# Development server
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Lint
npm run lint
```

## 🐛 Troubleshooting

### Backend Issues
1. Database errors:
   ```bash
   python manage.py migrate --run-syncdb
   ```

2. Dependencies issues:
   ```bash
   pip install --upgrade -r requirements.txt
   ```

### Frontend Issues
1. Node modules issues:
   ```bash
   rm -rf node_modules
   npm install
   ```

2. Build issues:
   ```bash
   npm run build --force
   ```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
