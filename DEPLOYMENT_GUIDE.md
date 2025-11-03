# 🚀 Deployment & Database Setup Guide

## 📦 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite
   - Click "Deploy"
   - Your app will be live at: `https://your-project.vercel.app`

3. **Share with team:**
   - Share the Vercel URL with your 10 team members
   - They can access it from any browser

### Option 2: Netlify

1. **Push to GitHub** (same as above)

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repo
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy"
   - Your app will be live at: `https://your-project.netlify.app`

### Option 3: GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

Your app will be at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

---

## 🗄️ Database Options

Currently, the app uses **in-memory state** (Zustand). Data resets on page refresh. Here are database options:

### Option 1: Supabase (Recommended for your use case)

**Why Supabase?**
- Free tier: Perfect for 10 users
- Real-time updates
- Built-in authentication
- PostgreSQL database
- Easy to set up

**Setup Steps:**

1. **Create Supabase Project:**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and API key

2. **Install Supabase:**
   ```bash
   npm install @supabase/supabase-js
   ```

3. **Database Schema:**
   ```sql
   -- Projects table
   CREATE TABLE projects (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     name TEXT NOT NULL,
     description TEXT,
     status TEXT NOT NULL,
     deadline TIMESTAMP NOT NULL,
     progress INTEGER DEFAULT 0,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );

   -- Team members table
   CREATE TABLE team_members (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     name TEXT NOT NULL,
     email TEXT UNIQUE NOT NULL,
     avatar TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Project assignments
   CREATE TABLE project_assignments (
     project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
     member_id UUID REFERENCES team_members(id) ON DELETE CASCADE,
     PRIMARY KEY (project_id, member_id)
   );

   -- Leave requests table
   CREATE TABLE leave_requests (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     employee_id UUID REFERENCES team_members(id),
     leave_type TEXT NOT NULL,
     start_date DATE NOT NULL,
     end_date DATE NOT NULL,
     reason TEXT,
     status TEXT DEFAULT 'pending',
     applied_date TIMESTAMP DEFAULT NOW(),
     approved_by TEXT,
     approved_date TIMESTAMP,
     days INTEGER NOT NULL
   );

   -- Activity log
   CREATE TABLE activity_log (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
     user_id UUID REFERENCES team_members(id),
     type TEXT NOT NULL,
     message TEXT NOT NULL,
     timestamp TIMESTAMP DEFAULT NOW()
   );
   ```

### Option 2: Firebase (Google)

**Why Firebase?**
- Free tier available
- Real-time database
- Google authentication
- Good documentation

**Setup:**
```bash
npm install firebase
```

### Option 3: PocketBase (Self-hosted)

**Why PocketBase?**
- Single executable file
- Built-in admin UI
- Real-time subscriptions
- Free and open-source

**Setup:**
- Download from [pocketbase.io](https://pocketbase.io)
- Run locally or on a server
- Very lightweight

### Option 4: MongoDB Atlas

**Why MongoDB?**
- Free tier (512MB)
- NoSQL flexibility
- Cloud-hosted

---

## 🔐 Adding Authentication

For 10 users, you'll want authentication:

### With Supabase Auth:

```bash
npm install @supabase/auth-helpers-react
```

**Features:**
- Email/password login
- OAuth (Google, GitHub, etc.)
- Row-level security
- User management

### With Clerk:

```bash
npm install @clerk/clerk-react
```

**Features:**
- Beautiful pre-built UI
- Social logins
- User management dashboard
- Free tier: 5,000 monthly active users

---

## 📊 Recommended Setup for Your Team (10 Users)

### Best Stack:
1. **Frontend Hosting:** Vercel (free)
2. **Database:** Supabase (free tier)
3. **Authentication:** Supabase Auth (included)
4. **File Storage:** Supabase Storage (for avatars, documents)

### Cost: **$0/month** for 10 users

### Setup Time: ~30 minutes

---

## 🔄 Migration Steps (From Mock Data to Real Database)

1. **Set up Supabase project**
2. **Create tables** (use SQL above)
3. **Install Supabase client**
4. **Update Zustand stores** to use Supabase
5. **Add authentication**
6. **Deploy to Vercel**

Would you like me to help you implement any of these options?

---

## 📱 Sharing with Team

Once deployed, share:
- **URL:** `https://your-project.vercel.app`
- **Login credentials** (if you add auth)
- **User guide** (optional)

Team members can:
- Access from any device
- Bookmark the URL
- Install as PWA (Progressive Web App)

---

## 🆘 Need Help?

Let me know which option you'd like to implement, and I'll help you set it up!
