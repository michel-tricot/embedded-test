# Airbyte Embedded Demo - React Version

This is a React version of the Airbyte Embedded Widget demo application.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

   The React app will run on `http://localhost:3001` (or next available port)

3. **Make sure the backend server is running:**
   ```bash
   # In the root directory
   npm run dev
   ```

   The backend API server should be running on `http://localhost:3000`

## Features

- **Three-step authentication flow:**
  1. Password authentication for demo access
  2. User creation/login with email
  3. Airbyte widget integration for data connection

- **Modern React architecture:**
  - Functional components with hooks
  - State management with useState/useEffect
  - Component-based architecture
  - Responsive design

- **Theme switching:**
  - Light/dark theme toggle
  - Theme persistence in localStorage
  - CSS custom properties for theming

- **User experience:**
  - Toast notifications for feedback
  - Loading states and spinners
  - Form validation
  - Responsive design

## Project Structure

```
react/
├── public/
│   ├── index.html
│   └── octavia-sonar.png
├── src/
│   ├── components/
│   │   ├── ThemeToggle.js
│   │   ├── LogoutToggle.js
│   │   ├── PasswordForm.js
│   │   ├── UserForm.js
│   │   ├── UserInfo.js
│   │   └── Toast.js
│   ├── App.js
│   ├── index.js
│   └── index.css
└── package.json
```

## API Integration

The React app communicates with the Node.js backend server running on `http://localhost:3000`:

- `POST /api/login` - Password authentication
- `POST /api/users` - User creation/login
- `GET /api/users/me` - Get current user
- `POST /api/logout` - User logout
- `POST /api/airbyte/token` - Get Airbyte widget token

## Development

The app uses Create React App for the build system and includes:
- Hot module replacement for development
- Proxy configuration to backend API
- Modern JavaScript features (ES6+)
- CSS custom properties for theming

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.