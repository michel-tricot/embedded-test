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
   # Edit .env with your Airbyte credentials
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
SONAR_WEBAPP_PASSWORD=your_demo_password

# Airbyte credentials
SONAR_ALLOWED_ORIGIN=http://localhost:3000
SONAR_AIRBYTE_ORGANIZATION_ID=your_organization_id
SONAR_AIRBYTE_CLIENT_ID=your_client_id
SONAR_AIRBYTE_CLIENT_SECRET=your_client_secret

# Optional: AWS S3 configuration
SONAR_AWS_ACCESS_KEY=your_aws_access_key
SONAR_AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
SONAR_S3_BUCKET=your_s3_bucket_name
SONAR_S3_BUCKET_REGION=your_s3_bucket_region
SONAR_S3_BUCKET_PREFIX=your_s3_bucket_prefix
```

## Project Structure

```
server/
├── index.js           # Main Express server
├── db.js              # User database operations
├── airbyte_api.js     # Airbyte API integration
├── static/            # Vanilla JS frontend files
│   ├── index.html     # Main HTML page
│   ├── script.js      # Frontend JavaScript
│   ├── styles.css     # CSS styles
│   └── octavia-sonar.png
├── .env.example       # Environment variables template
├── package.json       # Node.js dependencies
└── README.md         # This file
```

## Security Features

- **HTTP-only cookies** for session management
- **Password protection** for demo access
- **API route protection** middleware
- **CORS configuration** with allowed origins
- **Input validation** and sanitization

## Database

Uses SQLite with a simple user table for development. The database file (`users.db`) is created automatically when first needed.

## Development

- **Auto-reload**: `npm run dev` uses nodemon for automatic server restart
- **Logging**: Console output shows all environment variables (secrets masked)
- **Error handling**: Comprehensive error responses for all endpoints

## Deployment

This server can be deployed to any Node.js hosting service:
- Heroku
- Railway
- DigitalOcean App Platform
- AWS EC2/ECS
- Google Cloud Run

Make sure to:
1. Set environment variables in your hosting platform
2. Update `SONAR_ALLOWED_ORIGIN` to your production domain
3. Use HTTPS in production (sets `secure` cookie flag automatically)