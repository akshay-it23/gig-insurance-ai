# 🚀 Frontend Quick Start Guide

## Prerequisites

- **Node.js** 18+ installed
- **npm** or **yarn** package manager
- Text editor (VS Code recommended)

## Step 1: Navigate to Frontend Directory

```bash
cd guideware/client
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install:
- React & React DOM
- React Router (routing)
- Vite (build tool)
- Tailwind CSS (styling)
- Axios (HTTP client)
- Lucide React (icons)

## Step 3: Create Environment File

Create `.env` file in `guideware/client/`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=GigShield
```

## Step 4: Start Development Server

```bash
npm run dev
```

You should see:
```
  VITE v5.0.0  ready in 234 ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

## Step 5: Open in Browser

Visit: **http://localhost:3000**

---

## 🎯 What You'll See

### Landing Page (Home)
- Hero section with "Get Started" button
- Features showcase (6 feature cards)
- Pricing plans display
- Call-to-action section

### Navigation
- **Logo**: GigShield (top left)
- **Menu**: Home, About, Contact (not logged in) OR Dashboard, Policies, Claims (logged in)
- **Buttons**: Login/Register (not logged in) OR User name + Logout (logged in)

---

## 🧪 Testing the App

### 1. Test Navigation
- Click on "GigShield" logo → Should navigate to home
- Click "Get Started" → Should go to Register page
- Click "Sign In" → Should go to Login page

### 2. Test Registration
- Go to Register page (`/register`)
- Fill in the form:
  - Name: John Doe
  - Email: john@example.com
  - Phone: +1 555-123-4567
  - Work Type: Delivery
  - Password: Password123!
  - Confirm Password: Password123!
  - Accept terms
- Click "Register"
- You should be redirected to Dashboard

### 3. Test Login
- Go to Login page (`/login`)
- Use demo credentials:
  - Email: `demo@gigshield.com`
  - Password: `Demo12345`
- Click "Login"
- You should be redirected to Dashboard

### 4. Test Protected Routes
- While logged in, access:
  - `/dashboard` → Should show dashboard
  - `/policies` → Should show policies page
  - `/claims` → Should show claims page
- Try accessing these while NOT logged in → Should redirect to login

### 5. Test Responsive Design
- Resize browser window or use device emulation
- Menu should collapse into hamburger menu on mobile
- All components should be readable and accessible

---

## 📁 Project Structure

```
client/
├── src/
│   ├── components/          # 10+ Reusable UI components
│   ├── pages/               # 6 Page components
│   ├── services/            # 6 API service modules
│   ├── context/             # 3 React contexts
│   ├── utils/               # Helper functions
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Tailwind CSS
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
└── package.json             # Dependencies
```

---

## 🔧 NPM Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

---

## 🛠️ Available Routes

| Path | Page | Access |
|------|------|--------|
| `/` | Landing | Public |
| `/register` | Register | Public (redirects if logged in) |
| `/login` | Login | Public (redirects if logged in) |
| `/dashboard` | Dashboard | Protected |
| `/policies` | Policies | Protected |
| `/claims` | Claims | Protected |

---

## 💡 Tips

### View Console
- Open DevTools: `F12` or `Ctrl+Shift+I`
- Click "Console" tab
- You'll see any errors or logs

### Check Network Requests
- Open DevTools → Network tab
- Perform actions (login, register, etc.)
- You'll see API calls being made (once backend is running)

### Check React DevTools
- Install React DevTools browser extension
- Open DevTools → Components tab
- Inspect React components and props

---

## ❌ Troubleshooting

### Port 3000 Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Dependencies Won't Install
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Vite Won't Start
```bash
# Check Node version
node --version  # Should be 18 or higher

# Try clearing cache
rm -rf .vite
npm run dev
```

### Tailwind CSS Not Working
```bash
# Ensure tailwind is installed
npm install -D tailwindcss postcss autoprefixer

# Rebuild
npm run dev
```

---

## 📱 Testing on Mobile

### Using Local Network
1. Find your computer's IP:
   ```bash
   ipconfig  # Windows
   ifconfig  # Mac/Linux
   ```
   Look for "IPv4 Address" (e.g., 192.168.1.100)

2. On phone, visit: `http://192.168.1.100:3000`

### Using Browser DevTools
- Press `F12` to open DevTools
- Press `Ctrl+Shift+M` to toggle device emulation
- Select different device types to test responsiveness

---

## 🎓 What's Included

✅ **Vite Setup**
- Fast development server
- Hot Module Replacement (HMR)
- Optimized production build

✅ **React Router**
- 6 different routes
- Public and protected routes
- Route protection with authentication

✅ **Tailwind CSS**
- Utility-first CSS framework
- Responsive design
- Dark mode support

✅ **UI Components**
- Button, Card, Input components
- Alert, Modal, Badge components
- Loading indicators

✅ **State Management**
- Authentication context
- User context
- Theme context

✅ **Form Handling**
- Form validation
- Error messages
- Loading states

---

## 🚀 Next Steps

1. ✅ Verify frontend is running on `http://localhost:3000`
2. Test all routes and navigation
3. Verify responsive design
4. When backend is ready, update `.env` API URL
5. Test API integration (login, register, etc.)

---

## 📞 Support

If something doesn't work:

1. **Check the console** (F12 → Console tab)
2. **Check the terminal** where you ran `npm run dev`
3. **Verify imports** - Make sure all imports are correct
4. **Clear cache** - Delete `.vite` folder and node_modules, reinstall
5. **Restart dev server** - Stop (Ctrl+C) and run `npm run dev` again

---

**Happy coding!** 🎉

For more details, see [FRONTEND_SETUP.md](./FRONTEND_SETUP.md)
