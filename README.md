# PreseGuide 🎤

<div align="center">

**An AI-Powered Automated Presentation Coach**

Transform your presentations with real-time analysis, personalized coaching, and gamified learning.

![PreseGuide Banner](https://via.placeholder.com/1200x400/4F46E5/FFFFFF?text=PreseGuide+-+Master+Your+Presentations)

[![Django](https://img.shields.io/badge/Django-5.0-092E20?logo=django)](https://www.djangoproject.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-000000?logo=next.js)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-316192?logo=postgresql)](https://neon.tech/)
[![Google Gemini](https://img.shields.io/badge/AI-Google_Gemini-4285F4?logo=google)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[Features](#features) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Roadmap](#roadmap)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Development Roadmap](#development-roadmap)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## 🎯 About

PreseGuide is an intelligent presentation coaching platform that helps users deliver better presentations through AI-powered analysis and feedback. It analyzes recorded practice sessions for filler words, pacing, clarity, and provides actionable coaching tips to improve presentation skills.

### **The Problem**
Delivering effective presentations is challenging. Most people struggle with filler words, inconsistent pacing, and unclear messaging. Traditional coaching is expensive and time-consuming.

### **Our Solution**
PreseGuide combines AI analysis with gamification to provide:
- **Instant feedback** on presentation performance
- **Iterative improvement** through multiple practice sessions
- **Context-aware coaching** using your actual presentation materials
- **Team collaboration** for group presentations
- **Gamified learning** to keep you motivated

---

## ✨ Features

### **Core Features**

#### 🎙️ **Audio Analysis Engine**
- **Speech-to-Text Transcription** using Google Gemini API
- **Filler Word Detection** (um, uh, like, you know, etc.)
- **Pacing Analysis** with words-per-minute calculation
- **Clarity Assessment** for sentence structure and vocabulary
- **Tone & Energy Analysis** using audio signal processing

#### 📄 **Document Context Integration**
- Upload presentations as **PDF or PPTX**
- AI extracts key points and structure
- **Slide-by-slide guidance** on what to say
- Content alignment verification
- Missed key points identification

#### 🤖 **AI Coaching System**
- Personalized feedback powered by Google Gemini
- Actionable improvement suggestions
- Severity-based recommendations (critical, moderate, minor)
- Context-aware coaching based on your materials

#### 📊 **Iterative Improvement Tracking**
- Multiple recording iterations per presentation
- Automatic improvement calculation
- Visual progress charts
- Threshold-based completion system

#### 🎮 **Gamification System**
- **5-Level Progression**: First Words → Finding Voice → Building Confidence → Commanding Presence → Presentation Master
- **XP System**: Earn points for uploads, improvements, and completions
- **Badges**: Achievement system for milestones
- **Progress Bars**: Visual feedback for each presentation

#### 👥 **Team Collaboration** (Similar to Perplexity Spaces)
- Shareable presentation spaces with unique links
- Role-based permissions (owner, editor, viewer)
- Real-time presence indicators
- Comment system with timestamp references
- WebSocket-powered live updates

### **Advanced Features** (Coming Soon)

- **Q&A Generator**: AI-generated audience questions with answer frameworks
- **Mind Map Visualizations**: Interactive concept maps for memory retention
- **Content Coach**: Guided questionnaire for presentation planning
- **Body Gesture Suggestions**: Time-based physical delivery tips
- **PPT Modification Recommendations**: Design improvement suggestions
- **Research Resources**: Automatic relevant resource discovery

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: [Next.js 14+](https://nextjs.org/) (React with App Router)
- **Authentication**: NextAuth.js with Google OAuth
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Context API
- **HTTP Client**: Axios with interceptors
- **Real-time**: WebSocket client for live features

### **Backend**
- **Framework**: [Django 5.0](https://www.djangoproject.com/) with Django REST Framework
- **Authentication**: Google OAuth 2.0 + JWT (SimpleJWT)
- **Real-time**: Django Channels + WebSockets + Redis
- **AI/ML**: Google Gemini API (speech-to-text + analysis)
- **Audio Processing**: PyDub, LibROSA (Python libraries)
- **Document Processing**: PyMuPDF, python-pptx

### **Database**
- **Primary**: [Neon PostgreSQL](https://neon.tech/) (serverless Postgres)
- **Cache/Sessions**: Redis (for Channels layer)

### **Deployment**
- **Backend Hosting**: [Render](https://render.com/) (free tier: 512MB RAM, 750hrs/month)
- **Frontend Hosting**: [Vercel](https://vercel.com/) (free tier: 100GB bandwidth)
- **Database**: Neon PostgreSQL (free tier: 3GB storage)

### **APIs & Services**
- **Google Gemini**: AI analysis and coaching
- **Google OAuth**: User authentication
- **Sentry**: Error tracking (optional)

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.11+** ([Download](https://www.python.org/downloads/))
- **Node.js 18+** and npm ([Download](https://nodejs.org/))
- **PostgreSQL** (local) OR Neon account ([Sign up](https://neon.tech/))
- **Redis** (for WebSockets) ([Installation guide](https://redis.io/docs/getting-started/installation/))
- **Git** ([Download](https://git-scm.com/))

### **Required Accounts**

1. **Google Cloud Console** - For OAuth and Gemini API
   - [Create project](https://console.cloud.google.com/)
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Get Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

2. **Neon PostgreSQL** - Database hosting
   - [Sign up](https://neon.tech/)
   - Create a new project
   - Copy connection string

3. **GitHub Account** - For version control and deployment



## 🚀 Installation

### **Step 1: Clone the Repository**

```

git clone https://github.com/thechaitanyaanand/preseguide.git
cd preseguide

```

### **Step 2: Backend Setup**

```


# Navigate to backend directory

cd backend

# Create virtual environment

python -m venv venv

# Activate virtual environment

# On macOS/Linux:

source venv/bin/activate

# On Windows:

venv\Scripts\activate

# Install dependencies

pip install -r requirements.txt

# Copy environment template

cp .env.example .env

# Edit .env with your actual values

nano .env  \# or use your preferred editor

```

**Generate Django Secret Key:**
```

python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"

```

### **Step 3: Database Setup**

```


# Run migrations

python manage.py makemigrations
python manage.py migrate

# Create superuser for admin access

python manage.py createsuperuser

# Enter email, username, and password when prompted

```

### **Step 4: Frontend Setup**

```


# Open a new terminal window

cd frontend

# Install dependencies

npm install

# Copy environment template

cp .env.local.example .env.local

# Edit .env.local with your values

nano .env.local

```

---

## ⚙️ Configuration

### **Backend Environment Variables** (`backend/.env`)

```


# Django Settings

SECRET_KEY=your-generated-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database (Neon PostgreSQL)

DATABASE_URL=postgresql://user:password@host.neon.tech/database?sslmode=require

# Google OAuth (from Google Cloud Console)

GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret

# Google Gemini API (from AI Studio)

GEMINI_API_KEY=your-gemini-api-key

# JWT Settings (in minutes)

JWT_ACCESS_TOKEN_LIFETIME=15
JWT_REFRESH_TOKEN_LIFETIME=10080

# CORS (add frontend URL)

CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Redis (for WebSockets)

REDIS_URL=redis://localhost:6379

```

### **Frontend Environment Variables** (`frontend/.env.local`)

```


# API Configuration

NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
NEXT_PUBLIC_WS_URL=ws://127.0.0.1:8000/ws

# Google OAuth (same as backend)

GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret

# NextAuth Configuration

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-a-random-secret-here

```

**Generate NextAuth Secret:**
```

openssl rand -base64 32

```

### **Getting Google OAuth Credentials**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure OAuth consent screen if prompted
6. Application type: **Web application**
7. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (frontend)
   - `http://127.0.0.1:8000/api/auth/google/callback/` (backend)
8. Copy **Client ID** and **Client Secret**

### **Getting Gemini API Key**

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **Create API Key**
4. Select your Cloud project
5. Copy the generated API key

---

## 🏃 Running the Application

### **Development Mode**

#### **Terminal 1: Backend Server**
```

cd backend
source venv/bin/activate  \# On Windows: venv\Scripts\activate
python manage.py runserver

```
Backend runs at: `http://127.0.0.1:8000/`

#### **Terminal 2: Redis Server** (for WebSockets)
```

redis-server

```
Redis runs at: `redis://localhost:6379`

#### **Terminal 3: Frontend Server**
```

cd frontend
npm run dev

```
Frontend runs at: `http://localhost:3000/`

### **Access Points**

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://127.0.0.1:8000/api/
- **Django Admin**: http://127.0.0.1:8000/admin/
- **API Documentation**: http://127.0.0.1:8000/api/docs/ (coming soon)

---

## 📁 Project Structure

```

preseguide/
├── backend/                    \# Django backend
│   ├── config/                 \# Project configuration
│   │   ├── settings.py         \# Django settings
│   │   ├── urls.py             \# Root URL configuration
│   │   ├── asgi.py             \# ASGI config for WebSockets
│   │   └── wsgi.py             \# WSGI config
│   ├── accounts/               \# User authentication \& profiles
│   │   ├── models.py           \# User, UserProfile models
│   │   ├── serializers.py      \# API serializers
│   │   ├── views.py            \# Auth endpoints
│   │   └── urls.py             \# Account routes
│   ├── presentations/          \# Core presentation logic
│   │   ├── models.py           \# Presentation, Recording, Document
│   │   ├── serializers.py      \# API serializers
│   │   ├── views.py            \# CRUD \& analysis endpoints
│   │   ├── services/           \# Business logic
│   │   │   ├── audio_analyzer.py
│   │   │   ├── document_processor.py
│   │   │   └── ai_coach.py
│   │   └── urls.py
│   ├── collaboration/          \# Team features \& WebSockets
│   │   ├── models.py           \# Space, SpaceMember, Comment
│   │   ├── consumers.py        \# WebSocket consumers
│   │   ├── routing.py          \# WebSocket routing
│   │   └── views.py
│   ├── gamification/           \# Levels, XP, badges
│   │   ├── models.py           \# Badge, Achievement
│   │   ├── services/
│   │   │   └── xp_calculator.py
│   │   └── views.py
│   ├── media/                  \# User uploads (temporary)
│   ├── staticfiles/            \# Static assets
│   ├── requirements.txt        \# Python dependencies
│   ├── .env                    \# Environment variables
│   └── manage.py               \# Django CLI
│
├── frontend/                   \# Next.js frontend
│   ├── app/                    \# App Router pages
│   │   ├── (auth)/             \# Auth pages
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (dashboard)/        \# Protected pages
│   │   │   ├── dashboard/
│   │   │   ├── presentations/
│   │   │   └── profile/
│   │   ├── api/                \# API routes
│   │   │   └── auth/           \# NextAuth config
│   │   ├── layout.tsx          \# Root layout
│   │   └── page.tsx            \# Home page
│   ├── components/             \# React components
│   │   ├── ui/                 \# shadcn/ui components
│   │   ├── auth/               \# Auth-related
│   │   ├── presentation/       \# Presentation features
│   │   └── shared/             \# Shared components
│   ├── lib/                    \# Utilities
│   │   ├── api.ts              \# API client
│   │   ├── auth.ts             \# Auth helpers
│   │   └── utils.ts            \# Common utilities
│   ├── hooks/                  \# Custom React hooks
│   ├── public/                 \# Static assets
│   ├── styles/                 \# Global styles
│   ├── package.json            \# Node dependencies
│   ├── next.config.js          \# Next.js configuration
│   ├── tailwind.config.js      \# Tailwind CSS config
│   ├── .env.local              \# Environment variables
│   └── tsconfig.json           \# TypeScript config
│
├── .gitignore
├── README.md                   \# This file
└── LICENSE

```

---

## 📡 API Documentation

### **Authentication Endpoints**

#### **POST** `/api/auth/google/`
Authenticate with Google OAuth token.

**Request:**
```

{
"token": "google-id-token-from-frontend"
}

```

**Response:**
```

{
"user": {
"id": "uuid",
"email": "user@example.com",
"username": "username",
"level": 1,
"total_xp": 10,
"badges": ["welcome"]
},
"access": "jwt-access-token",
"refresh": "jwt-refresh-token"
}

```

#### **POST** `/api/auth/logout/`
Logout and blacklist refresh token.

**Request:**
```

{
"refresh": "jwt-refresh-token"
}

```

#### **GET** `/api/auth/me/`
Get current authenticated user.

**Response:**
```

{
"id": "uuid",
"email": "user@example.com",
"level": 2,
"level_name": "Finding Voice",
"total_xp": 75,
"xp_for_next_level": 75,
"badges": ["welcome", "first_recording"],
"profile": {
"notification_enabled": true,
"total_presentations": 3,
"total_recordings": 8
}
}

```

### **Presentation Endpoints** (Coming in Phase 2)

- `GET /api/presentations/` - List user's presentations
- `POST /api/presentations/` - Create new presentation
- `GET /api/presentations/{id}/` - Get presentation details
- `POST /api/presentations/{id}/recordings/` - Upload recording
- `GET /api/presentations/{id}/analysis/` - Get analysis results

### **Collaboration Endpoints** (Coming in Phase 6)

- `POST /api/spaces/` - Create presentation space
- `GET /api/spaces/{token}/` - Join space via share link
- `POST /api/spaces/{id}/comments/` - Add comment

**Full API documentation coming soon with Swagger/OpenAPI.**

---

## 🗺️ Development Roadmap

### **✅ Phase 1: Foundation & Authentication** (Hour 1-2) - CURRENT
- [x] Django project setup with REST Framework
- [x] Custom User model with UUID and gamification
- [x] Google OAuth integration
- [x] JWT authentication with SimpleJWT
- [x] User profile management
- [x] Next.js project setup (coming next)
- [x] NextAuth.js configuration (coming next)
- [ ] Protected routes and layouts (coming next)

### **🔄 Phase 2: Core Audio Analysis** (Hour 3-5) - NEXT
- [ ] Audio upload and validation
- [ ] Gemini API integration for speech-to-text
- [ ] Filler word detection algorithm
- [ ] Pacing analysis engine
- [ ] Clarity assessment module
- [ ] Feedback generation with AI
- [ ] Recording management system

### **📋 Phase 3: Document Context** (Hour 6-7)
- [ ] PDF/PPTX upload and processing
- [ ] PyMuPDF and python-pptx integration
- [ ] Content extraction and structuring
- [ ] Slide-by-slide guidance system
- [ ] Content alignment analysis

### **🎨 Phase 4: Advanced Features** (Later if selected)
- [ ] Q&A generator
- [ ] Mind map visualizations with React Flow
- [ ] Content coach questionnaire
- [ ] Research resource finder

### **🎮 Phase 5: Gamification** (Later if selected)
- [ ] Level progression system
- [ ] Badge achievement system
- [ ] Progress visualizations
- [ ] Leaderboard (optional)

### **👥 Phase 6: Team Collaboration** (Later if selected)
- [ ] Presentation spaces model
- [ ] WebSocket consumers with Django Channels
- [ ] Real-time presence tracking
- [ ] Comment system with timestamps
- [ ] Share link generation

### **✨ Phase 7: Optional Features** (Later if selected)
- [ ] Body gesture suggestions
- [ ] PPT modification recommendations
- [ ] Mood analysis

### **🚀 Phase 8: Deployment** (Will do after whatevers ready at the end of the hackathon)
- [ ] Render backend deployment
- [ ] Vercel frontend deployment
- [ ] Environment configuration
- [ ] Performance optimization
- [ ] Monitoring setup with Sentry

---

## 🧪 Testing

### **Backend Tests**

```

cd backend
python manage.py test

```

**Test coverage:**
```

pip install coverage
coverage run --source='.' manage.py test
coverage report

```

### **Frontend Tests**

```

cd frontend
npm run test

```

**E2E Tests (with Playwright):**
```

npm run test:e2e

```

---

## 🌐 Deployment

### **Backend Deployment (Render)**

1. Create `render.yaml` in project root:
```

services:

- type: web
name: preseguide-backend
env: python
buildCommand: "pip install -r requirements.txt \&\& python manage.py collectstatic --noinput \&\& python manage.py migrate"
startCommand: "daphne -b 0.0.0.0 -p \$PORT config.asgi:application"

```

2. Connect GitHub repository to Render
3. Add environment variables in Render dashboard
4. Deploy!

**Note:** Free tier spins down after 15min inactivity (~1min cold start).

### **Frontend Deployment (Vercel)**

1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Set build command: `npm run build`
4. Deploy automatically on push to main branch

### **Database (Neon)**

- Already set up during development
- No additional deployment steps needed
- Monitor storage usage (3GB free limit)

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### **Reporting Bugs**

1. Check if the bug has already been reported in [Issues](https://github.com/yourusername/preseguide/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, versions)

### **Suggesting Features**

1. Open an issue with the `enhancement` label
2. Describe the feature and its benefits
3. Include mockups or examples if possible

### **Code Contributions**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Write/update tests
5. Commit with clear messages: `git commit -m 'Add amazing feature'`
6. Push to your fork: `git push origin feature/amazing-feature`
7. Open a Pull Request

### **Code Style**

- **Python**: Follow PEP 8, use Black for formatting
- **JavaScript/TypeScript**: Follow ESLint config, use Prettier
- **Commits**: Use conventional commit messages

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```

MIT License

Copyright (c) 2025 PreseGuide Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.

```

---

## 💬 Support

### **Documentation**

- **API Docs**: http://127.0.0.1:8000/api/docs/ (local)
- **Project Wiki**: [Coming soon]

### **Community**

- **Discord**: [Join our server] (coming soon)
- **Discussion Forum**: [GitHub Discussions](https://github.com/yourusername/preseguide/discussions)

### **Contact**

- **Email**: support@preseguide.com (update with your email)
- **Issues**: [GitHub Issues](https://github.com/yourusername/preseguide/issues)

---

## 🙏 Acknowledgments

- **Google Gemini** for powerful AI capabilities
- **Django** and **Next.js** communities for excellent frameworks
- **shadcn/ui** for beautiful UI components
- All contributors and early testers

---

## 📊 Project Status

- **Current Version**: 0.1.0 (Phase 1 - Authentication)
- **Status**: 🟡 In Active Development
- **Next Release**: Phase 2 - Core Audio Analysis (ETA: 3 weeks)

---

<div align="center">

**Built with ❤️ by the PreseGuide Team**

[Website](https://preseguide.com) • [Twitter](https://twitter.com/preseguide) • [LinkedIn](https://linkedin.com/company/preseguide)

⭐ Star us on GitHub — it motivates us a lot!

</div>
```


***

## **Additional Files to Create**

### **`.gitignore`** (Root directory)

```gitignore
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
venv/
env/
.env
*.sqlite3
*.db

# Django
/media
/staticfiles
db.sqlite3

# Node
node_modules/
.next/
out/
build/
dist/
.env.local
.env.production.local
*.log

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Misc
coverage/
.pytest_cache/
```


### **`LICENSE`** (Root directory)

```
MIT License

Copyright (c) 2025 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

This comprehensive README covers everything a developer or user needs to understand, set up, and contribute to PreseGuide. Copy this into your project's root directory as `README.md` and customize the URLs, contact information, and other placeholders as needed!
<span style="display:none">[^1][^10][^2][^3][^4][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://github.com/QueraTeam/django-nextjs

[^2]: https://stackoverflow.com/questions/72272216/how-do-i-include-a-django-projects-readme-md-in-a-template

[^3]: https://www.reddit.com/r/django/comments/187hg05/how_should_i_connect_next_js_frontend_to_django/

[^4]: https://www.youtube.com/watch?v=q0VWqKalXfc

[^5]: https://github.com/stanleyfok/nextjs-template/blob/master/README.md

[^6]: https://github.com/othneildrew/Best-README-Template

[^7]: https://cubettech.com/resources/blog/the-essential-readme-file-elevating-your-project-with-a-comprehensive-document/

[^8]: http://hernantz.github.io/django-ui-components-for-perfectionists-with-deadlines.html

[^9]: https://gitlab.com/thorgate-public/django-project-template/-/blob/master/README.md

[^10]: https://www.reddit.com/r/django/comments/1lau7ln/i_built_a_modern_aipowered_admin_for_django_using/

