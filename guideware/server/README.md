# GigShield Backend

Node.js/Express RESTful API backend for GigShield insurance platform.

## 📂 Directory Structure

```
server/
├── routes/           # API route definitions
│   ├── auth.js
│   ├── policies.js
│   ├── claims.js
│   ├── users.js
│   └── index.js
│
├── controllers/      # Business logic & request handlers
│   ├── authController.js
│   ├── policyController.js
│   ├── claimController.js
│   └── userController.js
│
├── models/           # MongoDB schemas
│   ├── User.js
│   ├── Policy.js
│   ├── Claim.js
│   └── RiskAssessment.js
│
├── middleware/       # Custom middleware
│   ├── authMiddleware.js
│   ├── validationMiddleware.js
│   ├── errorHandler.js
│   └── logger.js
│
├── services/         # External integrations
│   ├── paymentService.js
│   ├── insuranceProvider.js
│   ├── mlService.js
│   └── emailService.js
│
├── config/           # Configuration files
│   ├── database.js
│   ├── environment.js
│   └── constants.js
│
├── server.js         # Main entry point
└── package.json
```

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Environment Setup

Create `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gigshield
JWT_SECRET=your_secret_key
NODE_ENV=development
ML_API_URL=http://localhost:5001
```

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Validation**: Joi/Express-validator
- **Middleware**: CORS, Morgan, Helmet

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/refresh` - Refresh JWT token

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/:id` - Get user by ID

### Policies
- `GET /api/policies` - List all policies
- `POST /api/policies` - Create new policy
- `GET /api/policies/:id` - Get policy details
- `PUT /api/policies/:id` - Update policy
- `DELETE /api/policies/:id` - Delete policy

### Claims
- `GET /api/claims` - List all claims
- `POST /api/claims` - File a claim
- `GET /api/claims/:id` - Get claim details
- `PUT /api/claims/:id` - Update claim status

### Risk Assessment
- `POST /api/assessment/evaluate` - Get AI risk assessment
- `GET /api/assessment/:userId` - Get user risk profile

## 🔐 Security Features

- ✅ JWT authentication & authorization
- ✅ Password hashing with bcrypt
- ✅ Input validation & sanitization
- ✅ CORS protection
- ✅ Rate limiting
- ✅ Security headers (Helmet.js)
- ✅ SQL injection prevention
- ✅ XSS protection

## 🔄 Middleware Pipeline

1. **CORS** - Enable cross-origin requests
2. **Logger** - Log all requests
3. **Body Parser** - Parse JSON/form data
4. **Validation** - Validate request data
5. **Authentication** - Verify JWT token
6. **Route Handler** - Process request
7. **Error Handler** - Handle errors

## 📦 Dependencies

See `package.json` for complete list:
- express
- mongoose
- jsonwebtoken
- bcryptjs
- joi
- dotenv
- cors
- helmet
- morgan

## 🧪 Testing

```bash
npm run test
```

## 🚀 Deployment

1. Set production environment variables in `.env`
2. Build and deploy to cloud platform:

```bash
npm start
```

---

**Backend Module** | Part of GigShield Project
