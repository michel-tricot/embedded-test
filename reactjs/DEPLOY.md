# 🚀 Deploy React App to Vercel

This guide will help you deploy the React version of the Airbyte Embedded Widget demo to Vercel.

## ⚡ Quick Deploy

### Option 1: Deploy Button (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/michel-tricot/embedded-test&project-name=airbyte-demo-react&root-directory=reactjs)

### Option 2: Manual Deploy

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy from reactjs directory**
   ```bash
   cd reactjs
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project? `N`
   - Project name: `airbyte-embedded-demo-react`
   - Directory: `./` (current directory)
   - Settings correct? `Y`

## 🔧 Environment Variables

After deployment, add these environment variables in the Vercel dashboard:

### Required Variables
```bash
REACT_APP_API_URL=https://your-server-url.vercel.app/api
```

**Note:** Replace `your-server-url.vercel.app` with your actual deployed server URL.

### How to Add Environment Variables

1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Settings** tab
3. Click **Environment Variables** in sidebar
4. Add the variable:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://your-server-url.vercel.app/api`
   - **Environment**: Production, Preview, Development
5. **Redeploy** your project

## 📝 Important Notes

### Server Dependency
- **Backend Required**: This React app needs the server deployed first
- **Get Server URL**: Deploy the server following `/server/DEPLOY.md`
- **Update API URL**: Set `REACT_APP_API_URL` to your deployed server

### Local Development
- **With Server**: Use `npm start` (uses proxy to localhost:3000)
- **With Production API**: Set `REACT_APP_API_URL` in `.env.local`

## 🔄 Update Deployment

```bash
# From reactjs directory
vercel --prod
```

Or push to GitHub if connected to auto-deploy.

## 🎯 Complete Deployment Flow

### 1. Deploy Server First
```bash
cd ../server
vercel
# Note the deployed URL (e.g., https://airbyte-server-abc123.vercel.app)
```

### 2. Deploy React App
```bash
cd ../reactjs
vercel
# Set REACT_APP_API_URL=https://airbyte-server-abc123.vercel.app/api
```

### 3. Update Server CORS
Update server's `SONAR_ALLOWED_ORIGIN` to your React app URL.

## 🔧 Troubleshooting

### Common Issues

**Q: API calls failing with CORS errors**
A: 
1. Ensure server's `SONAR_ALLOWED_ORIGIN` includes your React app URL
2. Check that `REACT_APP_API_URL` is set correctly

**Q: Environment variables not working**
A: 
1. Ensure variable name starts with `REACT_APP_`
2. Redeploy after adding environment variables
3. Check browser dev tools → Network tab for actual API calls

**Q: 404 errors on page refresh**
A: This is expected for SPAs. Vercel config handles routing automatically.

**Q: Build failing**
A: Check build logs in Vercel dashboard for specific errors

### Debugging
- **Check build logs**: Vercel dashboard → Deployments → View logs
- **Test API URL**: Open `https://your-react-app.vercel.app` → Dev tools → Network
- **Verify environment**: Check if `process.env.REACT_APP_API_URL` is set

## 🚀 Production Checklist

- [ ] Server deployed and working
- [ ] `REACT_APP_API_URL` environment variable set
- [ ] Server's `SONAR_ALLOWED_ORIGIN` includes React app URL
- [ ] Test all three demo flows work
- [ ] Verify Airbyte widget opens correctly

## 📞 Support

- **Vercel Issues**: Check [Vercel Documentation](https://vercel.com/docs)
- **React Issues**: Open GitHub issue
- **Integration Issues**: Test server endpoints directly first

---

**🎉 Your React demo is now live!** Users can access the modern React experience of the Airbyte Embedded Widget demo.