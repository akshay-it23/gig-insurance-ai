# GigShield Frontend - Setup & Routing Guide

## ✅ Frontend Structure (Complete)

```
guideware/
├── client/
│   ├── src/
│   │   ├── components/          ✅ UI Components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Alert.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/               ✅ Page Components
│   │   │   ├── Landing.jsx      ← Home/Landing page
│   │   │   ├── Register.jsx     ← User registration
│   │   │   ├── Login.jsx        ← User login
│   │   │   ├── Dashboard.jsx    ← Main dashboard
│   │   │   ├── Policies.jsx     ← Policy management
│   │   │   └── Claims.jsx       ← Claims management
│   │   │
│   │   ├── context/             ✅ State Management
│   │   │   ├── AuthContext.jsx
│   │   │   ├── UserContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   │
│   │   ├── services/            ✅ API Integration
│   │   │   ├── apiClient.js
│   │   │   ├── authService.js
│   │   │   ├── userService.js
│   │   │   ├── policyService.js
│   │   │   ├── claimService.js
│   │   │   └── riskService.js
│   │   │
│   │   ├── utils/               ✅ Helper Functions
│   │   │   ├── formatters.js
│   │   │   ├── validators.js
│   │   │   └── constants.js
│   │   │
│   │   ├── App.jsx              ✅ Main app with routing
│   │   ├── main.jsx             ✅ React entry point
│   │   └── index.css            ✅ Tailwind styles
│   │
│   ├── public/                  ✅ Static assets
│   ├── index.html               ✅ HTML template
│   ├── vite.config.js           ✅ Vite configuration
│   ├── tailwind.config.js       ✅ Tailwind config
│   ├── postcss.config.js        ✅ PostCSS config
│   ├── package.json             ✅ Dependencies
│   ├── .env.example             ✅ Environment template
│   └── README.md                ✅ Frontend docs
│
└── docs/                        ✅ Documentation
```

## 🎯 Routing Setup

### Routes Configured

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/` | Landing | Public | Home page with features & pricing |
| `/register` | Register | Public | User registration form |
| `/login` | Login | Public | User login form |
| `/dashboard` | Dashboard | Protected | Main dashboard with stats |
| `/policies` | Policies | Protected | Manage insurance policies |
| `/claims` | Claims | Protected | Manage insurance claims |
| `*` | Redirect | Any | All other routes → home |

### Route Configuration Code

```jsx
<Routes>
  {/* Landing Page - Public */}
  <Route path="/" element={<AppLayout><Landing /></AppLayout>} />

  {/* Auth Routes - Public, with auth check */}
  <Route
    path="/login"
    element={<PublicRoute><AppLayout><Login /></AppLayout></PublicRoute>}
  />
  <Route
    path="/register"
    element={<PublicRoute><AppLayout><Register /></AppLayout></PublicRoute>}
  />

  {/* Protected Routes - Requires authentication */}
  <Route
    path="/dashboard"
    element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>}
  />
  <Route
    path="/policies"
    element={<ProtectedRoute><AppLayout><Policies /></AppLayout></ProtectedRoute>}
  />
  <Route
    path="/claims"
    element={<ProtectedRoute><AppLayout><Claims /></AppLayout></ProtectedRoute>}
  />

  {/* 404 Route */}
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
```

## 🎨 Layout System

### AppLayout Component
Every route wrapped with `<AppLayout>` includes:
```jsx
<AppLayout>
  <Navbar />
  <main className="flex-1">YOUR_PAGE_CONTENT</main>
  <Footer />
