# 🚀 ProjectHub - Modern Project Management System

A comprehensive project management application with leave tracking, team collaboration, and real-time updates.

## ✨ Features

- 📊 **Project Management** - Create, track, and manage projects with deadlines
- 🏖️ **Leave Management** - Request and approve leave with full tracking
- 👥 **Team Collaboration** - Manage team members and assignments
- 📅 **Calendar View** - Visual timeline of project deadlines
- 📈 **Reports & Analytics** - Track progress and team performance
- 🎨 **Modern UI** - Beautiful, responsive design that works on all devices

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd projecthub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Add your Supabase credentials (see deployment guide)

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to [http://localhost:5173](http://localhost:5173)

## 📦 Deployment

See [DEPLOYMENT_INSTRUCTIONS.md](./DEPLOYMENT_INSTRUCTIONS.md) for complete deployment guide.

### Quick Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Quick Deploy to Netlify

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod
```

## 🗄️ Database Setup

1. Create a [Supabase](https://supabase.com) account
2. Create a new project
3. Run the SQL from `SUPABASE_SETUP.sql` in the SQL Editor
4. Copy your credentials to `.env`

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Complete deployment instructions
- [Quick Start Guide](./QUICK_START.md) - For team members
- [Database Schema](./SUPABASE_SETUP.sql) - Database structure

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI**: TailwindCSS + Radix UI
- **State Management**: Zustand
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel / Netlify
- **Charts**: Recharts
- **Date Handling**: date-fns

## 📱 Features Overview

### Project Management
- Create and edit projects
- Track progress with visual indicators
- Assign team members
- Set deadlines and milestones
- View project activity history

### Leave Management
- Submit leave requests
- Approve/reject requests
- Track leave balances
- View leave calendar
- Multiple leave types (vacation, sick, personal, unpaid)

### Team Collaboration
- Team member directory
- Project assignments
- Activity tracking
- Real-time updates

### Reports & Analytics
- Project status overview
- Progress tracking
- Leave statistics
- Visual charts and graphs

## 🎨 Customization

The app uses a modern design system with customizable colors. Edit `tailwind.config.js` to change:
- Primary colors
- Typography
- Spacing
- Border radius

## 🔒 Security

- Environment variables for sensitive data
- Row-level security in Supabase
- Secure API endpoints
- Input validation

## 📊 Performance

- Optimized bundle size
- Lazy loading
- Efficient state management
- Fast database queries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Check [DEPLOYMENT_INSTRUCTIONS.md](./DEPLOYMENT_INSTRUCTIONS.md)
- Review [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- Open an issue on GitHub

## 🎯 Roadmap

- [ ] Authentication system
- [ ] Email notifications
- [ ] File attachments
- [ ] Mobile app
- [ ] Advanced reporting
- [ ] Integration with other tools

---

**Built with ❤️ for modern teams**
