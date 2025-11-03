# 🚀 How to Run the Project in VS Code

## Step 1: Open Terminal in VS Code

1. Open VS Code
2. Press `` Ctrl + ` `` (backtick) or go to **Terminal → New Terminal**
3. Make sure you're in the project folder

---

## Step 2: Install Dependencies

In the terminal, run:

```bash
npm install
```

**Wait for it to complete** (this may take 2-3 minutes)

You should see something like:
```
added 500 packages in 2m
```

---

## Step 3: Start the Development Server

After installation is complete, run:

```bash
npm run dev
```

You should see output like:
```
  VITE v6.3.5  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

## Step 4: Open in Browser

1. **Hold Ctrl (or Cmd on Mac)** and **click** on `http://localhost:5173/`
   
   OR

2. Open your browser and go to: `http://localhost:5173/`

---

## 🎉 You're Done!

The app should now be running! You should see:
- Dashboard with project cards
- Sidebar navigation
- Sample projects and data

---

## 🛑 To Stop the Server

Press `Ctrl + C` in the terminal

---

## 🔄 To Restart

Just run `npm run dev` again

---

## ⚠️ Common Issues & Solutions

### Issue 1: "npm: command not found"
**Solution**: You need to install Node.js first
- Download from: https://nodejs.org/
- Install the LTS version
- Restart VS Code
- Try again

### Issue 2: Port 5173 already in use
**Solution**: 
```bash
# Kill the process using that port
# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F

# On Mac/Linux:
lsof -ti:5173 | xargs kill -9
```

### Issue 3: "Cannot find module" errors
**Solution**: Delete node_modules and reinstall
```bash
rm -rf node_modules
npm install
```

### Issue 4: Blank white screen
**Solution**: 
1. Check browser console (F12)
2. Make sure all dependencies installed correctly
3. Try clearing browser cache (Ctrl + Shift + Delete)

---

## 📝 Quick Commands Reference

| Command | What it does |
|---------|-------------|
| `npm install` | Install all dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## 🎯 Next Steps

Once the app is running:

1. ✅ **Test the features** - Create projects, add team members, request leave
2. ✅ **Customize** - Change colors, add your company name
3. ✅ **Deploy** - Follow `DEPLOYMENT_INSTRUCTIONS.md` to deploy online

---

## 💡 Pro Tips

- **Auto-reload**: The app automatically reloads when you save changes
- **Multiple terminals**: You can open multiple terminals in VS Code
- **Extensions**: Install "ES7+ React/Redux/React-Native snippets" for faster coding

---

## 🆘 Still Having Issues?

1. Make sure Node.js is installed: `node --version` (should show v18 or higher)
2. Make sure npm is installed: `npm --version`
3. Check if you're in the correct folder: `ls` or `dir` should show package.json
4. Try restarting VS Code

---

**Happy coding! 🚀**