</AppLayout>
```

## 🔐 Route Protection

### PublicRoute Component
- ✅ Allows access if NOT authenticated
- ✅ Redirects to dashboard if already logged in
- ✅ Shows loading spinner while checking auth

### ProtectedRoute Component
- ✅ Allows access if authenticated
- ✅ Redirects to login if not authenticated
- ✅ Shows loading spinner while checking auth

## 📄 Page Specifications

### 1. Landing Page (`/`)
**Purpose**: Homepage showcasing GigShield features
**Features**:
- ✅ Hero section with CTA buttons
- ✅ Features grid with 6 feature cards
- ✅ Pricing plans section
- ✅ Call-to-action section
- ✅ Smart navigation based on auth status
- ✅ Responsive design (mobile-friendly)

**Smart Behavior**:
- If not authenticated: Shows "Get Started" & "Sign In" buttons
- If authenticated: Shows "Go to Dashboard" button

### 2. Register Page (`/register`)
**Purpose**: New user account creation
**Features**:
- ✅ Name, Email, Phone, Password fields
- ✅ Work type selection (delivery, rideshare, freelance, etc.)
- ✅ Terms & conditions acceptance
- ✅ Form validation with error display
- ✅ Success message and redirect to dashboard
- ✅ Link to login page

### 3. Login Page (`/login`)
**Purpose**: User authentication
**Features**:
- ✅ Email & password fields
- ✅ "Remember me" checkbox
- ✅ "Forgot password" link
- ✅ Form validation
- ✅ Demo credentials display
- ✅ Link to register page
- ✅ Success message and redirect

### 4. Dashboard Page (`/dashboard`)
**Purpose**: Main application hub with overview
**Features**:
- ✅ Welcome message with user name
- ✅ Stats cards (Active Policies, Coverage, Pending Claims, Risk Score)
- ✅ Recent policies list
- ✅ Recent claims list
- ✅ Quick action buttons
- ✅ Loading states with skeletons
- ✅ Data fetching on mount

### 5. Policies Page (`/policies`)
**Purpose**: Manage insurance policies
**Features**:
- ✅ Create new policy button
- ✅ Filter by status (all, active, inactive, etc.)
- ✅ List all policies with details
- ✅ Edit & delete actions
- ✅ Download policy documents
- ✅ Modal for create/edit forms
- ✅ Success/error notifications

### 6. Claims Page (`/claims`)
**Purpose**: Manage insurance claims
**Features**:
- ✅ File new claim button
- ✅ Filter by status
- ✅ List all claims with details
- ✅ Edit & delete actions
- ✅ Modal for create/edit forms
- ✅ Claim tracking
- ✅ Dynamic status badges

## 🚀 Getting Started

### 1. Installation
```bash
cd guideware/client
npm install
```

### 2. Environment Setup
Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=GigShield
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Access Application
```
http://localhost:3000
```

## 🧪 Testing Routes

### Test Public Routes (No Login Required)
1. Open `http://localhost:3000/` → See Landing page
2. Click "Get Started" → Go to Register
3. Click "Sign In" → Go to Login
4. Test form validation on Register/Login

### Test Protected Routes (Login Required)
1. Login with demo credentials or register
2. You should be redirected to Dashboard
3. Access `/policies` → See policies list
4. Access `/claims` → See claims list
5. Try accessing `/dashboard` without login → Redirected to login

### Test Route Protection
1. Try accessing protected routes directly in URL while NOT logged in
   - `/dashboard` → Redirect to login
   - `/policies` → Redirect to login
   - `/claims` → Redirect to login

2. Try accessing public routes while logged in
   - `/login` → Redirect to dashboard
   - `/register` → Redirect to dashboard

## 📦 Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI framework |
| React Router | 6.18.0 | Routing & navigation |
| Vite | 5.0.0 | Build tool |
| Tailwind CSS | 3.3.0 | Styling |
| Axios | 1.6.0 | HTTP client |
| Lucide React | 0.294.0 | Icons |

## 🎯 Features Checklist

### Setup
- ✅ React app initialized with Vite
- ✅ Tailwind CSS configured with utilities
- ✅ React Router setup with 6 routes
- ✅ Environment variables configured
- ✅ Base layout created (Navbar, Footer)

### Routing
- ✅ Landing page (public)
- ✅ Register page (public with auth check)
- ✅ Login page (public with auth check)
- ✅ Dashboard page (protected)
- ✅ Policies page (protected)
- ✅ Claims page (protected)
- ✅ Route protection with auth check
- ✅ 404 redirect handling

### Components
- ✅ 10+ reusable UI components
- ✅ Form inputs with validation
- ✅ Navigation bar with responsive menu
- ✅ Footer with links
- ✅ Alert/notification system
- ✅ Modal dialogs
- ✅ Loading indicators

### State Management
- ✅ Authentication context
- ✅ User context
- ✅ Theme context
- ✅ API interceptors

## 🔧 Common Tasks

### Add a New Route
```jsx
<Route
  path="/new-page"
  element={
    <ProtectedRoute>
      <AppLayout>
        <NewPage />
      </AppLayout>
    </ProtectedRoute>
  }
/>
```

### Change Route to Public
```jsx
// Use PublicRoute wrapper instead of ProtectedRoute
<Route
  path="/about"
  element={<AppLayout><About /></AppLayout>}
/>
```

### Redirect After Login
```jsx
// In AuthContext login function
const { login } = useAuth()
const navigate = useNavigate()

login(user, token)
navigate('/dashboard')
```

## 📝 Expected Output

When you run the frontend:
1. ✅ Vite dev server starts on `http://localhost:3000`
2. ✅ All routes are accessible and working
3. ✅ Authentication flow works correctly
4. ✅ Protected routes redirect appropriately
5. ✅ UI is responsive on all devices
6. ✅ Styling with Tailwind CSS applied
7. ✅ Navigation between pages is smooth
8. ✅ Forms validate input correctly
9. ✅ Error messages display properly
10. ✅ Loading states show spinners

## 🎓 What You've Built

A **production-ready Frontend** with:
- ✅ Modern React with Hooks
- ✅ Client-side routing
- ✅ Authentication flow
- ✅ Protected routes
- ✅ Form handling & validation
- ✅ State management
- ✅ Responsive UI design
- ✅ API integration ready
- ✅ Error handling
- ✅ Loading states

---

**Frontend Setup Complete!** Ready to connect with backend API. 🚀
