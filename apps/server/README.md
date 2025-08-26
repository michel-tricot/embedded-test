# Airbyte Embedded Demo - Server

This directory contains the backend server for the Airbyte Embedded Widget demo application.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env all the necessary credentials
   ```

3. **Run the server:**
   ```bash
   npm run dev  # Development with auto-reload
   npm start    # Production
   ```

The server will be available at `http://localhost:3000`

## Features

- **Password-protected demo access**
- **User authentication system**
- **Airbyte Embedded Widget token generation**
- **Static file serving** (for vanilla JavaScript version)
- **RESTful API endpoints**

## API Endpoints

### Authentication
- `POST /api/login` - Demo password authentication
- `POST /api/logout` - User logout

### User Management
- `POST /api/users` - Create or login user with email
- `GET /api/users/me` - Get current authenticated user

### Airbyte Integration
- `POST /api/airbyte/token` - Generate Airbyte widget token

### Static Files
- `GET /` - Serves vanilla JavaScript demo (static/index.html)
- `GET /*` - Serves static assets (CSS, JS, images)

## Environment Variables

Required configuration in `.env`:

```bash
# Demo password
SONAR_AIRBYTE_WEBAPP_PASSWORD=your_demo_password

# Airbyte credentials
SONAR_AIRBYTE_ALLOWED_ORIGIN=http://localhost:3000
SONAR_AIRBYTE_ORGANIZATION_ID=your_organization_id
SONAR_AIRBYTE_CLIENT_ID=your_client_id
SONAR_AIRBYTE_CLIENT_SECRET=your_client_secret

# Optional: Redis for user session persistence (falls back to local filesystem)
REDIS_URL=redis://localhost:6379
```

## Project Structure

```
server/
├── src/               # Source code
│   ├── index.js       # Main Express server entry point
│   ├── server.js      # Express server configuration
│   ├── db.js          # Database operations (file/Redis based on env)
│   ├── airbyte_api.js # Airbyte API integration
│   └── utils.js       # Utility functions
├── static/            # Vanilla JS frontend files
│   ├── index.html     # Main HTML page
│   ├── script.js      # Frontend JavaScript
│   ├── styles.css     # CSS styles
│   └── octavia-sonar.png
├── .env.example       # Environment variables template
├── package.json       # Node.js dependencies
├── vercel.json        # Vercel deployment configuration
└── README.md         # This file
```

## Database

- **File Storage**: Uses file-based storage (`users.db`) with async file operations when `REDIS_URL` is not set
- **Redis Storage**: Uses Redis for data persistence when `REDIS_URL` environment variable is configured

The database implementation automatically switches based on the presence of the `REDIS_URL` environment variable.

## Deployment

This server can be deployed to any Node.js hosting service:
- Vercel

Make sure to:
1. Set environment variables in your hosting platform
2. Update `SONAR_AIRBYTE_ALLOWED_ORIGIN` to your production domain
3. Use HTTPS in production (sets `secure` cookie flag automatically)
