# MindaRide - Deploy to Render

## Prerequisites
1. Render account (https://render.com)
2. GitHub account with your code pushed
3. Supabase account with project created

## Steps to Deploy:

### 1. Push to GitHub
```bash
git add .
git commit -m "Initial MindaRide deployment"
git push origin main
```

### 2. Connect to Render
- Go to https://dashboard.render.com
- Click "New" → "Web Service"
- Connect your GitHub repository
- Select the branch to deploy (usually `main`)

### 3. Configure Web Service
**Name:** `mindaride`
**Environment:** `Node`
**Plan:** Free (or Starter for better performance)
**Build Command:** `npm install && npm run build`
**Start Command:** `npm run start`

### 4. Add Environment Variables
In Render dashboard, add these environment variables:
- `NODE_ENV` = `production`
- `NEXT_PUBLIC_SUPABASE_URL` = [Get from Supabase Dashboard]
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = [Get from Supabase Dashboard]

### 5. Deploy
Click "Create Web Service"
Render will automatically build and deploy your app!

### 6. Access Your App
Your app will be live at: `https://mindaride.onrender.com` (or similar)

## Environment Variables

Get these from your Supabase project:
1. Go to https://supabase.com/dashboard
2. Select your MindaRide project
3. Settings → API
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Troubleshooting

### Build fails
- Check if all dependencies are listed in `package.json`
- Make sure `npm run build` works locally first

### App not loading
- Check Render logs in dashboard
- Verify environment variables are set correctly
- Make sure Supabase credentials are valid

### Database issues
- Ensure Supabase project is created
- Check if tables are properly set up in Supabase
- Verify RLS (Row Level Security) policies if needed
