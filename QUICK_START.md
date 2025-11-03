# 🚀 Quick Start Guide - Share with Your Team

## For Team Members (Users)

### Accessing the App

1. **Open your browser** (Chrome, Firefox, Safari, Edge)
2. **Go to:** `[YOUR_DEPLOYED_URL_HERE]`
3. **Bookmark it** for easy access

### Features Available

✅ **Dashboard** - View all projects and their status
✅ **Projects** - Create, edit, and track project progress
✅ **Team** - See all team members
✅ **Leave Management** - Request and approve leave
✅ **Calendar** - View project deadlines
✅ **Reports** - See project statistics

---

## For Admin (You)

### Step 1: Deploy the App (Choose One)

#### Option A: Vercel (Easiest - 5 minutes)
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
vercel

# 3. Follow prompts, get your URL
```

#### Option B: Netlify
```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Build the app
npm run build

# 3. Deploy
netlify deploy --prod
```

### Step 2: Set Up Database (Recommended: Supabase)

1. **Go to [supabase.com](https://supabase.com)**
2. **Create new project** (free tier)
3. **Run the SQL** from `SUPABASE_SETUP.sql` in SQL Editor
4. **Get your credentials:**
   - Project URL
   - Anon/Public Key
5. **Add to Vercel/Netlify:**
   - Environment Variables
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Step 3: Share with Team

Send this message to your team:

```
Hi Team! 👋

We now have a project management system!

🔗 URL: [YOUR_URL_HERE]

Features:
- Track all projects in one place
- Request and manage leave
- View team calendar
- See project reports

Please bookmark the link and start using it today!

Let me know if you have any questions.
```

---

## 💾 Current Setup (No Database)

Right now, the app uses **browser storage**. This means:
- ✅ Works immediately
- ✅ No setup needed
- ❌ Data resets on page refresh
- ❌ Not shared between users

**For 10 users, you SHOULD add a database** (see DEPLOYMENT_GUIDE.md)

---

## 🔧 Maintenance

### Updating the App
```bash
# Make changes
git add .
git commit -m "Update features"
git push

# Vercel/Netlify will auto-deploy
```

### Backing Up Data (with Supabase)
- Supabase automatically backs up your data
- You can export from the dashboard

---

## 📞 Support

If team members have issues:
1. Check if URL is correct
2. Try different browser
3. Clear browser cache
4. Check internet connection

---

## 🎯 Next Steps

1. ✅ Deploy to Vercel/Netlify
2. ✅ Set up Supabase database
3. ✅ Share URL with team
4. ⬜ Add authentication (optional)
5. ⬜ Customize branding (optional)

**Estimated setup time: 30 minutes**
