# 🚀 Deployment Guide for Moveryy Web Application

This guide covers all deployment options for the Moveryy web application.

## 📋 Prerequisites

- **Node.js** 18 or higher
- **npm** 8 or higher
- **Git** for version control

## 🛠 Quick Deployment

### Option 1: Automated Script (Recommended)

**Windows:**
```bash
./deploy.bat
```

**Linux/Mac:**
```bash
./deploy.sh
```

### Option 2: Manual Commands

```bash
# Install dependencies
npm ci

# Build for production
npm run build

# Preview locally
npm run preview
```

## 🌐 Platform-Specific Deployments

### 1. Vercel (Recommended for React Apps)

**Prerequisites:**
- Vercel account
- Vercel CLI installed

**Steps:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
npm run deploy:vercel
```

**Environment Variables:**
Set these in your Vercel dashboard:
- `VITE_API_BASE_URL`
- `VITE_GOOGLE_MAPS_API_KEY`
- `VITE_STRIPE_PUBLISHABLE_KEY`

### 2. Netlify

**Prerequisites:**
- Netlify account
- Netlify CLI installed

**Steps:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
npm run deploy:netlify
```

**Build Settings:**
- Build command: `npm run build`
- Publish directory: `dist`

### 3. AWS S3 + CloudFront

**Prerequisites:**
- AWS account
- AWS CLI configured

**Steps:**
```bash
# Build the app
npm run build

# Sync to S3 bucket
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### 4. Docker Deployment

**Prerequisites:**
- Docker installed
- Docker Compose (optional)

**Single Container:**
```bash
# Build image
npm run docker:build

# Run container
npm run docker:run
```

**Docker Compose:**
```bash
# Start all services
npm run docker:compose

# Stop all services
npm run docker:compose:down
```

### 5. Traditional Web Server (Apache/Nginx)

**Steps:**
```bash
# Build the app
npm run build

# Copy dist/ contents to web server root
cp -r dist/* /var/www/html/
```

**Nginx Configuration:**
The project includes `nginx.conf` for proper SPA routing.

## 🔧 Environment Configuration

### Development
```bash
cp .env.example .env.development
# Edit with development values
```

### Production
```bash
cp .env.example .env.production
# Edit with production values
```

### Required Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_BASE_URL` | Backend API endpoint | Yes |
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps integration | Optional |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Payment processing | Optional |
| `VITE_FIREBASE_API_KEY` | Firebase services | Optional |

## 🔄 CI/CD Pipeline

### GitHub Actions

The project includes `.github/workflows/deploy.yml` for automated deployment:

1. **Triggers:** Push to main/master branch
2. **Steps:**
   - Install dependencies
   - Run linting
   - Build application
   - Deploy to chosen platform
   - Build Docker image (optional)

### Required Secrets

Add these to your GitHub repository secrets:

**Vercel:**
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

**Netlify:**
- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`

**Docker Hub:**
- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`

## 🔍 Health Checks

### Application Health
```bash
curl http://your-domain.com/health
```

### Docker Health
```bash
docker ps  # Check container status
docker logs moveryy-web  # Check logs
```

## 📊 Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
npm run analyze

# Check for outdated packages
npm run check-updates
```

### Caching Strategy
- **Static assets:** 1 year cache
- **HTML files:** No cache
- **API responses:** Custom cache headers

## 🛡 Security Considerations

### Headers
The deployment includes security headers:
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

### HTTPS
Always deploy with HTTPS enabled:
- Vercel/Netlify: Automatic HTTPS
- Custom domains: Use Let's Encrypt or similar

## 🐛 Troubleshooting

### Common Issues

**Build Failures:**
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

**Routing Issues:**
- Ensure your server supports SPA routing
- Check `_redirects` (Netlify) or `vercel.json` configuration

**Environment Variables:**
- Verify all required variables are set
- Check variable names start with `VITE_`

### Logs and Monitoring

**Vercel:**
```bash
vercel logs
```

**Netlify:**
```bash
netlify logs
```

**Docker:**
```bash
docker logs moveryy-web
```

## 📞 Support

If you encounter issues:

1. Check this deployment guide
2. Review application logs
3. Verify environment configuration
4. Check platform-specific documentation

## 🔄 Rollback Strategy

### Vercel
```bash
vercel rollback
```

### Netlify
Use the Netlify dashboard to rollback to previous deployment

### Docker
```bash
# Use previous image tag
docker run -p 80:80 moveryy-web:previous-tag
```

---

**Happy Deploying! 🚀**