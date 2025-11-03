# 🔧 Troubleshooting Guide

## Installation Issues

### Problem: "npm install" fails

**Solution 1**: Clear npm cache
```bash
npm cache clean --force
npm install
```

**Solution 2**: Delete package-lock.json and try again
```bash
rm package-lock.json
npm install
```

**Solution 3**: Use different registry
```bash
npm install --registry=https://registry.npmjs.org/
```

---

## Runtime Issues

### Problem: "Module not found" errors

**Solution**: Reinstall dependencies
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

---

### Problem: Port already in use

**Solution**: Change the port
```bash
# In package.json, change dev script to:
"dev": "vite --port 3000"
```

Or kill the process:
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9
```

---

### Problem: Blank screen or white page

**Solutions**:
1. Check browser console (F12) for errors
2. Clear browser cache
3. Try incognito/private mode
4. Verify all dependencies installed: `npm list`

---

### Problem: "Cannot read property of undefined"

**Solution**: This is usually a data issue
1. Check if mock data is loading correctly
2. Verify imports in component files
3. Check browser console for specific error

---

## Build Issues

### Problem: Build fails

**Solution 1**: Clear dist folder
```bash
rm -rf dist
npm run build
```

**Solution 2**: Check for TypeScript errors
```bash
npx tsc --noEmit
```

---

## VS Code Issues

### Problem: IntelliSense not working

**Solution**:
1. Reload VS Code: `Ctrl+Shift+P` → "Reload Window"
2. Install TypeScript extension
3. Check if `tsconfig.json` exists

---

### Problem: Import paths not resolving

**Solution**: VS Code should recognize the `@` alias
1. Make sure `tsconfig.json` has path mappings
2. Restart VS Code
3. Check `vite.config.ts` has resolve alias

---

## Database Issues (Supabase)

### Problem: "Failed to fetch" from Supabase

**Solutions**:
1. Check `.env` file has correct credentials
2. Verify Supabase project is active
3. Check Row Level Security policies in Supabase
4. Verify API keys are correct

---

### Problem: Data not saving to database

**Solutions**:
1. Check Supabase credentials in `.env`
2. Verify tables exist in Supabase
3. Check browser console for errors
4. Verify RLS policies allow operations

---

## Performance Issues

### Problem: App is slow

**Solutions**:
1. Check if dev server is running in production mode
2. Clear browser cache
3. Check for console errors
4. Reduce number of re-renders (check React DevTools)

---

## Deployment Issues

### Problem: Vercel deployment fails

**Solutions**:
1. Check build logs in Vercel dashboard
2. Verify `vercel.json` is correct
3. Check environment variables are set
4. Try deploying from CLI: `vercel --prod`

---

### Problem: Environment variables not working in production

**Solution**:
1. Add variables in Vercel/Netlify dashboard
2. Redeploy after adding variables
3. Make sure variable names start with `VITE_`

---

## Browser Compatibility

### Problem: App doesn't work in older browsers

**Solution**: The app requires modern browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Getting More Help

If none of these solutions work:

1. **Check the error message** - Copy the exact error
2. **Check browser console** - Press F12 and look for red errors
3. **Check terminal output** - Look for error messages
4. **Verify Node version** - Run `node --version` (should be 18+)
5. **Verify npm version** - Run `npm --version` (should be 9+)

---

## Quick Diagnostic Commands

Run these to check your setup:

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check if dependencies are installed
npm list --depth=0

# Check for outdated packages
npm outdated

# Verify project structure
ls -la

# Check if dev server is running
netstat -ano | findstr :5173  # Windows
lsof -i :5173                  # Mac/Linux
```

---

## Emergency Reset

If everything is broken, start fresh:

```bash
# 1. Delete everything
rm -rf node_modules
rm -rf dist
rm package-lock.json

# 2. Reinstall
npm install

# 3. Try running
npm run dev
```

---

**Still stuck? Check the error message carefully - it usually tells you what's wrong!**
