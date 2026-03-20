# GigShield Setup & Getting Started Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

## Frontend Setup

### 1. Install Dependencies
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

The frontend will be available at `http://localhost:3000`

**Demo Credentials:**
- Email: `demo@gigshield.com`
- Password: `Demo12345`

## Backend Setup

### 1. Install Dependencies
```bash
cd guideware/server
npm install
```

### 2. Environment Setup
Create `.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/gigshield
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
ML_API_URL=http://localhost:5001
FRONTEND_URL=http://localhost:3000
```

### 3. Start Development Server
```bash
npm run dev
```

The backend will be available at `http://localhost:5000`

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh JWT token

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/change-password` - Change password
- `GET /api/users/settings` - Get user settings
- `PUT /api/users/settings` - Update settings

### Policy Endpoints
- `GET /api/policies` - List all policies
- `POST /api/policies` - Create new policy
- `GET /api/policies/:id` - Get policy details
- `PUT /api/policies/:id` - Update policy
- `DELETE /api/policies/:id` - Delete policy
- `POST /api/policies/:id/renew` - Renew policy
- `POST /api/policies/:id/cancel` - Cancel policy

### Claims Endpoints
- `GET /api/claims` - List all claims
- `POST /api/claims` - File new claim
- `GET /api/claims/:id` - Get claim details
- `PUT /api/claims/:id` - Update claim
- `DELETE /api/claims/:id` - Delete claim
- `POST /api/claims/:id/submit` - Submit claim
- `POST /api/claims/:id/approve` - Approve claim (admin)
- `POST /api/claims/:id/reject` - Reject claim (admin)

### Risk Assessment Endpoints
- `GET /api/assessment/:userId` - Get risk assessment
- `POST /api/assessment/evaluate` - Evaluate risk
- `PUT /api/assessment/:userId/profile` - Update risk profile
- `GET /api/assessment/:userId/history` - Get risk history

## Directory Structure

```
guideware/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   ├── context/           # React context
│   │   ├── utils/             # Helper utilities
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                    # Express Backend
│   ├── controllers/           # Business logic
│   ├── models/                # MongoDB schemas
│   ├── routes/                # API routes
│   ├── middleware/            # Custom middleware
│   ├── config/                # Configuration
│   ├── server.js
│   └── package.json
│
├── ai-engine/                 # Python ML Module
│   └── (Coming soon)
│
└── docs/                      # Documentation
```

## Frontend Components

- **Button** - Reusable button component
- **Card** - Card layout component
- **Input/Select/Textarea** - Form inputs
- **Alert** - Alert/notification component
- **Modal** - Modal dialog
- **Badge** - Status badge component
- **LoadingSpinner** - Loading indicator
- **Navbar** - Navigation bar
- **Footer** - Footer component
- **ProtectedRoute** - Route protection wrapper

## Frontend Pages

- **Login** - User authentication
- **Register** - New user creation
- **Dashboard** - Main dashboard with overview
- **Policies** - Policy management
- **Claims** - Claims management

## Backend Models

- **User** - User profile and authentication
- **Policy** - Insurance policies
- **Claim** - Insurance claims
- **RiskAssessment** - ML risk scores

## Frontend Services

- **authService** - Authentication API calls
- **userService** - User management API calls
- **policyService** - Policy API calls
- **claimService** - Claims API calls
- **riskService** - Risk assessment API calls

## Frontend Utilities

- **formatters** - Date, currency formatting
- **validators** - Form validation
- **constants** - App constants and enums

## Development Workflow

1. **Start MongoDB** (if not using Atlas)
   ```bash
   mongod
   ```

2. **Start Backend**
   ```bash
   cd guideware/server
   npm run dev
   ```

3. **Start Frontend** (in new terminal)
   ```bash
   cd guideware/client
   npm run dev
   ```

4. **Access Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Testing

### Backend Tests
```bash
cd guideware/server
npm test
```

### Frontend Tests
```bash
cd guideware/client
npm test
```

## Build for Production

### Frontend
```bash
cd guideware/client
npm run build
```

### Backend
Backend runs directly from Node.js

## Deployment

### Frontend
- Build: `npm run build`
- Deploy `dist/` folder to Vercel, Netlify, or similar

### Backend
- Deploy to Heroku, Railway, or similar Node.js hosting
- Set environment variables in deployment platform
- Ensure MongoDB is accessible

## Troubleshooting

### Port Already in Use
```bash
# Change port in .env or kill existing process
lsof -i :5000  # Find process
kill -9 <PID>   # Kill process
```

### MongoDB Connection Failed
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify MongoDB is accessible

### JWT Token Errors
- Clear browser localStorage
- Login again
- Check JWT_SECRET configuration

### CORS Errors
- Verify FRONTEND_URL in backend .env
- Check that frontend is making requests to correct API URL

## Next Steps

1. ✅ Setup frontend and backend
2. ⭕ Connect to MongoDB
3. ⭕ Test authentication flow
4. ⭕ Build AI engine integration
5. ⭕ Deploy to production

## Support

For issues or questions, refer to the main README.md or check logs:
```bash
# Backend logs
npm run dev

# Frontend dev server output
npm run dev
```

---

**GigShield Development Setup** | March 2026
