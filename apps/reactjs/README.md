# Airbyte Embedded Demo - React.js Version

This is a Create React App version of the Airbyte Embedded Widget demo application.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

   The React app will run on `http://localhost:3002`

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

- **React.js advantages:**
  - Pure React implementation with Create React App
  - Proxy configuration for API calls
  - Hot module replacement for fast development
  - Modern React features with hooks
  - Component-based architecture

- **Modern React features:**
  - Functional components with hooks
  - Component-based architecture
  - API client abstraction
  - Theme switching with localStorage persistence

- **Development optimizations:**
  - Hot reloading and fast refresh
  - Error overlay for debugging
  - ESLint integration
  - Cross-platform development support

## Project Structure

```
reactjs/
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
│   ├── api/
│   │   └── client.js
│   ├── App.js
│   ├── index.js
│   └── index.css
└── package.json
```

## API Integration

The React app communicates with the Node.js backend server through:

- **Proxy Configuration**: Configured in `package.json` to proxy `/api/*` to `http://localhost:3000/api/*`
- **Client-side API calls**: Uses centralized API client in `src/api/client.js`
- **Cross-platform Port**: Uses cross-env to ensure consistent port (3002) across platforms

## Development

- **Hot reloading**: Automatic page refresh on file changes
- **Fast refresh**: Preserves React state during development
- **Error overlay**: Helpful error messages in development
- **ESLint integration**: Code quality checking
- **Cross-platform**: Uses cross-env for consistent environment variables

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder with:
- Minified JavaScript and CSS
- Optimized images and assets
- Service worker for caching (if enabled)
- Static files ready for deployment

## Testing

```bash
npm test
```

Runs the test runner in interactive watch mode using Jest and React Testing Library.

## Environment Variables

For production deployment, you may need to set:
- `REACT_APP_API_URL`: The URL of your deployed backend server
