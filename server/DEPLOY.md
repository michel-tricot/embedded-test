# 🚀 Deploy Airbyte Embedded Demo to Vercel

This guide will help you deploy the Airbyte Embedded Widget demo server to Vercel.

## ⚡ Quick Deploy

### Option 1: Deploy Button (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/michel-tricot/embedded-test&project-name=airbyte-demo&root-directory=server)

### Option 2: Manual Deploy

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy from server directory**
   ```bash
   cd server
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project? `N`
   - Project name: `airbyte-embedded-demo`
   - Directory: `./` (current directory)
   - Settings correct? `Y`

## 🔧 Environment Variables

After deployment, add these environment variables in the Vercel dashboard:

### Required Variables
```bash
SONAR_WEBAPP_PASSWORD=your_demo_password
SONAR_ALLOWED_ORIGIN=https://your-vercel-url.vercel.app
SONAR_AIRBYTE_ORGANIZATION_ID=your_organization_id
SONAR_AIRBYTE_CLIENT_ID=your_client_id
SONAR_AIRBYTE_CLIENT_SECRET=your_client_secret
```

### How to Add Environment Variables

1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Settings** tab
3. Click **Environment Variables** in sidebar
4. Add each variable:
   - **Name**: `SONAR_WEBAPP_PASSWORD`
   - **Value**: `demopassword` (or your custom password)
   - **Environment**: Production, Preview, Development
5. Repeat for all variables above
6. **Redeploy** your project

## 📝 Important Notes

### Database Limitations
- **Development**: Uses in-memory storage (data resets on each deployment)
- **Production**: Integrate with a persistent database service:
  - [PlanetScale](https://planetscale.com) (MySQL)
  - [Supabase](https://supabase.io) (PostgreSQL)
  - [MongoDB Atlas](https://www.mongodb.com/atlas)
  - [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)

### Custom Domain
1. Go to project **Settings** → **Domains**
2. Add your custom domain
3. Update `SONAR_ALLOWED_ORIGIN` to your custom domain

## 🔄 Update Deployment

```bash
# From server directory
vercel --prod
```

Or push to GitHub if connected to auto-deploy.

## 🎯 Frontend Deployment

### React Version
```bash
cd ../react
vercel
# Set environment variable: REACT_APP_API_URL=https://your-server.vercel.app
```

### Next.js Version
```bash
cd ../nextjs
vercel
# Update API proxy in next.config.js to point to your deployed server
```

## 🔧 Troubleshooting

### Common Issues

**Q: 500 Internal Server Error**
A: Check environment variables are set correctly in Vercel dashboard

**Q: CORS errors**
A: Ensure `SONAR_ALLOWED_ORIGIN` matches your frontend URL exactly

**Q: Widget won't load**
A: Verify all Airbyte credentials are correct in environment variables

**Q: Users not persisting**
A: Expected behavior with in-memory storage. Integrate a database for persistence.

### Logs
View function logs in Vercel dashboard:
1. Go to **Functions** tab
2. Click on a function execution
3. View logs and errors

## 🚀 Production Checklist

- [ ] All environment variables configured
- [ ] Custom domain configured (optional)
- [ ] Database service integrated (for persistence)
- [ ] CORS origins configured correctly
- [ ] Test all three demo flows work
- [ ] Monitor function execution limits

## 📞 Support

- **Vercel Issues**: Check [Vercel Documentation](https://vercel.com/docs)
- **Demo Issues**: Open GitHub issue
- **Airbyte Integration**: Contact [michel@airbyte.io](mailto:michel@airbyte.io)

---

**🎉 Your demo is now live!** Share the URL to showcase Airbyte Embedded Widget integration.