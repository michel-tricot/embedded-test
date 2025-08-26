# UI Consistency Requirements

## CRITICAL: Multi-Platform UI Synchronization

**WHENEVER ANY UI change is made, it MUST be synchronized across ALL THREE platforms:**

### 1. Vanilla JS (Server) - `apps/server/static/`
- **Main file:** `index.html`
- **Scripts:** `script.js`  
- **Styles:** `styles.css`
- Pure HTML/CSS/JS implementation

### 2. Next.js App - `apps/nextjs/src/`
- **Main file:** `pages/index.js`
- **Components:** `components/` directory
- **Styles:** `styles/globals.css`
- React with Next.js framework

### 3. React.js App - `apps/reactjs/src/`
- **Main file:** `App.js`
- **Components:** `components/` directory
- **Styles:** `index.css`
- Pure React implementation

## Required Actions for UI Changes

When making ANY UI modification:

1. **Identify the change scope** - Does it affect:
   - Layout/structure
   - Components (forms, buttons, toggles)
   - Styling/theming
   - User interactions
   - Authentication flows

2. **Apply changes to ALL THREE platforms:**
   - Update vanilla JS version first (simplest implementation)
   - Adapt to React.js version (componentize if needed)
   - Adapt to Next.js version (consider SSR implications)

3. **Maintain functional equivalency:**
   - Same user experience across all platforms
   - Same authentication behavior
   - Same theming support (light/dark mode)
   - Same form validation and error handling

4. **Test all implementations:**
   - Verify identical functionality
   - Check responsive design consistency
   - Ensure theme switching works uniformly

## Component Mapping

| Feature | Vanilla JS | Next.js | React.js |
|---------|------------|---------|----------|
| Theme Toggle | Button in HTML + JS | `ThemeToggle` component | `ThemeToggle` component |
| Password Form | HTML form | `PasswordForm` component | `PasswordForm` component |
| User Form | HTML form | `UserForm` component | `UserForm` component |
| User Info | HTML div | `UserInfo` component | `UserInfo` component |
| Toast Messages | HTML div | `Toast` component | `Toast` component |
| Logout Toggle | HTML button | `LogoutToggle` component | `LogoutToggle` component |

## Styling Consistency

- **CSS Variables:** Use consistent CSS custom properties across all implementations
- **Theme Support:** Ensure `data-theme` attribute works uniformly
- **Responsive Design:** Maintain same breakpoints and mobile behavior
- **Visual Identity:** Keep logo, colors, and typography identical

## FAILURE TO MAINTAIN CONSISTENCY WILL RESULT IN:
- Broken user experience across platforms
- Authentication flow discrepancies  
- Visual inconsistencies
- Maintenance difficulties

**NO EXCEPTIONS** - All UI changes must be applied to all three implementations.

## README Consistency Requirements

**WHENEVER ANY README content is modified, ensure consistency across all frontend implementations:**

### Required README Sections (in order):
1. **Title** - Technology-specific (e.g., "React.js Version", "Next.js Version")
2. **Description** - Brief description with technology-specific details
3. **Quick Start** - Installation and startup instructions
4. **Features** - Common features + technology-specific advantages
5. **Project Structure** - Directory structure (technology-specific paths)
6. **API Integration** - How the frontend connects to backend
7. **Development** - Development features and tools
8. **Building for Production** - Build instructions
9. **Testing** - Test setup and commands
10. **Environment Variables** - Production deployment variables

### Consistency Requirements:
- **Common Content**: Features, authentication flow, and general descriptions should be identical
- **Technology-Specific Content**: Build processes, development tools, and framework advantages should reflect the specific technology
- **Port Numbers**: Maintain consistent port assignments (Next.js: 3001, React.js: 3002, Server: 3000)
- **API Integration**: Document the specific proxy/connection method for each frontend

### Technology-Specific Sections:
- **React.js**: Focus on Create React App, proxy configuration, Jest testing
- **Next.js**: Emphasize SSR, image optimization, built-in features, TypeScript readiness
- **Vanilla JS**: Keep server README focused on backend API and static file serving

**FAILURE TO MAINTAIN README CONSISTENCY WILL RESULT IN:**
- Developer confusion about setup procedures
- Inconsistent documentation across implementations
- Different feature descriptions for identical functionality