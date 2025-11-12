# 🚀 Deployment Guide

This guide covers deploying your RAG Chatbot to production.

## Vercel Deployment (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free tier works)
- Supabase project already set up
- Gemini API key

### Step 1: Push to GitHub

```bash
cd rag-chatbot
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/rag-chatbot.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Step 3: Add Environment Variables

In Vercel project settings → Environment Variables, add:

```
GOOGLE_API_KEY=your_gemini_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Important**: Add these for all environments (Production, Preview, Development)

### Step 4: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build
3. Your app will be live at `https://your-project.vercel.app`

### Step 5: Test Production

1. Visit your deployment URL
2. Click "Init KB" to initialize knowledge base
3. Test chat functionality
4. Upload a test file
5. Verify dark mode works

## Alternative: Railway

### Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables (same as above)
5. Railway will auto-deploy

## Alternative: Netlify

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify env:set GOOGLE_API_KEY "your_key"
netlify env:set NEXT_PUBLIC_SUPABASE_URL "your_url"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "your_key"
netlify deploy --prod
```

## Post-Deployment Checklist

- [ ] Environment variables are set correctly
- [ ] Supabase database is accessible
- [ ] Knowledge base initialization works
- [ ] File uploads function properly
- [ ] Chat streaming works
- [ ] Dark mode persists
- [ ] Mobile responsive
- [ ] No console errors

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as shown
4. Wait for SSL certificate (automatic)

### Update CORS (if needed)

If you encounter CORS issues, update Supabase settings:
1. Go to Supabase → Settings → API
2. Add your domain to allowed origins

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_API_KEY` | Gemini API key from Google AI Studio | ✅ Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | ✅ Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key | ✅ Yes |

## Performance Optimization

### Enable Caching

In `next.config.ts`, add:

```typescript
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/webp'],
  },
};
```

### Database Optimization

1. **Monitor Usage**: Check Supabase dashboard for query performance
2. **Index Optimization**: Already configured in setup script
3. **Connection Pooling**: Supabase handles this automatically

## Monitoring

### Vercel Analytics
- Automatically enabled for Vercel deployments
- View at: Project → Analytics

### Error Tracking
Consider adding:
- Sentry for error tracking
- LogRocket for session replay
- PostHog for product analytics

## Troubleshooting Production Issues

### Build Fails
```bash
# Test build locally first
npm run build
npm start
```

### API Routes Not Working
- Check environment variables are set
- Verify Vercel function region matches Supabase region
- Check function logs in Vercel dashboard

### Slow Response Times
- Check Gemini API quota/limits
- Monitor Supabase query performance
- Consider implementing caching

### Database Connection Issues
- Verify Supabase credentials
- Check if your IP is allowed (Supabase → Settings → Database)
- Test connection locally with production env vars

## Scaling Considerations

### Free Tier Limits
- **Vercel**: 100GB bandwidth, 100 serverless function executions/day
- **Supabase**: 500MB database, 2GB file storage, 50GB bandwidth
- **Gemini API**: Check current quota at AI Studio

### When to Upgrade
- Upgrade Vercel if exceeding bandwidth or function limits
- Upgrade Supabase if database > 500MB or need more compute
- Consider Gemini API paid tier for higher rate limits

## Security Best Practices

1. **Never commit** `.env.local` to git
2. **Rotate API keys** periodically
3. **Enable RLS** (Row Level Security) in Supabase if adding auth
4. **Add rate limiting** for production (consider Vercel Edge Config)
5. **Monitor usage** to detect anomalies

## Backup Strategy

### Database Backups
- Supabase Pro/Team plans include automatic backups
- Or export data periodically:

```sql
-- In Supabase SQL Editor
COPY documents TO '/tmp/backup.csv' WITH CSV HEADER;
```

### Code Backups
- GitHub repository serves as code backup
- Tag releases for version control

## Rollback Process

If deployment has issues:

### Vercel
1. Go to Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

### Railway/Netlify
Similar rollback options in respective dashboards

## Cost Estimation

### Free Tier (Monthly)
- **Hosting**: $0 (Vercel/Railway free tier)
- **Database**: $0 (Supabase free tier)
- **AI API**: $0 (Gemini free tier has generous limits)

### Paid Tier (Monthly, approximate)
- **Vercel Pro**: $20/month
- **Supabase Pro**: $25/month
- **Gemini API**: Pay-per-use (very affordable)

**Total for production app**: ~$45-50/month

## Support Resources

- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Supabase**: [supabase.com/docs](https://supabase.com/docs)
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **Gemini API**: [ai.google.dev/docs](https://ai.google.dev/docs)

---

**Need help?** Check the main [README.md](README.md) or open an issue on GitHub.
