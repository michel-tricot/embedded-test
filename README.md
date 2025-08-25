# Airbyte Embedded Widget Demo

This repository contains multiple implementations of the Airbyte Embedded Widget demo application, showcasing different frontend frameworks and architectures.

## Project Structure

```
embedded-test/
├── server/           # Backend Node.js server
├── static/           # Original vanilla JavaScript frontend
├── react/            # React version (Create React App)
├── nextjs-vite/      # Next.js version with optimizations
└── README.md         # This file
```

## Quick Start

### 1. Start the Backend Server

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your Airbyte credentials
npm run dev
```

Server runs on `http://localhost:3000`

### 2. Choose Your Frontend

#### Vanilla JavaScript (Original)
- Files served directly from `server/static/`
- Access at `http://localhost:3000`

#### React Version
```bash
cd react
npm install
npm run dev
```
Runs on `http://localhost:3001`

#### Next.js Version
```bash
cd nextjs-vite
npm install
npm run dev  
```
Runs on `http://localhost:3002`

## Features

All versions include:
- **Three-step authentication flow**:
  1. Demo password protection
  2. User email authentication  
  3. Airbyte widget integration
- **Light/dark theme switching**
- **Toast notifications**
- **Responsive design**
- **Session persistence**

## Prerequisites

- Node.js 16+ 
- An Airbyte account with Embedded feature enabled
- Contact michel@airbyte.io and teo@airbyte.io for access

## Environment Configuration

Required in `server/.env`:

```bash
SONAR_WEBAPP_PASSWORD=your_demo_password
SONAR_ALLOWED_ORIGIN=http://localhost:3000
SONAR_AIRBYTE_ORGANIZATION_ID=your_organization_id
SONAR_AIRBYTE_CLIENT_ID=your_client_id  
SONAR_AIRBYTE_CLIENT_SECRET=your_client_secret
```

## Version Comparison

| Feature | Vanilla JS | React | Next.js |
|---------|------------|--------|---------|
| Bundle Size | Smallest | Medium | Optimized |
| Performance | Fast | Fast | Fastest |
| SEO | Basic | SPA | SSR Ready |
| Development | Simple | Modern | Advanced |
| Deployment | Static | SPA | Universal |

## API Documentation

The backend provides these endpoints:
- `POST /api/login` - Demo authentication
- `POST /api/users` - User management
- `GET /api/users/me` - Current user
- `POST /api/airbyte/token` - Widget token
- `POST /api/logout` - Session cleanup

See `server/README.md` for detailed API documentation.
