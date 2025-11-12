# Development Scripts & Commands

Quick reference for common development tasks.

## 🚀 Development

```bash
# Start development server
npm run dev

# Start on different port
npm run dev -- -p 3001

# Build for production
npm run build

# Run production build locally
npm run build && npm start

# Check for linting issues
npm run lint
```

## 📦 Package Management

```bash
# Install dependencies
npm install

# Add a new package
npm install package-name

# Add dev dependency
npm install -D package-name

# Update all packages
npm update

# Check for outdated packages
npm outdated
```

## 🗄️ Database Commands

### Supabase CLI (Optional)

Install:
```bash
npm install -g supabase
```

Commands:
```bash
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push

# Pull remote schema
supabase db pull
```

## 🧪 Testing Locally

### Test RAG Pipeline

Create a test script `test-rag.ts`:

```typescript
import { generateEmbedding, storeDocument, retrieveRelevantDocuments } from './lib/rag';

async function testRAG() {
  // Test embedding generation
  const embedding = await generateEmbedding("test query");
  console.log("Embedding dimension:", embedding.length);

  // Test document storage
  await storeDocument("Test content", { test: true });
  console.log("Document stored");

  // Test retrieval
  const results = await retrieveRelevantDocuments("test", 5);
  console.log("Retrieved documents:", results.length);
}

testRAG();
```

Run:
```bash
npx tsx test-rag.ts
```

## 🐛 Debugging

### View Runtime Logs

```bash
# Vercel (if deployed)
vercel logs

# Local development
# Logs appear in terminal automatically
```

### Check Environment Variables

Create `check-env.js`:
```javascript
console.log({
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY ? '✅ Set' : '❌ Missing',
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing',
  SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing',
});
```

Run:
```bash
node -r dotenv/config check-env.js
```

## 🧹 Cleanup Commands

```bash
# Clean build artifacts
rm -rf .next

# Clean node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next/cache
```

## 📊 Performance Testing

### Lighthouse (Chrome DevTools)

1. Open your app in Chrome
2. F12 → Lighthouse tab
3. Run audit
4. Check Performance, Accessibility, Best Practices

### Load Testing (Optional)

Install artillery:
```bash
npm install -g artillery
```

Create `load-test.yml`:
```yaml
config:
  target: "http://localhost:3000"
  phases:
    - duration: 60
      arrivalRate: 10

scenarios:
  - name: "Chat test"
    flow:
      - post:
          url: "/api/chat"
          json:
            messages:
              - role: "user"
                content: "Test message"
```

Run:
```bash
artillery run load-test.yml
```

## 🔧 Common Fixes

### Port Already in Use

```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill process on port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill -9
```

### Module Resolution Issues

```bash
# Clear module cache
npm cache clean --force
rm -rf node_modules .next
npm install
```

### Type Errors

```bash
# Regenerate types
npm run build

# Or just check types
npx tsc --noEmit
```

## 🎨 Styling

### View Tailwind Config

```bash
npx tailwindcss --help
```

### Update Tailwind

```bash
npm update tailwindcss @tailwindcss/postcss
```

## 📝 Git Workflow

```bash
# Initial commit
git init
git add .
git commit -m "Initial commit"

# Create feature branch
git checkout -b feature/new-feature

# Stage changes
git add .

# Commit with message
git commit -m "Add new feature"

# Push to remote
git push origin feature/new-feature

# Merge to main
git checkout main
git merge feature/new-feature
```

## 🚀 Quick Deploy

### To Vercel
```bash
npm install -g vercel
vercel login
vercel
```

### To Netlify
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

## 📱 Mobile Testing

### Expose local server to mobile

Using ngrok:
```bash
npm install -g ngrok
ngrok http 3000
```

Or use Vercel dev:
```bash
npm install -g vercel
vercel dev
```

## 💡 Useful VSCode Extensions

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- GitLens
- Thunder Client (API testing)

## 🔐 Security Checks

```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Check for outdated packages
npm outdated
```

## 📦 Build Optimization

### Analyze Bundle Size

```bash
# Install analyzer
npm install -D @next/bundle-analyzer

# Update next.config.ts:
# withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })

# Run analysis
ANALYZE=true npm run build
```

## ⚡ Quick Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Check linting |
| `vercel` | Deploy to Vercel |
| `npm audit` | Security check |

---

**Pro Tip**: Add these as scripts in `package.json` for easier access!
