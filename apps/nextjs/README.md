# Airbyte Embedded Demo - Next.js Version

This is a Next.js version of the Airbyte Embedded Widget demo application.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

   The Next.js app will run on `http://localhost:3001`

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

- **Next.js advantages:**
  - Server-side rendering (SSR) ready
  - Optimized image loading with Next.js Image component
  - Automatic code splitting and performance optimizations
  - Built-in API proxy configuration
  - Production-ready build system

- **Modern React features:**
  - Functional components with hooks
  - Component-based architecture
  - API client abstraction
  - Theme switching with localStorage persistence

- **Performance optimizations:**
  - Automatic image optimization
  - Code splitting
  - Built-in CSS optimization
  - Fast refresh for development

## Project Structure

```
nextjs/
├── public/
│   └── octavia-sonar.png
├── src/
│   ├── components/
│   │   ├── ThemeToggle.js
│   │   ├── LogoutToggle.js
│   │   ├── PasswordForm.js
│   │   ├── UserForm.js
│   │   ├── UserInfo.js
│   │   └── Toast.js
│   ├── lib/
│   │   └── apiClient.js
│   ├── pages/
│   │   ├── _app.js
│   │   └── index.js
│   └── styles/
│       └── globals.css
├── next.config.js
└── package.json
```

## API Integration

The Next.js app communicates with the Node.js backend server through:

- **API Proxy**: Configured in `next.config.js` to proxy `/api/*` to `http://localhost:3000/api/*`
- **Client-side API calls**: Uses centralized API client in `src/lib/apiClient.js`
- **SSR compatibility**: All API calls are client-side to maintain compatibility with the existing backend

## Development

- **Hot reloading**: Automatic page refresh on file changes
- **Fast refresh**: Preserves React state during development
- **Error overlay**: Helpful error messages in development
- **TypeScript ready**: Can be easily converted to TypeScript

## Building for Production

```bash
npm run build
npm start
```

This creates an optimized production build with:
- Static site generation where possible
- Automatic code splitting
- Image optimization
- CSS minification
- JavaScript minification

## Testing

```bash
npm run test
```

Testing can be added using Jest and React Testing Library (setup not included by default).

## Environment Variables

For production deployment, you may need to set:
- Next.js automatically handles environment variables with `NEXT_PUBLIC_` prefix for client-side access
