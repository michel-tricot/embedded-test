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
   # From the monorepo root directory
   npm run dev --filter=@airbyte-demo/server
   ```

   The backend API server should be running on `http://localhost:3000`

## Features

- **Three-step authentication flow:**
  1. Password authentication for demo access
  2. User creation/login with email
  3. Airbyte widget integration for data connection

- **React advantages:**
  - Fast development with Create React App
  - Hot reloading for instant feedback
  - Modern React hooks and functional components
  - Component-based architecture
  - Easy testing setup with Jest and React Testing Library

- **Modern React features:**
  - Functional components with hooks (useState, useEffect)
  - Custom API client abstraction
  - Theme switching with localStorage persistence
  - Toast notifications for user feedback
  - Responsive design

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

- **API Client**: Centralized API client in `src/api/client.js`
- **Backend Proxy**: Configured to use the server running on `http://localhost:3000`
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

## Deployment

The React.js version can be deployed to:
- Vercel
- Netlify  
- Railway
- Any static hosting service (GitHub Pages, AWS S3, etc.)

For deployment, you'll need to:
1. Build the app: `npm run build`
2. Upload the `build/` folder contents to your hosting service
3. Configure your server API URL in the environment variables

## Environment Variables

For production deployment, you may need to set:
- `REACT_APP_API_URL`: The URL of your deployed backend server