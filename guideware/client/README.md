# GigShield Frontend

React-based frontend application for GigShield insurance platform.

## 📂 Directory Structure

```
src/
├── components/     # Reusable UI components
│   ├── Header.jsx
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Card.jsx
│   └── ...
│
├── pages/          # Page components
│   ├── Dashboard.jsx
│   ├── Policies.jsx
│   ├── Claims.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Profile.jsx
│
├── services/       # API call functions
│   ├── authService.js
│   ├── policyService.js
│   ├── claimService.js
│   └── userService.js
│
├── context/        # React Context
│   ├── AuthContext.jsx
│   ├── ThemeContext.jsx
│   └── UserContext.jsx
│
├── utils/          # Helper functions
│   ├── validators.js
│   ├── formatters.js
│   └── constants.js
│
├── App.jsx         # Root component
└── main.jsx        # Entry point
```

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## 🛠️ Development

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: Context API

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔗 API Integration

All API calls are handled through the `services/` directory. Each service module handles specific domain logic:

- **authService.js** - Authentication endpoints
- **policyService.js** - Policy management endpoints
- **claimService.js** - Claims processing endpoints
- **userService.js** - User profile endpoints

## 📱 Pages Overview

| Page | Purpose |
|------|---------|
| Login | User authentication |
| Register | New user account creation |
| Dashboard | Overview of policies & claims |
| Policies | View, create, update policies |
| Claims | Submit & track insurance claims |
| Profile | User account settings |

## 🔐 Authentication

- JWT token-based authentication
- Tokens stored in secure httpOnly cookies
- Auth context provides global user state

## 📦 Dependencies

See `package.json` for complete dependency list:
- react & react-dom
- vite
- axios
- tailwindcss
- react-router-dom

## 🚀 Deployment

Build the application:
```bash
npm run build
```

Static files will be generated in the `dist/` directory ready for deployment.

---

**Frontend Module** | Part of GigShield Project
